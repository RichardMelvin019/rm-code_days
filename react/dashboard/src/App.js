import logo from "./holberton.jpg";
import "./App.css";
import { getFullYear, getFooterCopy } from "./utils";
import "./login.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>School dashboard</h1>
      </header>
      <body className="App-body">
        <p><strong>Login to access the full dashboard</strong></p>
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
      </body>
      <footer className="App-footer">
        <p>{`${getFooterCopy(true)} - ${getFullYear()}`}</p>
      </footer>
    </div>
  );
}

export default App;
