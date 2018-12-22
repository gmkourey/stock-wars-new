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

let buttonStyle = {
  float: "left",
  backgroundColor: "red"
}

class TransactionModal extends React.Component {

  state = {
    stockTicker: null,
    stockPrice: null,
    transactionPrice: null,
    buyOrder: true,
    quantity: null,
    showAlert: false
  }

  getStockPrice(event) {
      this.setState({stockTicker: event.target.value})
      API.getStockPrice(event.target.value.toLowerCase())
      .then(apiRes => {
        this.setState({stockPrice: apiRes.data.toFixed(2)})
      })
  }

  handleQuantityChange (event) {
    this.setState({transactionPrice: (event.target.value * this.state.stockPrice).toFixed(2), quantity: event.target.value})
  }

  buyOrSell(event) {
    if(event.target.value === "buy") {
      this.setState({buyOrder: true})
      
    } else {
      this.setState({buyOrder: false})
      
    }
  }

  buyStock(transAmount, body) {
    //Setting up a receiving variable for current available balance
    let oldAvailableBalance;
    //Get most recent stock price
    API.getStockPrice(this.state.stockTicker.toLowerCase())
    .then(apiRes => {
      //Get user data to see if they can afford it with available balance
      API.getUserData(this.props.signedInUser)
      .then(apiRes => {
        //Conditional to see if they can afford it
        if(apiRes.data[0].availableBalance >= parseInt(transAmount)) {
          this.setState({showAlert: false})
          oldAvailableBalance = apiRes.data[0].availableBalance;
          //New transactions is created because they can afford it
          API.newTransaction(body)
          .then(apiRes => {
            let newAvailableBalance = oldAvailableBalance - transAmount
            //Updates available balance of user
            API.updateBalance(this.props.signedInUser, {availableBalance: newAvailableBalance})
            .then(apiRes => this.props.handleModal())
            .catch(err => console.log(err))
          })
          .catch(err => console.log(err))
        } else {
          this.setState({showAlert: true})
        }
      })
    })
    .catch(err => console.log(err))
  }

  orderSubmit(event) {
    event.preventDefault();
    let transAmount;

    if(this.state.buyOrder) {
      transAmount = this.state.transactionPrice
    } else {
      transAmount = this.state.transactionPrice * -1;
    }

    const body = {
      tickerSymbol: this.state.stockTicker,
      quantity: this.state.quantity,
      costBasis: transAmount,
      userEmail: this.props.signedInUser
    }

    if(this.state.buyOrder) {
      this.buyStock(transAmount, body)
    } else {
      console.log(transAmount);
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Modal
          open={this.props.modalOpen}
          onClose={() => this.props.handleModal()}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <form onSubmit={(event) => this.orderSubmit(event)}>
              <h2 className="display-4 orderFormTitle">Order Form</h2>
              {this.state.showAlert ? 
              <Alert>
                It doesn't look like you have enough cash to complete this transaction.
              </Alert>
              :
              <></>}
              <div className="form-group">
                <label forhtml="buySell">Buy or Sell?</label>
                <select id="buySell" className="form-control" onChange={(event) => this.buyOrSell(event)}>
                  <option value="buy">Buy</option>
                  <option value="sell">Sell</option>
                </select>
              </div>

              <div className="form-group">
                <label forhtml="tickerChoice">Which Stock?</label>
                <input type="text" id="tickerChoice" className="form-control" onChange={(event) => this.getStockPrice(event)}/>
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