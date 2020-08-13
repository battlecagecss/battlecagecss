import React, { Component } from "react";
import { connect } from "react-redux";
//import TotalsDisplay from '../components/TotalsDisplay.jsx';
import NameForm from "../components/NameForm.jsx";
import Menu from "../components/Menu.jsx";
import DisplayContainer from "./DisplayContainer.jsx";
import { addVote, deleteVote } from "../actions/actions.js";

const mapStateToProps = (state) => ({
  state: state,
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
    if (e.target.name === "addVote") {
      this.props.addVote();
    } else if (e.target.name === "deleteVote") {
      this.props.deleteVote();
    }
  }

  render() {
    return (
      <div className="container">
        <div className="outerBox" style={{display: 'flex', flexDirection: 'column', justifyContent: 'stretch', flexBasis: 'fill', height: '100vh', width: '100vw', overflow: 'hidden'}}>
          <h1 id="header">BattleCage CSS</h1>

          <DisplayContainer />
          <div style={{ backgroundColor: '#A5C8E4',paddingTop: '2rem',display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignContent: 'center', flexGrow: '2'}}>
          <Menu />
          <NameForm />
          </div>
        </div>
      </div>
    );
  }
}

// const Wrapper = connect(mapStateToProps, mapDispatchToProps)(MainContainer);

export default connect(null, mapDispatchToProps)(MainContainer);
