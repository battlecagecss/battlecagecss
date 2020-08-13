import React, { Component } from 'react';
import { connect } from 'react-redux';

import MainDisplay from '../components/MainDisplay.jsx';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

class DisplayContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <MainDisplay />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayContainer);
