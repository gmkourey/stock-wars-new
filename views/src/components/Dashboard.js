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
        modalOpen: false
    }

    componentDidMount () {
        
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

        API.getUserTransactions(this.props.signedInUser)
        .then(apiRes => {
                let stockInfo = apiRes.data;
                stockInfo.map(element => {
                    API.getStockPrice(element.tickerSymbol)
                    .then(dbRes => {
                        element.marketPrice = dbRes.data;
                        this.setState({userPositions: stockInfo})
                    })
                })  
        })
        .catch(err => console.log(err))
    }

    modalHandler() {
        if(this.state.modalOpen) {
            this.setState({modalOpen: false});
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
                    <div className="row">
                        <div className="col-md-8">
                        <h1 className="dashTitle display-4">My Positions</h1>
                        <button type="button" className="btn btn-primary buySellButton" onClick={() => this.modalHandler()}>Buy/Sell Stocks</button>
                        <TransactionModalWrapped 
                        handleModal={() => this.modalHandler()} 
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
                        {this.state.userPositions.length ? 
                        <>
                        {this.state.userPositions.map(element => {
                            return (<Position 
                                ticker={element.tickerSymbol}
                                quantity={element.quantity}
                                costBasis={element.costBasis}
                                marketPrice={element.marketPrice}
                                />
                                )
                                
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
                        {this.state.marketNews.map(element => {
                            return <h6>Hello</h6>
                        })}
                        </div>
                    </div>
                    </div>
                </>
        )
    }
}

export default Dashboard;