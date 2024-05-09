import axios from "axios";

const API_URL = 'https://final-xxdh.onrender.com/api/service/proceed/';

class ProceedStudService {
    create(requestId, nonacademicId) {
        console.log(nonacademicId);
        return axios.post(API_URL + "create", {
            requestId, nonacademicId
        });
    }

    // getall() {
    //     return axios.get(API_URL + "getall");
    // }

    // get(item_no) {
    //     return axios.get(API_URL + item_no);
    // }

    update(requestId, data) {
        console.log(data);
        return axios.put(API_URL + "update/" + requestId, { data });
    }

    // findByName(item_name) {
    //     return axios.get(API_URL + "getall?item_name=" + item_name);
    // }

    // delete(item_no) {
    //     return axios.delete(API_URL + "remove/" + item_no);
    // }
}

export default new ProceedStudService();