import React from "react";
import {Line} from "react-chartjs-2";
import axios from "axios";

class StockChart extends React.Component  {

    state = {
        stockPrices: [],
        stockDates: [],
        companyName: "",
        ticker: "",
        chartData: {}
    }

    componentDidMount() {
        this.getSetStockPrices(this.props.ticker);
    }

    getSetStockPrices(ticker) {
    let stockPrices = [];
    let stockDates = [];
    axios.get("https://api.iextrading.com/1.0/stock/" + ticker + "/quote")
    .then(dbRes => {
        let color = "";
        let todayPrice = dbRes.data.delayedPrice;
        this.setState({companyName: dbRes.data.companyName, ticker: dbRes.data.symbol})
        
        axios.get("https://api.iextrading.com/1.0/stock/" + ticker + "/chart/3m?chartInterval=5")
        .then(dbRes => {
            for(let element of dbRes.data) {
                stockPrices.push(element.close)
                stockDates.push(element.date);
            }
            stockPrices.push(todayPrice);

            stockDates.push("Today");

            if(stockPrices[stockPrices.length - 1] > stockPrices[stockPrices.length - 2]) {
                color = "rgba(0,256,0,1)";
            } else {
                color = 'rgba(255,99,132,1)'
            }
            
            let data = {
                labels: stockDates,
                datasets: [{
                    data: stockPrices,
                    backgroundColor: [
                        "rgba(0,0,0,0)"
                    ],
                    borderColor: [
                       color ,
                    ],
                    borderWidth: 1,
                    lineTension: 0.2,
                }]
            }
            
            this.setState({chartData: data})
            
        });
    });
}

render () {
    const legend = {
        legend: {
            display: false
        }
    }
    return (
        <>
        <h1 className="display-4 stockNames">{this.state.companyName} ({this.state.ticker})</h1>
        <Line data={this.state.chartData} options={legend}/>
        </>
    )
}
}

export default StockChart;