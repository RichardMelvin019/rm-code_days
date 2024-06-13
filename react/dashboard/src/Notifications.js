import React, { Component } from "react";
import "./Notifications.css";
import closeIcon from "./close-icon.png";
import { getLatestNotification } from "./utils.js";

class Notifications extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="Notifications">
          <p>Here is the list of notifications</p>
          <button
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            aria-label="close"
            onClick={console.log("Close button has been clicked")}
          >
            <img
              style={{
                display: "inline",
                marginTop: "10px",
                marginRight: "10px",
                padding: "0",
              }}
              src={closeIcon}
              alt="Close"
              width="15px"
            />
          </button>

          <ul>
            <li data-priority="default">New course available</li>
            <li data-priority="urgent">New resume available</li>
            <li
              data-priority="urgent"
              dangerouslySetInnerHTML={{ __html: getLatestNotification() }}
            ></li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default Notifications;
