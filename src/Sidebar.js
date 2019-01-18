import React from 'react';
import styled from "styled-components";
import getSelectedLocatoinId from './locationGetter';

function Sidebar({selectedLocationId, observationLocations}) {
    const id = getSelectedLocatoinId(selectedLocationId);

    const loc = observationLocations.find(loc => loc.info.id === id);
    return <div>
        <pre>Valitse paikkakunta</pre>
        <pre>Lämpötila</pre>
        <pre>Tuulennopeus</pre>
        <pre>{loc && JSON.stringify(loc.info, null, 4)}</pre>
    </div>
}

export default styled(Sidebar)`
    width: 300px;
    height: 100vh;
`;