import React from "react";


const Table = ({ weights }) => {
  return (
    <div id="table">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Weights</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {weights.map((weight, i) => {
            return (
              <tr key={`${weight.number}_${i}`}>
                <td>{weight.date}</td>
                <td>{weight.weight}</td>
                <td><button className="warning">Delete</button></td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>Total Weight Change:</td>
            <td>{weights[0].weight - weights[weights.length-1].weight} lbs</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default Table;