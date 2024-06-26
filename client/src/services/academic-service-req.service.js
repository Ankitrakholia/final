import axios from "axios";

const API_URL = "https://final-xxdh.onrender.com/api/service/ac/req/";

class AcaServiceReqService {
    create(academicId, service_no, reason,status) {
        return axios.post(API_URL + "create", {
            academicId,
            service_no,
            reason,
            status
        });
    }

    get(requestId) {
        return axios.get(API_URL + "get/" + requestId);
    }

    getall() {
        return axios.get(API_URL + "getall");
    }

    update(requestId, data) {
        console.log(data);
        return axios.put(API_URL + "update/" + requestId, { data });
    }
    updateStatus(requestId, status) {
        console.log(status);
        return axios.put(API_URL + "updateStatus/" + requestId, { status });
    }
}

export default new AcaServiceReqService();
