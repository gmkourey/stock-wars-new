import axios from "axios";

export default {
    getStockQuotes: function (tickersArray) {
        const query = "https://api.iextrading.com/1.0/stock/market/batch?symbols=" + tickersArray.join(",") + "&types=quote";
        return axios.get(query)
    },
    getUserTransactions: function(userEmail) {
        return axios.get("/api/transactions/" + userEmail)
    },
    getMarketNews: function () {
        return axios.get("https://api.iextrading.com/1.0/stock/market/news/last/3")
    },
    getStockPrice: function(ticker) {
        ticker = ticker.toLowerCase();
        return axios.get("https://api.iextrading.com/1.0/stock/" + ticker + "/price")
    },
    newTransaction: function(body) {
        return axios.post("/api/transactions", body)
    },
    updateBalance: function(email, body) {
        return axios.put("/api/user/" + email, body)
    },
    getUserData: function(email) {
        return axios.get("/api/user/" + email)
    }
}