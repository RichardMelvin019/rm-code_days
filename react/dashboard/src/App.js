import React, { Component } from "react";
import logo from "./holberton.jpg";
import "./App.css";
import { getFullYear, getFooterCopy } from "./utils";
import "./login.css";
import Table from "./table";
import PropTypes from 'prop-types';

class App extends Component {
  static propTypes = {
    logOut: PropTypes.func
  };
  static defaultProps = {
    logOut: () => {}
  };

  handleKeydown = (event) => {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out');
      this.props.logOut();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>School dashboard</h1>
        </header>
        <body className="App-body">
          <p>
            <strong>Login to access the full dashboard</strong>
          </p>
          <form>
            {/* Email */}
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" />
            </div>

            {/* Button */}
            <div>
              <button>OK</button>
            </div>
          </form>

          <Table />
        </body>
        <footer className="App-footer">
          <p>{`${getFooterCopy(true)} - ${getFullYear()}`}</p>
        </footer>
      </div>
    );
  }
}

export default App;
