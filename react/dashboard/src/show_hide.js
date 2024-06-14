import React, { Component } from "react";
import Notifications from "./Notifications";

class ShowHide extends Component {
  constructor() {
    super();
    this.state = {
      show : true
    }
  }
  hideNot() {
    this.setState({
      show: !this.state.show // ! is a negative sign ie if show is true then change it to false then vice versa
    })
  }
  render() {
    return (
      <div>
        {/* Ternary operator: also known as the conditional operator.
        It allows you to assign a value or perform an operation
        based on a condition, all in a single line of code.

        ## Syntax: condition ? expressionIfTrue : expressionIfFalse */}
        {this.state.show ? <Notifications /> : null }
        <button onClick={() => {this.hideNot()}}>Show/Hide Notifications</button>
      </div>
    );
  }
}

export default ShowHide;
