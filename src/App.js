import React, {useEffect, useState} from 'react';
import Metolib from '@fmidev/metolib';
import './App.css';
import {Map, Marker, TileLayer} from "react-leaflet";
import styled from "styled-components";
import L from "leaflet";
import Sidebar from './Sidebar';

const MapContainer = styled(Map)`
    width: calc(100vw - 300px);
    height: 100vh;
    position:absolute;
    top:0px;
    left:300px;
`;


// Ugly hack to fix Leaflet icons with leaflet loaders
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


function App() {

  const [observationLocations, setObservationLocations] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(function fetchObservationLocations() {
    const connection = new Metolib.WfsConnection();
    if (connection.connect('http://opendata.fmi.fi/wfs', 'fmi::observations::weather::cities::multipointcoverage')) {
      connection.getData({
        requestParameter : "temperature,windspeedms",
        begin : (new Date().getTime())  -  (25 * 60 * 60 * 1000),
        end : (new Date().getTime()- 1 * 60 * 60 * 1000),
        timestep : 60 * 60 *1000,
        bbox: "20.6455928891, 59.846373196, 31.5160921567, 70.1641930203",
       // sites : [ "Tampere"],
        callback: (data, errors) => {
      
          if (errors.length > 0) {

            errors.forEach(err => {
              console.error('FMI API error: ' + err.errorText);
            });
            return;
          }
         var temperatureArray=data.locations[5].data.temperature.timeValuePairs;
         var windspeedArray=data.locations[5].data.windspeedms.timeValuePairs;

          setObservationLocations(data.locations
            .map(loc => {
              const [lon, lat] = loc.info.position.map(parseFloat);
              return {...loc, position: {lat, lon}}
            })
          );
      alert('ready');
          connection.disconnect();
        }
      });
    }
  }, []);

  const position = [65, 26];
  const map = (
    <MapContainer center={position} zoom={6}>
      <TileLayer
        url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains='abcd'
        maxZoom={19}
      />

       //Corrected position map
      {observationLocations.map(loc => <Marker position={[loc.info.position[0],  loc.info.position[1]]}
                                               key={loc.info.id} onClick={() => setSelectedLocation(loc.info.id)}>
      </Marker>)}
    </MapContainer>
  );

  return (
    <div className="App">
      <Sidebar selectedLocationId={selectedLocation} observationLocations={observationLocations}/>
      {map}
    </div>
  );

}

export default App;