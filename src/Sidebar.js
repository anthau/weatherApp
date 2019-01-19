import React from 'react';
import styled from "styled-components";
import getSelectedLocatoinId from './locationGetter';

import {Line} from 'react-chartjs-2';
import Popup from "reactjs-popup";
import Modal from 'react-responsive-modal';

class FullScreen extends React.Component {
  data1=null;
  data2=null;
  text='text'
  constructor(props) {
    super(props);
    var loc=props.data;
    this.data2=props.data1;
    this.text=props.text;
    alert(this.text)



}
  state = {
    open: false,
  };
 
  onOpenModal = () => {
    this.setState({ open: true });
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
  };
 
  render() {
    const { open } = this.state;
    return (
      <div>
        <button onClick={this.onOpenModal}>{this.text}</button>
        <Modal  open={open} onClose={this.onCloseModal} center>
        
          <Line 
     data={this.data2}
    width={1400}
    height={800}
/>
        </Modal>
      </div>
    );
  }
}

function Sidebar({selectedLocationId, observationLocations}) {
    const id = getSelectedLocatoinId(selectedLocationId);
  
    const loc = observationLocations.find(loc => loc.info.id === id);

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
      if(id!=null && id!=undefined)
    return (<div >
      
        <pre >   Valitse paikkakunta3</pre>
        <pre>Keskilämpötila</pre>
        <pre>keskituuli</pre>
        
        <pre  style={{'width':'50px'}}><b> {loc && loc.info.name}</b></pre>
      
        <pre>Lämpötila  </pre>
        <pre  style={{'width':'50px'}}><b>{loc && loc.data.temperature.timeValuePairs[loc.data.temperature.timeValuePairs.length-1].value} C </b></pre>
        <pre>Tuulennopeus1</pre>
        <pre><b>{loc && loc.data.windspeedms.timeValuePairs[loc.data.windspeedms.timeValuePairs.length-1].value}  m/s</b></pre>
         <div style={{'width':'300px','heigth':'30px'}}>
        <Line 
    data={data}
    width={100}
    height={70}
/>
<FullScreen   text={'Temperature'}  data1={data}/>

<Line 
    data={  datawind}
    width={100}
    height={70}
/>
<FullScreen   text={'Wind1'}  data1={datawind}/>

  </div>
    
    </div>)
    else
     return (<p></p>)
}

export default styled(Sidebar)`
    width: 200px;

    height: 100vh;
`;