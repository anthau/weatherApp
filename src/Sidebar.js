import React from 'react';
import styled from "styled-components";
import getSelectedLocatoinId from './locationGetter';
import {Line} from 'react-chartjs-2';


function Sidebar({selectedLocationId, observationLocations}) {
    const id = getSelectedLocatoinId(selectedLocationId);
    const loc = observationLocations.find(loc => loc.info.id === id);
    var temperatureNow=3;
  



    var temps=loc && loc.data.temperature.timeValuePairs;
    var winds=loc && loc.data.windspeedms.timeValuePairs;
    var value=[];
    var valueWind=[];
    var time=[];
    var hour=0;
    loc &&  temps.forEach(function(element) {
        value.push(element.value)
        time.push(hour)
        hour++;

      });
      loc &&  winds.forEach(function(element) {
        valueWind.push(element.value)
    
        hour++;

      });

 
 
    var dataset1= value
    var dataset2= valueWind
    const data = {

        labels:time,
      
        datasets: [ 
          {
            label: 'Temperature',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            data: dataset1     
          }
      
        ]
      
      };
      const datawind = {

        labels:time,
      
        datasets: [ 
          {
            label: 'wind',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            data: dataset2     
          }
      
        ]
      
      };
    return <div >
        <pre >Valitse paikkakunta3</pre>
        <pre  style={{'width':'50px'}}><b> {loc && loc.info.name}</b></pre>
        <pre>Lämpötila  </pre>
        <pre  style={{'width':'50px'}}><b>{loc && loc.data.temperature.timeValuePairs[loc.data.temperature.timeValuePairs.length-1].value} C </b></pre>
        <pre>Tuulennopeus</pre>
        <pre><b>{loc && loc.data.windspeedms.timeValuePairs[loc.data.windspeedms.timeValuePairs.length-1].value}  m/s</b></pre>
         <div style={{'width':'300px','heigth':'30px'}}>
        <Line 
    data={data}
    width={100}
    height={70}
/>

<Line 
    data={  datawind}
    width={100}
    height={70}
/>
  </div>
    
    </div>
}

export default styled(Sidebar)`
    width: 300px;
    height: 100vh;
`;