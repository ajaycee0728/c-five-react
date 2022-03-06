import axios from "axios"; 
axios.defaults.baseURL = process.env.REACT_APP_BASIC_URL;

export function GetAll() {
    return axios.get('api/guitar')
}

export function register(values) {
    return axios.post('api/guitars', values);
}

export function update(values,id) {
    return axios.put(`api/guitars/${id}`, values);
}  

export function remove(id) {
    return axios.put(`api/guitars/${id}`);
}  