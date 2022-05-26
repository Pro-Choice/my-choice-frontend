import {React, useEffect} from "react"
import "./map.css"
// import Context from "../context/context";
function Map(){
function reloadPage() {
  var currentDocumentTimestamp = new Date(performance.timing.domLoading).getTime();
  // Current Time //
  var now = Date.now();
  // Total Process Lenght as Minutes //
  var tenSec = 2 * 1000;
  // End Time of Process //
  var plusTenSec = currentDocumentTimestamp + tenSec;
  if (now > plusTenSec) {
    window.location.reload();
  }
}


        return (
  <div>
    <h1 id ="map-header">click on a marker for the address of the clinic or search the address</h1>
            <div id= "mapcontainer" onLoad={reloadPage()} >
             <div id='map'></div>
             </div>
  </div>
        )
}

export default Map