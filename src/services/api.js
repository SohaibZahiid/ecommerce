const API_BASE_URL = "http://localhost:5000/api/v1";

export const getRequest = async (url) => {
  try {
    const res = await fetch(`${API_BASE_URL}/${url}`);
    return await res.json();
  } catch (error) {
    throw error;
  }
};

export const postRequest = async (url, data) => {
  try {
    const res = await fetch(`${API_BASE_URL}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    throw error;
  }
};
