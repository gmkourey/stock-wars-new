import React from "react";
import API from "../utils/API";
import StockQuote from "./StockQuote";
import Position from "./Position";
import TransactionModalWrapped from "./TransactionModal";


class Dashboard extends React.Component {

    state = {
        quoteData: {},
        stocks: ["mmm", "axp", "aapl", "ba", "cat", "cvx", "csco", "ko", "dis", "dwdp", "xom", "gs", "hd", "ibm",
    "intc", "jnj", "jpm", "mcd", "mrk", "msft", "nke", "pfe", "pg", "trv", "utx", "unh", "vz", "v", "wmt", "wba" ],
        marketNews: [],
        userPositions: [],
        modalOpen: false,
        accountBalance: 0,
        totalMarketValue: 0,
        totalAccountValue: 0
    }

    componentDidMount () {

        API.getUserData(this.props.signedInUser)
        .then(apiRes => {
            this.setState({accountBalance: apiRes.data[0].availableBalance.toFixed(2)})
        })
        .catch(err => console.log(err))
        
        API.getStockQuotes(this.state.stocks)
        .then(apiRes => {
            this.setState({quoteData: apiRes.data});
        })
        .catch(err => console.log(err))

        API.getMarketNews()
        .then(apiRes => {
            this.setState({marketNews: apiRes.data})
        })
        .catch(err => console.log(err))

        this.buildTransactionsTable();
    }

    buildTransactionsTable() {
        API.getUserTransactions(this.props.signedInUser)
        .then(apiRes => {
            const transactionData = {}
            for(let element of apiRes.data) {
                if(transactionData[element.tickerSymbol]) {
                    transactionData[element.tickerSymbol].quantity += element.quantity;
                    transactionData[element.tickerSymbol].costBasis += element.costBasis;
                } else {
                    transactionData[element.tickerSymbol] = {}
                    transactionData[element.tickerSymbol].quantity = element.quantity;
                    transactionData[element.tickerSymbol].costBasis = element.costBasis;
                    transactionData[element.tickerSymbol].ticker = element.tickerSymbol;
                }
            }
                Object.keys(transactionData).map(element => {
                    API.getStockPrice(element)
                    .then(dbRes => {
                        transactionData[element].marketPrice = dbRes.data;
                        this.setState({userPositions: transactionData})
                        let totalMarketValue = 0;
                        for(let element in transactionData) {
                            totalMarketValue += transactionData[element].quantity * transactionData[element].marketPrice
                        }
                        this.setState({totalMarketValue: totalMarketValue.toFixed(2)})
                        this.setState({totalAccountValue: (parseInt(this.state.accountBalance) + parseInt(this.state.totalMarketValue)).toFixed(2)}) 
                    })
                })
        })
        .catch(err => console.log(err))
    }

    modalHandler() {
        if(this.state.modalOpen) {
            this.setState({modalOpen: false});
            this.buildTransactionsTable();
            API.getUserData(this.props.signedInUser)
            .then(apiRes => {
                this.setState({accountBalance: apiRes.data[0].availableBalance.toFixed(2)})
            })
            .catch(err => console.log(err))
        } else {
            this.setState({modalOpen: true});
        }
    }



    render () {
        if(document.getElementById("innerTicker")) {
            document.getElementById("innerTicker").animate([
            {left: "0px"},
            {left: "-9599px"}
        ],{
        duration: 90000,
        iterations: Infinity
    });
}
  
    return(
            <>
                <div className="container">
                    <div className="tickerContainer" >
                        <div className="tickerInner" id="innerTicker">
                            {Object.keys(this.state.quoteData).map(element => {
                                let compQuote = this.state.quoteData[element].quote;
                                return (
                                    <StockQuote
                                        key={compQuote.symbol} 
                                        ticker={compQuote.symbol} 
                                        price={compQuote.latestPrice} 
                                        priceChange={compQuote.change}
                                        percentChange={compQuote.changePercent}
                                    />
                                )
                            })}
                        </div>
                    </div>
                    <div className="container">
                        <h2>Available Balance: ${this.state.accountBalance}</h2>
                        <h2>Market Value: ${this.state.totalMarketValue}</h2>
                        <h2>Total Account Value: ${this.state.totalAccountValue}</h2>

                    </div>
                    <div className="row">
                        <div className="col-md-8">
                        <h1 className="dashTitle display-4">My Positions</h1>
                        <button type="button" className="btn btn-primary buySellButton" onClick={() => this.modalHandler()}>Buy/Sell Stocks</button>
                        <TransactionModalWrapped 
                        modalHandler={() => this.modalHandler()} 
                        modalOpen={this.state.modalOpen} 
                        signedInUser={this.props.signedInUser}
                        />
                        <table style={{width: "100%"}} className="table">
                        <thead>
                            <tr>
                                <th>Symbol</th>
                                <th>Quantity</th>
                                <th>Cost Basis</th>
                                <th>Market Value</th>
                                <th>Gain/Loss ($)</th>
                                <th>Gain/Loss (%)</th>
                            </tr>
                            </thead>
                            <tbody>
                        {Object.keys(this.state.userPositions).length ? 
                        <>
                        {Object.keys(this.state.userPositions).map(element => {
                            if(this.state.userPositions[element].quantity !== 0) {
                            return (<Position
                                key={this.state.userPositions[element].ticker} 
                                ticker={this.state.userPositions[element].ticker}
                                quantity={this.state.userPositions[element].quantity}
                                costBasis={this.state.userPositions[element].costBasis.toFixed(2)}
                                marketPrice={this.state.userPositions[element].marketPrice}
                                />
                                )
                            }
                                
                        })}
                        </>
                        :
                        <tr>
                        <td colSpan="6">It looks like you haven't purchased any stocks yet. Buy some by clicking on the button below.</td>
                        </tr>   
                    }
                    </tbody>
                        </table>
                        </div>
                        <div className="col-md-4">
                        <h1 className="newsTitle display-4">Market News</h1>
                         <p>News Goes Here</p>
                        </div>
                    </div>
                    </div>
                </>
        )
    }
}

export default Dashboard;