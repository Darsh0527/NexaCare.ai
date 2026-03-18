const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    (headers as any)["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
};

export const doctorApi = {
  getPatients: () => fetchWithAuth("/patients"),
  getPatientDetails: (id: string) => fetchWithAuth(`/patients/${id}`),
};

export const authApi = {
  login: (data: any) => fetchWithAuth("/auth/login", { method: "POST", body: JSON.stringify(data) }),
  register: (data: any) => fetchWithAuth("/auth/register", { method: "POST", body: JSON.stringify(data) }),
};
