import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadStudies } from '../store/studies';
import { isArray } from 'util';
import Input from './Input';
import { formatDate } from '../utils/dates';
import CustomForm from './CustomForm';

class StudiesComponent extends Component {
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
          this.props.loadStudies({
            filters: {
              StudyInstanceUID: study.StudyInstanceUID,
              SeriesInstanceUID: study.SeriesInstanceUID
            }
          })
        }
      >
        <div className='row border m-2 rounded'>
          <div className='col-12 bg-medytec py-1'>
            {study.PatientName}
            {formatDate(study.StudyDate) && ` - ${formatDate(study.StudyDate)}`}
          </div>
          <div className='col-6'>
            <strong>Modality:</strong> {study.ModalitiesInStudy}
          </div>
          {study.NumberofStudyRelatedSeries && (
            <div className='col-6'>
              <strong>Related Series:</strong>{' '}
              {study.NumberofStudyRelatedSeries}
            </div>
          )}
          {study.NumberofStudyRelatedInstances && (
            <div className='col-6'>
              <strong>Related Instances:</strong>{' '}
              {study.NumberofStudyRelatedInstances}
            </div>
          )}
          {study.NumberofSeriesRelatedInstances && (
            <div className='col-6'>
              <strong>Related Instances:</strong>{' '}
              {study.NumberofSeriesRelatedInstances}
            </div>
          )}
          {study.SOPInstanceUID && (
            <a
              href={`http://localhost:8080/wado?requestType=WADO&studyUID=${study.StudyInstanceUID}&seriesUID=${study.SeriesInstanceUID}&objectUID=${study.SOPInstanceUID}`}
            >
              <img
                src={`http://localhost:8080/wado?requestType=WADO&studyUID=${study.StudyInstanceUID}&seriesUID=${study.SeriesInstanceUID}&objectUID=${study.SOPInstanceUID}&columns=128`}
              />
            </a>
          )}
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
            <h1 className='text-center bg-medytec'>Studies</h1>

            <CustomForm
              formName='search-study'
              formButton='Search'
              actionSubmit={() => this.props.loadStudies({})}
              formItems={{
                InstanceNumber: {
                  title: 'InstanceNumber'
                },
                InstanceAvailability: {
                  title: 'InstanceAvailability'
                },
                ModalitiesInStudy: {
                  title: 'ModalitiesInStudy'
                },
                PatientName: {
                  title: 'PatientName'
                },
                PatientID: {
                  title: 'PatientID'
                },
                QueryLevel: {
                  title: 'QueryLevel'
                },
                StudyDate: {
                  title: 'StudyDate'
                }
              }}
            />
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
)(StudiesComponent);
