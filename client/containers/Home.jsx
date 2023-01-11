import React, { useEffect, useState } from "react";
import Table from "../components/Table.jsx";
import Chart from "../components/Chart.jsx";
import axios from "axios";

const Home = ({ user }) => {
  const [weights, setWeights] = useState([]);
  const [isChart, setIsChart] = useState(true);
  const [date, setDate] = useState({});
  const [weight, setWeight] = useState(150);

  useEffect(() => {
    const getDate = async () => {
      try {
        const response = await axios.get('/weight', {
          params: { user_id: user.id }
        });
        console.log(response.data);
        setWeights(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getDate();

  }, []);

  const addWeight = async (e) => {
    console.log(weight, date);
    e.preventDefault();
    try {
      const response = await axios.post('/weight', {
        weight: weight, 
        date: date,
        user_id: user.id
      });
      setWeights([...weights, { weight: weight, date: date, id: response.data._id}]);
    } catch (err) {
      console.log(err);
    }
  }

  const deleteWeight = (e) => {
    const weight_id = e.target.id;
    try {
      const response = axios.delete('/weight', {
        weight_id: weight_id
      });
      console.log(response);

    } catch (err) {
      console.log(err);
    }
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
          name="date" 
          id="date" 
          type="date" 
          onChange={e => setDate(new Date(e.target.value))}
        />
        <label htmlFor="weight">Weight:</label>
        <input 
          onChange={e => setWeight(e.target.value)}
          value={weight}
          name="weight" 
          id="weight" 
          type="number" 
          min="10" 
          max="1500"
        />
        <button onClick={addWeight} type="submit">Add Weight</button>
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