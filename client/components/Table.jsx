import React from "react";


const Table = ({ weights }) => {
  return (
    <div id="table">
      <table>
        <tr>
          <th>Date</th>
          <th>Weights</th>
          <th>Delete</th>
        </tr>
        {weights.map((weight, i) => {
          return (
            <tr key={`${weight.number}_${i}`}>
              <td>{`${weight.date.getUTCMonth()+1}-${weight.date.getUTCDate()}-${weight.date.getUTCFullYear()}`}</td>
              <td>{weight.weight}</td>
              <td><button>Delete</button></td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}

export default Table;