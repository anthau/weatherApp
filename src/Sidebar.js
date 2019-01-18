import React from 'react';
import styled from "styled-components";
import getSelectedLocatoinId from './locationGetter';

function Sidebar({selectedLocationId, observationLocations}) {
    const id = getSelectedLocatoinId(selectedLocationId);

    const loc = observationLocations.find(loc => loc.info.id === id);

    var temperatureNow=3;
  // const   temperatureArray=oc.data.temperature.timeValuePairs;


    return <div>
        <pre>Valitse paikkakunta</pre>
        <pre>Lämpötila  </pre>
        <pre>{loc && loc.data.temperature.timeValuePairs[loc.data.temperature.timeValuePairs.length-1].value}</pre>
        <pre>Tuulennopeus</pre>
        <pre>{loc && loc.data.windspeedms.timeValuePairs[loc.data.temperature.timeValuePairs.length-1].value}</pre>


    
    </div>
}

export default styled(Sidebar)`
    width: 300px;
    height: 100vh;
`;