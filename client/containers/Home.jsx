import React, { useEffect, useState } from "react";
import Table from "../components/Table.jsx";
import Chart from "../components/Chart.jsx";


const Home = ({ user }) => {
  const [weights, setWeights] = useState([]);
  const [isChart, setIsChart] = useState(true);
  const [date, setDate] = useState({});
  const [weight, setWeight] = useState(150);

  useEffect(() => {
    setWeights([
      { date: new Date("1/12/22"), weight: 140 },
      { date: new Date("4/12/22"), weight: 146 },
      { date: new Date("7/12/22"), weight: 148 },
      { date: new Date("1/1/23"), weight: 145 },
      { date: new Date("1/2/22"), weight: 140 },
      { date: new Date("1/3/22"), weight: 138 },
      { date: new Date("1/5/22"), weight: 136 },
      { date: new Date("1/6/23"), weight: 132 },
    ])
  }, []);

  const addWeight = () => {

  }

  const deleteWeight = () => {

  }

  const deleteAllWeights = () => {

  }

  const updateWeight = () => {

  }

  const today = new Date();

  return (
    <div id="Home">
      <h1>Welcome, {user.displayName}</h1>
      <form className="row">
        <label htmlFor="date">Date:</label>
        <input 
          defaultValue={today.toISOString().substring(0,10)}
          name="date" 
          id="date" 
          type="date" 
        />
        <label htmlFor="weight">Weight:</label>
        <input 
          defaultValue={weight}
          name="weight" 
          id="weight" 
          type="number" 
          min="10" 
          max="1500"
        />
        <button type="submit">Add Weight</button>
      </form>
      {
        isChart ? 
          <div className="row">
            <Chart weights={weights}/>
            <button onClick={e => setIsChart(false)}>See Table</button>
          </div> :
          <div className="row">
            <Table weights={weights}/>
            <button onClick={e => setIsChart(true)}>See Graph</button>
          </div>
      }
      <button className="warning">Delete All Weight Data</button>
    </div>
  )
}

export default Home;