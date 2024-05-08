import axios from "axios";

const API_URL = "http://localhost:5000/api/item/req/";

class StudItemReqService {
    create(studentId, item_no, quantity, staffId, reason,status) {
        return axios.post(API_URL + "create", {
            studentId,
            item_no,
            quantity,
            staffId,
            reason,
            status
        });
    }

    getall() {
        return axios.get(API_URL + "getall");
    }

    get(requestId) {
        return axios.get(API_URL + requestId);
    }

    update(requestId, data) {
        console.log(data);
        return axios.put(API_URL + "update/" + requestId, { data });
    }

    findByStudId(studentId) {
        return axios.get(API_URL + "getall/student?studentId=" + studentId);
    }

    findByAcId(staffId) {
        return axios.get(API_URL + "getall/academic?staffId=" + staffId);
    }

}

export default new StudItemReqService();
