import React, { useEffect, useState, Fragment } from "react";
import "./styles/App.css";
import { List } from "./components/list.js"
import { Chart } from "./components/chart";

function App() {

  const [devices, setDevices] = useState([]);
  const [bandwidths, setBandwidths] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(() => {})

  useEffect(() => {
    // fetch all devices
    const request = '/api/v1/resources/devices/list' + window.location.search
    fetch(request).then(response =>
      response.json().then(data => {
        setDevices(data.devices);
        setSelectedDevice(data.devices[0].device_id)
      }).catch(error =>
        console.error('Error:', error),
      )
    )    
  }, []);

  useEffect(() => {
     let newURL = ""
     const request = "/api/v1/resources/bandwidths/agg?device_id=" + selectedDevice 

     if (selectedDevice) {
       if (window.location.search) {
         if (window.location.search.includes("device_id")){
          newURL = window.location.href.replace(/(device_id=)[^\&]+/, '$1' + selectedDevice)
         } else {
          newURL = window.location.href + `&device_id=${selectedDevice}`
         }
       } else {
        newURL = window.location.href + `?device_id=${selectedDevice}`
       }
       window.history.replaceState({}, null, newURL);    
        // fetch the bandwidth data
        fetch(request).then(response =>
        response.json().then(data => {
          setBandwidths(data.bandwidths);
        }).catch(error =>
          console.error('Error:', error),
        )
      )
    }
  }, [selectedDevice]);


  return (
    <div class="App">
      <div class="row" >
        <List devices={devices} onClick={setSelectedDevice} />
        <Chart bandwidths={bandwidths} />
      </div>
    </div>
  )
};

export default App;
