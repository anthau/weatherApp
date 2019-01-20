import React from "react";
import styled from "styled-components";
import getSelectedLocatoinId from "./locationGetter";
import { Line } from "react-chartjs-2";
import Modal from "react-responsive-modal";

class FullScreen extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      open: false,
      data: props.data_graph,
      text : props.text
    }
    
  }

  onOpenModal() {
    this.setState({ open: true });
  };

  onCloseModal() {
    this.setState({ open: false });
  };

  render() {

    return (
      <div>
        <button onClick={()=>{this.onOpenModal()}}>{this.state.text}</button>
        <Modal 
            open={this.state.open} 
            onClose={()=>{this.onCloseModal()}} 
            center>
          <Line
            data={this.state.data}
            width={1800}
            height={800} />
        </Modal>
      </div>
    );
  }
}

function Sidebar({ selectedLocationId, observationLocations }) {

  const id = getSelectedLocatoinId(selectedLocationId);
  const loc = observationLocations.find(loc => loc.info.id === id);
  var temps = loc && loc.data.temperature.timeValuePairs;
  var winds = loc && loc.data.windspeedms.timeValuePairs;
  var value = [];
  var valueWind = [];
  var time = [];

  //gets all temeperatures
  loc && temps.forEach(function (element) {
    value.push(element.value);
    var time1 = new Date(element.time);
    var minutes = time1.getMinutes();
    if (minutes < 10)
      minutes = "0" + minutes;
    time.push("" + time1.getHours() + ":" + minutes);


  });

  //gets all wind data
  loc && winds.forEach(function (element) {
    valueWind.push(element.value);
  });

  const math = require("mathjs")

  var dataset1 = value
  var dataset2 = valueWind
  const data = {

    labels: time,

    datasets: [
      {
        label: "Temperature",
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        data: dataset1
      }

    ]

  };
  const datawind = {
    labels: time,
    datasets: [
      {
        label: "wind",
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        data: dataset2
      }

    ]

  };

  if (id !== null && id !== undefined)
    return (<div >
      <pre ><b> {loc && loc.info.name}</b></pre>
      <pre>Keskilämpötila  <b>{math.round(math.mean(value), 2)} C</b></pre>
      <pre>keskituuli <b>{math.round(math.mean(valueWind), 2)} m/s</b></pre>
      <pre>Lämpötila  </pre>
      <pre ><b>{loc && loc.data.temperature.timeValuePairs[loc.data.temperature.timeValuePairs.length - 1].value} C </b></pre>
      <pre>Tuulennopeus</pre>
      <pre><b>{loc && loc.data.windspeedms.timeValuePairs[loc.data.windspeedms.timeValuePairs.length - 1].value}  m/s</b></pre>
      <div style={{ "width": "300px", "heigth": "30px" }}>
        <Line
          data={data}
          width={100}
          height={70} />
        <FullScreen text={"Temperature"} data_graph={data} />
        <Line
          data={datawind}
          width={100}
          height={70} />
        <FullScreen 
          text={"Wind"} 
          data_graph={datawind} />
      </div>

    </div>)
  else
    return (<p></p>)
}

export default styled(Sidebar)`
    width: 200px;
    height: 100vh;
`;