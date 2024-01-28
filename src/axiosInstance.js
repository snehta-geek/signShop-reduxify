import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: "https://countriesnow.space/api/v0.1",
    headers: {
        'Content-Type': 'application/json', // Set common headers if needed
      },
})

export default axiosInstance;   