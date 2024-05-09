import axios from "axios";

const API_URL = "https://final-xxdh.onrender.com/api/users/";

class UserRoles {
    getallAcademic() {
        return axios.get(API_URL + "academic");
    }

    getallNonAcademic() {
        return axios.get(API_URL + "non-academic");
    }

    getallStudent() {
        return axios.get(API_URL + "student");
    }

    getallAdmin() {
        return axios.get(API_URL + "admin");
    }
}

export default new UserRoles();