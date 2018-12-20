import React from "react";

const StockQuote = (props) => {

    let style = {}
    let priceChange;

    if(props.priceChange >= 0) {
        style.color = "green";

        priceChange = "$" + props.priceChange.toFixed(2);
        
    } else {
        style.color = "red";

        priceChange = "-$" + (props.priceChange * -1).toFixed(2);
    }
    return (
        <div style={style} className="stockTickers">
        <p>{props.ticker}</p>
        <p>${props.price.toFixed(2)}</p>
        <p>{priceChange} ({props.percentChange.toFixed(2)}%)</p>
        </div>
    )
}

export default StockQuote;

