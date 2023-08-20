import React, { Component } from 'react';

class NumberSequence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sequence: []
    };
  }

  componentDidMount() {
    this.generateSequence();
  }

  generateSequence() {
    let sequence = [];
    let sum = 1;

    for (let i = 0; i <= 10; i++) {
      sum += i;
      sequence.push(sum);
    }

    this.setState({ sequence });
  }

  render() {
    return (
      <div>
        <h2>Generated Sequence:</h2>
        <ul>
          {this.state.sequence.map((number, index) => (
            <li key={index}>{number}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default NumberSequence;