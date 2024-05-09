// src/services/http-common.js
import axios from 'axios';

export default axios.create({
  baseURL: "https://final-xxdh.onrender.com/api",
  headers: {
    "Content-type": "application/json"
  }
});
