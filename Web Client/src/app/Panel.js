import React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Panel, Button, Accordion, PageHeader } from 'react-bootstrap';

import Sphere from "./base/Sphere";
import Magnet from "./base/Magnet";
import Coordinate from "./base/Coordinate";

import Mediator from './util/Mediator';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export default class GenPanel extends React.Component {
  state = {
    sphere: {
      speed: "1",
      direction: "0",
      coordinates: "0, 0"
    },
    magnets: [
      {
        power: "500",
        coordinates: "200, 100"
      }
    ]
  };

  handleGenerate = () => {
    let t = this.state.sphere.coordinates.split(", ");
    const sphere = new Sphere(new Coordinate(parseFloat(t[0]), parseFloat(t[1])),
      parseFloat(this.state.sphere.speed), parseFloat(this.state.sphere.direction));

    let magnets = [];
    this.state.magnets.map(magnet  => {
      t = magnet.coordinates.split(", ");
      const item = new Magnet(new Coordinate(parseFloat(t[0]), parseFloat(t[1])), parseInt(magnet.power));

      magnets.push(item);
    });

    const temp = {
      sphere: sphere,
      magnets: magnets
    };

    Mediator.handle('receiveData', [temp])
  };

  render() {
    return (
      <div>
        <Panel header="Sphere">
          <FieldGroup
            id="formControlsSpeed"
            name="speed"
            label="Speed"
            placeholder="Enter speed"
            value={this.state.sphere.speed}
            onChange={this.handleSphereChange}
          />
          <FieldGroup
            id="formControlsDirection"
            name="direction"
            label="Direction"
            placeholder="Enter direction"
            value={this.state.sphere.direction}
            onChange={this.handleSphereChange}
          />
          <FieldGroup
            id="formControlsCoordinates"
            name="coordinates"
            label="Coordinates"
            placeholder="Enter coordinates, like 'x, y'"
            value={this.state.sphere.coordinates}
            onChange={this.handleSphereChange}
          />
        </Panel>

        <Accordion defaultActiveKey={1} >
          {this.state.magnets.map((magnet, index) => {
            return (
              <Panel header={"Manget " + (index+1)}  eventKey={index + 1} >
                <FieldGroup
                  id="formControlsPower"
                  name="power"
                  label="Power"
                  placeholder="Enter power"
                  value={this.state.magnets[index].power}
                  onChange={(event) => this.handleMagnetChange(index, event)}
                />
                <FieldGroup
                  id="formControlsCoordinates"
                  name="coordinates"
                  label="Coordinates"
                  placeholder="Enter coordinates, like 'x, y'"
                  value={this.state.magnets[index].coordinates}
                  onChange={(event) => this.handleMagnetChange(index, event)}
                />
                <Button bsStyle="danger" bsSize="xsmall" onClick={() => this.handleDropMagnet(index)} block>Drop</Button>
              </Panel>
            )
          })}

          <Button block onClick={this.handleAddMagnet} style={{marginTop: 5}} >
            Add magnet
          </Button>
        </Accordion>

        <Button bsStyle="primary" bsSize="large" block onClick={this.handleGenerate}>
          Simulate
        </Button>
      </div>
    )
  }

  handleSphereChange = event => {
    const val = event.target.value;
    const type = event.target.name;
    this.setState(prev => {
      prev.sphere[type] = val;
      return prev;
    });
  };

  handleMagnetChange = (order, event) => {
    const val = event.target.value;
    const type = event.target.name;
    this.setState(prev => {
      prev.magnets[order][type] = val;
      return prev;
    });
  };

  handleAddMagnet = () => {
    this.setState(prev => {
      prev.magnets.push({
        power: "0",
        coordinates: "0, 0"
      });

      return prev;
    })
  };

  handleDropMagnet = (ind) => {
    this.setState(prev => {
      prev.magnets.splice(ind, 1);

      console.log(prev.magnets);
      return prev;
    })
  }
}