import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  votes: state.markets.votes,
});

const TotalsDisplay = (props) => {
  console.log(props);
  return (
    <div className="innerbox" id="totals">
      <label htmlFor="totalMarkets">Total Votes:</label>
      <span id="totalCards">{props.votes}</span>
    </div>
  );
};

export default connect(mapStateToProps)(TotalsDisplay);
