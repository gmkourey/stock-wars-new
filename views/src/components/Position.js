import React from "react";

const Position = (props) => {

    const style = {};
    let marketValue = props.marketPrice * props.quantity;
    let dollarDiff = marketValue - props.costBasis;
    let percentDiff = ((marketValue - props.costBasis)/props.costBasis).toFixed(2) + "%";

    if(marketValue >= props.costBasis) {
        style.color = "green";
        dollarDiff = "$" + dollarDiff.toFixed(2);
    } else {
        style.color = "red";
        dollarDiff = "-$" + (dollarDiff * -1).toFixed(2);
    }

    return (
        <tr>
            <td>{props.ticker}</td>
            <td>{props.quantity}</td>
            <td>${props.costBasis}</td>
            <td>${marketValue.toFixed(2)}</td>
            <td style={style}>{dollarDiff}</td>
            <td style={style}>{percentDiff}</td>
        </tr>
    )
}

export default Position;