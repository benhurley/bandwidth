import React, { useEffect, useState } from "react";
import "./App.css";
import { Bandwidths } from "./components/bandwidths";

function App() {
  const [bandwidths, setBandwidths] = useState([]);

  useEffect(() => {
    // create rquest from  url parameters
    const request = window.location.pathname + window.location.search

    // error checking on bad request
    if (!request.includes("/api/v1/resources/bandwidths/agg")) {  
      console.log("Error: request needs to follow the path /api/v1/resources/bandwidths/agg?{parameters}")
    } else if (!request.includes("device_id")) {
      console.log("Error: device_id is a required parameter")
    } else {
      // fetch the bandwidth data
      fetch(request).then(response =>
        response.json().then(data => {
          setBandwidths(data.bandwidths);
        }).catch(error =>
          console.error('Error:', error),
        )
      )
    }
  }, []);

  return (
  <div className="app">
    <Bandwidths bandwidths={bandwidths} />
  </div>      
  )
};

export default App;
