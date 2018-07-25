import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

import {EasterStore} from './EasterAlgo/EasterStore';
import {EasterAlgoComponent} from './EasterAlgo/EasterAlgoComponent';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
    this.store = new EasterStore();
  }

  render() {
    return (
      <EasterAlgoComponent store = {this.store} />
    );
  }
}

render(<App />, document.getElementById('root'));
