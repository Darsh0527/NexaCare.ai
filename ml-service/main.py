from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
import random
import datetime

app = FastAPI(title="NexaCare AI Engine")

class HealthData(BaseModel):
    heartRate: float
    bloodPressureSys: float
    bloodPressureDia: float
    temperature: float
    spo2: float
    age: int

@app.get("/")
def read_root():
    return {"message": "NexaCare ML Service is running"}

@app.post("/predict_risk")
def predict_risk(data: HealthData):
    # Mocking a predictive model (e.g., Random Forest / XGBoost)
    # Give higher risk for abnormal vitals
    risk_score = 10.0
    
    # Simple mock heuristics to influence score
    if data.heartRate > 100 or data.heartRate < 50:
        risk_score += 20
    if data.spo2 < 92:
        risk_score += 30
    if data.bloodPressureSys > 160 or data.bloodPressureSys < 90:
        risk_score += 20
    
    # Add some randomness for the mock
    risk_score += random.uniform(-5, 5)
    risk_score = min(max(risk_score, 0), 100) # Clamp 0-100
    
    # Mock SHAP (Explainable AI) values
    shap_values = [
        {"feature": "Heart Rate", "impactValue": round(random.uniform(5, 15), 1), "description": "Elevated heart rate contributes to risk."},
        {"feature": "SpO2", "impactValue": round(random.uniform(-10, -2), 1), "description": "Lower oxygen levels increase risk."},
        {"feature": "Age factor", "impactValue": round(random.uniform(1, 5), 1), "description": "Baseline age risk."}
    ]
    
    # Determine clinical alert
    alert = "NORMAL"
    recommendation = "Maintain current monitoring."
    if risk_score > 75:
        alert = "CRITICAL"
        recommendation = "Immediate ICU consult and continuous SpO2 monitoring required."
    elif risk_score > 50:
        alert = "HIGH"
        recommendation = "Order ABG and increase monitoring frequency to Q1H."
    elif risk_score > 30:
        alert = "MODERATE"
        recommendation = "Review vitals next shift."
        
    return {
        "riskScore": round(risk_score, 1),
        "clinicalAlert": alert,
        "recommendation": recommendation,
        "shapValues": shap_values,
        "timestamp": datetime.datetime.now().isoformat()
    }
