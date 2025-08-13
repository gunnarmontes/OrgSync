import React, { useState } from "react";
import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 15000
})

api.interceptors.request.use(function (config) {
    
    const token = localStorage.getItem(ACCESS_TOKEN)

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    
    return config;
  }, function (error) {

    return Promise.reject(error);
  });


export default api