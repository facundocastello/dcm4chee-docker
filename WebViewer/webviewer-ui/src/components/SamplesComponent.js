import React, { Component } from "react";
import { connect } from "react-redux";

import { addSample, deleteSample, loadSamples } from "../store/samples";
import { isArray } from "util";
import Input from "./Input";

class SamplesComponent extends Component {
  state = {
    sampleParent: "",
    sampleName: "",
    pouch: "",
    users: []
  };

  componentDidMount() {
    this.props.loadSamples();
  }

  renderParents = parents => {
    if (!parents) parents = this.props.samples;
    return (
      parents &&
      parents.length > 0 && (
        <div className="d-flex">
          <strong>Parents:</strong>
          {parents.map((parent, index) => (
            <div
              className="bg-warning"
              id={parent._id}
              key={`user-${index}`}
              selected={index === 0}
            >
              {parent.name}
              {/* <div className="bg-danger" onClick={deleteParent(parent._id)} >X</div> */}
            </div>
          ))}
        </div>
      )
    );
  };

  renderSamples = () => {
    const { samples } = this.props;
    return (
      samples &&
      samples.map((sample, index) => (
        <div className="d-flex col-3" key={`user-${index}`}>
          <div className="p-3 border rounded m-3 w-100">
            <div>
              <strong>Name</strong> {sample.name}
            </div>
            {isArray(sample.parent)
              ? this.renderParents(sample.parent)
              : this.renderParents([sample.parent])}
            <div className="bg-danger" onClick={deleteSample(sample._id)}>
              X
            </div>
          </div>
        </div>
      ))
    );
  };

  onInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleAddSample = () => {
    let { sampleParent } = this.state;
    // if (sampleParent === "") sampleParent = this.props.samples.length > 0 ? this.props.samples[0]._id : '';
    this.props.addSample({
      name: this.state.sampleName,
      parent: sampleParent
    });
  };

  handleSelect = (event, elements) => {
    this.setState({
      [event.target.name]: elements[event.target.selectedIndex - 1]._id
    });
  };

  render() {
    const { samples } = this.props;

    return (
      <div>
        <div className="d-flex justify-content-around">
          <div className="w-75 mt-4">
            <h1 className="bg-light">Samples</h1>
            <div className="row mb-5">
              <Input
                className="col-3"
                title="Name"
                name="sampleName"
                onInputChange={this.onInputChange}
              />
              <Input
                className="col-3"
                elements={samples}
                title="Parent"
                type="select"
                name="sampleParent"
                onInputChange={this.handleSelect}
              />
            </div>
            <a
              className="bg-warning p-2 rounded border"
              onClick={this.handleAddSample}
            >
              Add Sample
            </a>
            <div className="row pt-4">{this.renderSamples()}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ samples }) => ({
  ...samples
});

const mapDispatchToProps = {
  addSample,
  deleteSample,
  loadSamples
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SamplesComponent);
