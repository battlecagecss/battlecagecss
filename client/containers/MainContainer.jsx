import React, { Component } from 'react';
import { connect } from 'react-redux';
import TotalsDisplay from '../components/TotalsDisplay.jsx';
import { addVote, deleteVote } from '../actions/actions.js';

const mapStateToProps = (state) => ({
  //
});

const mapDispatchToProps = (dispatch) => ({
  addVote: () => dispatch(addVote()),
  deleteVote: () => dispatch(deleteVote()),
});

class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    if (e.target.name === 'addVote') {
      this.props.addVote();
    } else if (e.target.name === 'deleteVote') {
      this.props.deleteVote();
    }
  }

  render() {
    return (
      <div className="container">
        <div className="outerBox">
          <h1 id="header">CSS CAGEMATCH</h1>
          <TotalsDisplay />
          <button name="addVote" onClick={this.handleClick}>
            +
          </button>
          <button name="deleteVote" onClick={this.handleClick}>
            -
          </button>
          <h1>hello</h1>
        </div>
      </div>
    );
  }
}

const Wrapper = connect(mapStateToProps, mapDispatchToProps)(MainContainer);

export default Wrapper;
