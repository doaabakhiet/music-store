import axios from "axios";

const user = JSON.parse(window.localStorage.getItem('user'))

axios.defaults.baseURL = "http://localhost:8000/api/";

if (user) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token
    // axios.defaults.headers.common['Content-Type'] = ['application/json']
    axios.defaults.headers.common['Accept'] = 'application/json'
}