import React, { useState } from "react";
import ReactDOM from 'react-dom'
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
    get();
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
    // console.log(response);
    let usageArray = [];
    response.records.forEach((record, index) => {
      usageArray.push([
        +record.toilet.value,
        +record.dishes.value,
        +record.shower.value,
        +record.laundry.value,
        +record.gas.value,
        +record.trash.value,
        +record.electricity.value,
        +record.fuel.value,
      ])
      console.log(index);


    });
    setRecords(usageArray);
    setLoading(false);
  };


  //Ron Stuff



  const styles = {
    '*': {
      fontFamily: 'serif',
    },
    batteryContainer: {
      fontSize: '24px',
      lineHeight: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    battery: {
      marginBottom: '20px', /* Increased margin-bottom */
      position: 'relative', /* Added position relative for percentage alignment */
    },
    segmentContainer: {
      display: 'flex',
      //flexDirection: 'column-reverse', /* Change to column-reverse to make segments vertical */
      alignItems: 'center',
    },
    segment: {
      display: 'inline-block',
      width: '20px',
      height: '20px',
      border: '1px solid #000',
      margin: '2px 0',
    },
    filled: {
      backgroundColor: '#0f0', /* Green color for filled segments */
    },
    exceeded: {
      backgroundColor: '#f00', /* Red color for exceeded segments */
    },
    empty: {
      backgroundColor: '#fff', /* White color for empty segments */
    },
    percentage: {
      position: 'absolute',
      bottom: '-25px', /* Adjust as needed */
      left: '50%',
      transform: 'translateX(-50%)',
    },
    addBatteryButton: {
      marginTop: '20px', /* Add margin between the last battery and the add button */
      border: '2px solid lightblue', /* Add a light blue border */
      padding: '10px 20px', /* Add some padding for better appearance */
      cursor: 'pointer', /* Change the cursor to a pointer when hovering over the button */
      transition: 'background-color 0.3s ease', /* Smooth transition for background color change */
    },
    addBatteryButtonHover: {
      backgroundColor: 'lightblue', /* Change the background color on hover */
    },
  };

  let batteryCount = 4; // Starting with 4 batteries

  
  // function drawBattery(displayId, goalId, consumedId) {
function drawBattery(displayId, goalId, records1) {
  let goal = parseInt(document.getElementById(goalId).value);
      // if (!Array.isArray(records1) || records1.length === 0) {
      //   console.error('Invalid records array');
      //   return;
      // }
    
      let sum = 0;
      console.log(records1.length);
      for (let i = 0; i < records1.length; i++) {
        for (let j = 0; j < 8; j++) {
          sum += records1[i][j];
        }
      }


    let consumed = sum;

    // Set default values to 0 if user input is empty
    goal = isNaN(goal) ? 0 : goal;
    consumed = isNaN(consumed) ? 0 : consumed;

    const percentage = (consumed / goal) * 100;



    let filledSegments;
    if (percentage > 100) {
        filledSegments = 10; // If percentage exceeds 100%, fill all segments
    } else {
        filledSegments = Math.ceil((percentage / 100) * 10);
    }

    let segmentClass;
      if (percentage > 100) {
        segmentClass = 'exceeded'; // Use exceeded class if percentage exceeds 100%
      } else {
        segmentClass = 'filled';
      }


  let batteryHTML = `<div>Goal: ${goal}</div><div class='segment-container'>`;

  for (let i = 0; i < 10; i++) {
    batteryHTML += `<div class="segment ${i < filledSegments ? segmentClass : 'empty'}"></div>`;
  }
  batteryHTML += `</div><div class="percentage">${percentage.toFixed(2)}%</div>`; // Added percentage div

  document.getElementById(displayId).innerHTML = batteryHTML;
  
}

        function addBatteryInput() {
            batteryCount++;
            const batteryTitle = prompt("What do you want to conserve today?"); // Prompt for the battery title
            if (batteryTitle) {
                const batteryHTML = `
                    <h2>${batteryTitle}</h2>
                    <label for="data${batteryCount}">Enter your ${batteryTitle.toLowerCase()} consumption goal for today: </label>
                    <input type="number" id="data${batteryCount}" min="0" max="100">
                    <br>
                    <label for="data${batteryCount}a">Enter the total amount for ${batteryTitle.toLowerCase()} used today: </label>
                    <input type="number" id="data${batteryCount}a" min="0" max="100">
                    <br>
                    <button onclick="drawBattery('batteryDisplay${batteryCount}', 'data${batteryCount}', 'data${batteryCount}a')">Generate Tally</button>
                    <div id="batteryDisplay${batteryCount}" class="battery"></div>
                `;
                const addBatteryButton = document.querySelector('.add-battery-button');
                addBatteryButton.insertAdjacentHTML('beforebegin', batteryHTML); // Insert new battery input before the add button
            }
        }


  //Ron Stuff End
    

  return (
    <div className="main">
      <h1>EcoTally</h1>
      <body>

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
          <span> Submit! </span>
          </button>
        </div>
    </div>
      

    <div>
      <div className="battery-container">
        {/* Electricity Consumption Battery */}
        <div style={styles.batteryContainer}>
          <h2>Waste Tracker</h2>
          <label htmlFor="data1">Enter your total consumption limit for today: </label>
          <input type="number" id="data1" min="0" max="100" />
          {loading && (
        <div className="loadingDiv">
          <LoadingSpinner />
        </div>
      )}


          <button onClick={() => drawBattery('batteryDisplay1', 'data1', records)}><span>Generate Tally</span></button>
          <div id="batteryDisplay1" className="battery"></div>
                
                
          {/* Add Battery Button */}
          <button className="add-battery-button" onClick={addBatteryInput}><span>Add Another Tally</span></button>



          </div>
      </div>
    </div>

      <button onClick={togglePanel}><span>Add Data</span></button>
      </body>
    </div>
  );
}

export default App;