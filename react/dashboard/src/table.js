import React from "react";
import "./table.css";

function Table() {
  return (
    <table>
      <thead>
        <tr>
          <th colSpan={2} className="mainHeader">Available courses</th>
        </tr>
        <tr>
          <th>Course name</th>
          <th>Credit</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>ES6</td>
          <td>40</td>
        </tr>
        <tr>
          <td>Webpack</td>
          <td>30</td>
        </tr>
        <tr>
          <td>React</td>
          <td>60</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Table;
