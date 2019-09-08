import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadStudies } from '../store/studies';
import { isArray } from 'util';
import Input from './Input';
import { formatDate } from '../utils/dates';

class SamplesComponent extends Component {
  state = {
    studyParent: '',
    studyName: '',
    pouch: '',
    users: []
  };

  componentDidMount() {
    // this.props.loadSamples();
    this.props.loadStudies({});
  }

  onInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  renderStudies = () => {
    return this.props.studies.map(study => (
      <div
        className='col-4'
        onClick={() =>
          this.props.loadStudies({ filters: { StudyInstance: study.StudyInstance } })
        }
      >
        <div className='row border mx-2 rounded'>
          <div className='col-12 bg-light py-1'>
            {study.PatientsName} - {formatDate(study.StudyDate)}
          </div>
          <div className='col-6'>
            <strong>Modality:</strong> {study.ModalitiesinStudy}
          </div>
          <div className='col-6'>
            <strong>Relates Series:</strong> {study.NumberofStudyRelatedSeries}
          </div>
          <div className='col-6'>
            <strong>Related Instances:</strong>{' '}
            {study.NumberofStudyRelatedInstances}
          </div>
        </div>
      </div>
    ));
  };

  render() {
    const { studies } = this.props;

    return (
      <div>
        <div className='d-flex justify-content-around'>
          <div className='w-75 mt-4'>
            <h1 className='text-center bg-light'>Samples</h1>
            <div className='row mb-5 justify-content-center'>
              <Input
                className='col-3'
                title='Name'
                name='studyName'
                onInputChange={this.onInputChange}
              />
              <Input
                className='col-3'
                elements={studies}
                title='Parent'
                type='select'
                name='studyParent'
                onInputChange={this.handleSelect}
              />
            </div>
            <a
              className='bg-warning p-2 rounded border'
              onClick={this.handleAddSample}
            >
              Search Study
            </a>
            <div className='row pt-4'>{this.renderStudies()}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ studies }) => ({
  ...studies
});

const mapDispatchToProps = {
  loadStudies
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SamplesComponent);
