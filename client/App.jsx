import React, { Component } from 'react';
import Wrapper from './containers/MainContainer.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Wrapper />
      </div>
    );
  }
}

export default App;
