import axios from 'axios';

// URL Backend kamu di Render
// Pastikan tidak ada typo agar HP bisa menarik data dari Singapore
const API_URL = "https://ms-toko-online.onrender.com";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
