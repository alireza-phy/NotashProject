import axios from "axios"
const dev = {
    baseUrl: 'https://api.m3o.com/v1/user/',
    headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer ZmE2NWJiNjEtNzQ3ZS00ODA3LThiZWMtODBjY2E4MDQzMzQ5"
    },
}

let apiClient = axios.create(dev)
export default apiClient