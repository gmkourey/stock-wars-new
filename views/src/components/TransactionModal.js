import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

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
  constructor () {
    let choiceBuy = true;
  }

  state = {
    stockTicker: null,
    stockPrice: null,
    transactionPrice: null
  }

  getStockPrice(event) {
      this.setState({stockTicker: event.target.value})
      API.getStockPrice(event.target.value.toLowerCase())
      .then(apiRes => {
        this.setState({stockPrice: apiRes.data.toFixed(2)})
      })
  }

  handleQuantityChange (event) {
    this.setState({transactionPrice: (event.target.value * this.state.stockPrice).toFixed(2)})
  }

  handleBuySell(event) {
    if(event.target.value === "buy") {
      this.choiceBuy = true;
    } else {
      this.choiceBuy = false;
    }
  }

  orderSubmit(event) {
    
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

              <div className="form-group">
                <label forhtml="buySell">Buy or Sell?</label>
                <select id="buySell" className="form-control">
                  <option>Buy</option>
                  <option>Sell</option>
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
              <p>Estimated Transaction Cost: ${this.state.transactionPrice}</p>
            </div>
            <button type="submit" className="btn btn-primary buySellButton" style={{float:"left"}}>Complete Order</button>
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