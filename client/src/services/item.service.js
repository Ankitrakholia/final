import axios from "axios";

const API_URL = 'https://final-xxdh.onrender.com/api/item/';

class ItemService {
    create(item_no, item_name, quantity, description,price, availability) {
        return axios.post(API_URL + "create", {
            item_no,
            item_name,
            quantity,
            description,
            price,
        });
    }

    getall() {
        return axios.get(API_URL + "getall");
    }

    get(item_no) {
        return axios.get(API_URL + item_no);
    }

    update(item_no, data) {
        console.log(data);
        return axios.put(API_URL + "update/" + item_no, { data });
    }

    findByName(item_name) {
        return axios.get(API_URL + "getall?item_name=" + item_name);
    }

    delete(item_no) {
        return axios.delete(API_URL + "remove/" + item_no);
    }

    
}

export default new ItemService();