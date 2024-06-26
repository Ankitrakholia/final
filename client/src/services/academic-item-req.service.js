import axios from "axios";

const API_URL = "https://final-xxdh.onrender.com/api/item/ac/req/";

class AcaItemReqService {
    create(academicId, item_no, quantity, reason, status) {
        return axios.post(API_URL + "create", {
            academicId,
            item_no,
            quantity,
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
        return axios.put(API_URL + "update/" + requestId, { data });
    }

    updateStatus(requestId, status) {
        return axios.put(API_URL + "updateStatus/" + requestId, { status });
    }

    
    getItemDetails(item_no) {
        return axios.get("https://final-xxdh.onrender.com/api/items/" + item_no);
    }
    

    
}

export default new AcaItemReqService();
