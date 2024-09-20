import axios from "axios";

const BACKEND_DOMAIN = "http://127.0.0.1:8000/";
const LOGIN_URL = `${BACKEND_DOMAIN}/api/token/`;

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};


const login = async (userData) => {
  const response = await axios.post(LOGIN_URL, userData, config);

  if(response.data){
    localStorage.setItem("user", JSON.stringify(response.data))
  }

  return response.data;
};

const logout = () => {
  return localStorage.removeItem("user")
}

const authService = { login,logout};

export default authService