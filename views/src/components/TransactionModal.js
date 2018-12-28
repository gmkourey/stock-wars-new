import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Alert from "./Alert";

import API from "../utils/API";

function getModalStyle() {

  return {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    borderRadius: 5
  },
});

class TransactionModal extends React.Component {

  state = {
    stockTicker: null,
    stockPrice: null,
    transactionPrice: null,
    buyOrder: true,
    quantity: null,
    showCashAlert: false,
    showNoOwnAlert: false
  }

  buyOrSellHandler(event) {
    if(event.target.value === "buy") {
      this.setState({buyOrder: true}) 
    } else {
      this.setState({buyOrder: false})
    }
  }

  setStockPrice(event) {
    event.persist();
    this.setState({stockTicker: event.target.value})
    API.getStockPrice(event.target.value.toLowerCase())
    .then(apiRes => {
      this.setState({stockPrice: apiRes.data})
    })
    .catch(err => console.log(err))
  }

  handleQuantityChange (event) {
      this.setState({quantity: event.target.value})
      this.setState({transactionPrice: event.target.value * this.state.stockPrice})
  }

  buyStock() {
    //Setting up a receiving variable for current available balance
    let oldAvailableBalance;
    let updatedTransactionCost;
    //Get most recent stock price
    API.getUserData(this.props.signedInUser)
    .then(apiRes => {
      if(apiRes.data[0].availableBalance >= parseInt(this.state.transactionPrice)) {
        oldAvailableBalance = apiRes.data[0].availableBalance;
        API.getStockPrice(this.state.stockTicker)
        .then(apiRes => {
          updatedTransactionCost = apiRes.data * this.state.quantity;
          const body = {
            tickerSymbol: this.state.stockTicker,
            quantity: this.state.quantity,
            costBasis: apiRes.data * this.state.quantity,
            userEmail: this.props.signedInUser
          }
          API.newTransaction(body)
          .then(dbRes => {
            API.updateBalance(this.props.signedInUser,{updatedBalance: oldAvailableBalance - updatedTransactionCost})
            .then(apiRes => this.props.modalHandler())
            .catch(err => console.log(err))
          })
          .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
      } else {
        this.setState({showCashAlert: true})
      }
    })
  }

  sellStock() {

    API.getUserTransactions(this.props.signedInUser)
    .then(dbRes => {
      let numOfShares = 0;
      for(let element of dbRes.data) {
        if(element.tickerSymbol === this.state.stockTicker.toUpperCase()) {
          numOfShares = numOfShares + element.quantity;
        }
      }
      if(numOfShares >= Math.abs(this.state.quantity)) {
        API.getStockPrice(this.state.stockTicker.toLowerCase())
        .then(apiRes => {
          const body = {
            tickerSymbol: this.state.stockTicker,
            quantity: this.state.quantity * -1,
            costBasis: this.state.stockPrice * this.state.quantity * -1,
            userEmail: this.props.signedInUser
          }
          API.newTransaction(body)
          .then(dbRes => {
            API.getUserData(this.props.signedInUser)
            .then(dbRes => {
              API.updateBalance(this.props.signedInUser,{updatedBalance: dbRes.data[0].availableBalance - body.costBasis})
              .then(dbRes => this.props.modalHandler())
              .catch(err => console.log(err))
            })
            
          })
          .catch(err => console.log(err))
      })
      } else {
        this.setState({showNoOwnAlert: true})
      }
    }) 
    .catch(err => console.log(err))

  }

  orderSubmit(event) {
    event.preventDefault();
    let transAmount;
    let quantity;

    if(this.state.buyOrder) {
      transAmount = this.state.transactionPrice;
      quantity = this.state.quantity;
    } else {
      transAmount = this.state.transactionPrice * -1;
      quantity = this.state.quantity * -1;
    }

    if(this.state.buyOrder) {
      this.buyStock()
    } else {
      this.sellStock();
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Modal
          open={this.props.modalOpen}
          onClose={() => this.props.modalHandler()}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <form onSubmit={(event) => this.orderSubmit(event)}>
              <h2 className="display-4 orderFormTitle">Order Form</h2>
              {this.state.showAlert ? 
              <Alert>
                It doesn't look like you have enough cash to complete this transaction. Please try again.
              </Alert>
              :
              <></>}
              {this.state.showNoOwnAlert ? 
              <Alert>
                It doesn't look like you have enough shares to sell.
              </Alert>
              :
              <></>}
              <div className="form-group">
                <label forhtml="buySell">Buy or Sell?</label>
                <select id="buySell" className="form-control" onChange={(event) => this.buyOrSellHandler(event)}>
                  <option value="buy">Buy</option>
                  <option value="sell">Sell</option>
                </select>
              </div>

              <div className="form-group">
                <label forhtml="tickerChoice">Which Stock?</label>
                <input type="text" id="tickerChoice" className="form-control" onChange={(event) => this.setStockPrice(event)}/>
                <small className="form-text text-muted">Enter a ticker symbol (i.e. AAPL for Apple)</small>
              </div>

              <div className="form-group">
                <label forhtml="numOfShares">How Many Shares?</label>
                <input type="number" id="numOfShares" className="form-control" onChange={(event) => this.handleQuantityChange(event)}/>
              </div>
            <div className="bottomBuySell">
              <p>Current Cost Per Share for {this.state.stockTicker} is: ${this.state.stockPrice}</p>
              <p>Estimated Transaction Cost: 
                {this.state.buyOrder ? <> </> : " -"}
                ${this.state.transactionPrice}
                </p>
            </div>
            <button type="submit" className="btn btn-primary buySellButton">Complete Order</button>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

TransactionModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const TransactionModalWrapped = withStyles(styles)(TransactionModal);

export default TransactionModalWrapped;