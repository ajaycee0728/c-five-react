import axios from "axios"; 
axios.defaults.baseURL = process.env.REACT_APP_BASIC_URL;

export function GetAll() {
    return axios.get('api/guitar')
}

export function register(values) {
    return axios.post('api/guitar', values);
}

export function update(values,id) {
    return axios.put(`api/guitar/${id}`, values);
}  

export function remove(id) {
    return axios.delete(`api/guitar/${id}`);
}  