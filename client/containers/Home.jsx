import React, { useEffect, useState } from "react";
import Table from "../components/Table.jsx";
import Chart from "../components/Chart.jsx";


const Home = ({ user }) => {
  const [weights, setWeights] = useState([]);
  const [isChart, setIsChart] = useState(true);

  useEffect(() => {
    setWeights([
      { date: new Date("1/12/22"), weight: 140 },
      { date: new Date("4/12/22"), weight: 146 },
      { date: new Date("7/12/22"), weight: 135 },
      { date: new Date("1/10/23"), weight: 130 }
    ])
  }, []);

  return (
    <div id="Home">
      <h1>Welcome, {user.displayName}</h1>
      <form className="row">
        <label htmlFor="date">Date:</label>
        <input name="date" id="date" type="date" />
        <label htmlFor="weight">Weight:</label>
        <input name="weight" id="weight" type="number" min="10" max="1500"/>
        <button type="submit">Add Weight</button>
      </form>
      {
        isChart ? 
          <div className="row">
            <Chart weights={weights}/>
            <button>See Table</button>
          </div> :
          <div className="row">
            <Table weights={weights}/>
            <button>See Graph</button>
          </div>
      }
    </div>
  )
}

export default Home;