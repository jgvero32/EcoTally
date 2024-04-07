import React, { useState } from "react";
import './App.css';
import LoadingSpinner from './components/spinner.js';
import UsageSetter from './components/UsageSetter.js';
import getRecords from './requests/getRecords.js';
import postRecord from './requests/postRecord.js';

function App() {
  const [loading, setLoading] = useState(false);
  const [panelActive, setPanelActive] = useState(false);
  const [toilet, setToilet] = useState("");
  const [dishes, setDishes] = useState("");
  const [shower, setShower] = useState("");
  const [laundry, setLaundry] = useState("");
  const [fuel, setFuel] = useState("");
  const [gas, setGas] = useState("");
  const [trash, setTrash] = useState("");
  const [electricity, setElectricity] = useState("");
  const [records, setRecords] = useState([]);

  const togglePanel = () => {
    setPanelActive(!panelActive);
  };

  const submit = async () => {
    setLoading(true);
    let usage = {
      toilet: toilet || 0,
      dishes: dishes || 0,
      shower: shower || 0,
      laundry: laundry || 0,
      gas: gas || 0,
      trash: trash || 0,
      electricity: electricity || 0,
      fuel: fuel || 0
    };
    let response = await postRecord(usage);
    console.log(response);
    setLoading(false);
  };

  const get = async () => {
    setLoading(true);
    let response = await getRecords();
    let usageArray = [];
    response.records.forEach((record, index) => {
      usageArray.push(<li key={index}>{record.toilet.value}, {record.dishes.value}, {record.shower.value}, {record.laundry.value}, {record.gas.value}, {record.trash.value}, {record.electricity.value}, {record.fuel.value},</li>);
    });
    setRecords(usageArray);
    setLoading(false);
  };

  return (
    <div className="main">
      <h2>EcoTally</h2>
      {loading && (
        <div className="loadingDiv">
          <LoadingSpinner />
        </div>
      )}
      <div className={`panel ${panelActive ? 'active' : ''}`}>
        <div className="selectDiv">
          <p>Enter your toilet flushes</p>
          <UsageSetter usage={toilet} setUsage={setToilet}/>
          <p>Enter your how many minutes you spent washing dishes</p>
          <UsageSetter usage={dishes} setUsage={setDishes}/>
          <p>Enter your shower time (minutes)</p>
          <UsageSetter usage={shower} setUsage={setShower}/>
          <p>Enter your laundry loads</p>
          <UsageSetter usage={laundry} setUsage={setLaundry}/>
          <p>Enter your gas usage</p>
          <UsageSetter usage={gas} setUsage={setGas}/>
          <p>Enter your trash waste</p>
          <UsageSetter usage={trash} setUsage={setTrash}/>
          <p>Enter your electricity waste</p>
          <UsageSetter usage={electricity} setUsage={setElectricity}/>
          <p>Enter your fuel waste</p>
          <UsageSetter usage={fuel} setUsage={setFuel}/>
        </div>
        <div className="submitDiv">
          <button onClick={submit} disabled={loading ? true : false}>
            Submit!
          </button>
          <button onClick={get} disabled={loading ? true : false}>
            Get!
          </button>
        </div>
      </div>
      <div className="listRecordsDiv">
        <ul>{records}</ul>
      </div>
      <button onClick={togglePanel}>Toggle Panel</button>
    </div>
  );
}

export default App;