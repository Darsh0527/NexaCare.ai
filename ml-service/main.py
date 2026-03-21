from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="NexaCare ML Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PatientData(BaseModel):
    age: float
    heart_rate: float
    systolic_bp: float
    temperature: float
    oxygen_level: float

class PredictionResponse(BaseModel):
    risk_score: int
    risk_level: str
    reasons: List[str]
    confidence: float

@app.get("/health")
def health():
    return {"status": "ok", "model": "rule-based-v1"}

@app.post("/predict", response_model=PredictionResponse)
def predict(data: PatientData):
    score = 0
    reasons = []

    if data.oxygen_level < 92:
        score += 35
        reasons.append("Oxygen saturation critically low (<92%)")
    elif data.oxygen_level < 95:
        score += 15
        reasons.append("Oxygen saturation borderline low (<95%)")

    if data.heart_rate > 110:
        score += 25
        reasons.append("Heart rate severely elevated (>110 bpm)")
    elif data.heart_rate > 100:
        score += 15
        reasons.append("Heart rate elevated (>100 bpm)")

    if data.systolic_bp > 160:
        score += 20
        reasons.append("Blood pressure critically high (>160 mmHg)")
    elif data.systolic_bp > 140:
        score += 10
        reasons.append("Blood pressure elevated (>140 mmHg)")

    if data.temperature > 39.0:
        score += 20
        reasons.append("High temperature indicating infection (>39.0 °C)")
    elif data.temperature > 38.0:
        score += 10
        reasons.append("Elevated temperature (>38.0 °C)")

    if data.age > 70:
        score += 15
        reasons.append("Age related high risk factor (>70 years)")
    elif data.age > 60:
        score += 8
        reasons.append("Age related vulnerability (>60 years)")

    if score > 100:
        score = 100

    if score < 40:
        risk_level = "LOW"
    elif score < 60:
        risk_level = "MEDIUM"
    elif score < 80:
        risk_level = "HIGH"
    else:
        risk_level = "CRITICAL"
        
    if not reasons:
        reasons.append("Vitals are stable and within normal ranges")

    return PredictionResponse(
        risk_score=int(score),
        risk_level=risk_level,
        reasons=reasons,
        confidence=round(min(85.0 + (score / 10), 99.9), 1)
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
