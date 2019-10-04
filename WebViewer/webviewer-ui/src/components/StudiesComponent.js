import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { loadStudies } from '../store/studies';
import { formatDate } from '../utils/dates';
import CustomForm from './CustomForm';

class StudiesComponent extends Component {
  state = {
    studyParent: '',
    studyName: '',
    pouch: '',
    users: [],
    showCards: false
  };

  componentDidMount() {
    // this.props.loadSamples();
    this.props.loadStudies({});
  }

  onInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  renderInstances = () => {
    return this.props.studies.map(study => (
      <a
        href={`http://localhost:8080/wado?requestType=WADO&studyUID=${study.StudyInstanceUID}&seriesUID=${study.SeriesInstanceUID}&objectUID=${study.SOPInstanceUID}`}
      >
        <img
          className='m-1'
          src={`http://localhost:8080/wado?requestType=WADO&studyUID=${study.StudyInstanceUID}&seriesUID=${study.SeriesInstanceUID}&objectUID=${study.SOPInstanceUID}&columns=256`}
        />
      </a>
    ));
  };

  renderStudiesCards = () => {
    const studies = this.props.studies.map(study => (
      <div
        className='col-12 col-md-4'
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
        </div>
      </div>
    ));
    return <div className='row pt-4'>{studies}</div>;
  };

  renderStudiesTable = () => {
    const { level } = this.props;
    const studies = this.props.studies.map(study => (
      <div
        className='row'
        onClick={() =>
          this.props.loadStudies({
            filters: {
              StudyInstanceUID: study.StudyInstanceUID,
              SeriesInstanceUID: study.SeriesInstanceUID
            }
          })
        }
      >
        <div className='border col-3 py-1'>
          {study.PatientName}
          {formatDate(study.StudyDate) && ` - ${formatDate(study.StudyDate)}`}
        </div>
        <div className='border col-3'>{study.ModalitiesInStudy}</div>
        {study.NumberofStudyRelatedSeries && (
          <div className='border col-3'>{study.NumberofStudyRelatedSeries}</div>
        )}
        {study.NumberofStudyRelatedInstances && (
          <div className='border col-3'>
            {study.NumberofStudyRelatedInstances}
          </div>
        )}
        {study.NumberofSeriesRelatedInstances && (
          <div className='border col-3'>
            {study.NumberofSeriesRelatedInstances}
          </div>
        )}
      </div>
    ));

    return (
      <div className=' pt-4'>
        <div className='row'>
          <div className='bg-medytec border col-3 font-weight-bold'>Name</div>
          <div className='bg-medytec border col-3 font-weight-bold'>
            Modality
          </div>
          {level === 'study' && (
            <div className='bg-medytec border col-3 font-weight-bold'>
              Related Series
            </div>
          )}
          <div className='bg-medytec border col-3 font-weight-bold'>
            Related Instances
          </div>
        </div>
        {studies}
      </div>
    );
  };

  render() {
    const { level, studies } = this.props;
    const { showCards } = this.state;

    return (
      <div>
        <div className='d-flex justify-content-around'>
          <div className='w-90 mt-4'>
            <h1 className='rounded text-center bg-medytec'>Studies</h1>

            <CustomForm
              formName='search-study'
              formButton='Search'
              actionSubmit={() => this.props.loadStudies({})}
              formItems={{
                InstanceNumber: {
                  title: 'Instance Number'
                },
                InstanceAvailability: {
                  title: 'Instance Availability'
                },
                PatientName: {
                  title: 'Patient Name'
                },
                StudyDate: {
                  title: 'Study Date'
                },
                ModalitiesInStudy: {
                  title: 'Modalities In Study'
                }
              }}
            />
            <div className='d-none d-md-flex justify-content-end'>
              <div
                className='text-medytec badge border p-2'
                onClick={() =>
                  this.setState(prevState => ({
                    showCards: !prevState.showCards
                  }))
                }
              >
                {showCards ? (
                  <i className='fa fa-2x fa-list'></i>
                ) : (
                  <i class='fa fa-2x fa-id-card-o' aria-hidden='true'></i>
                )}
              </div>
            </div>
            {level === 'instance' ? (
              this.renderInstances()
            ) : (
              <div>
                <div
                  className={classnames(
                    showCards ? 'd-none' : 'd-none d-md-block'
                  )}
                >
                  {this.renderStudiesTable()}
                </div>
                <div
                  className={classnames(showCards ? 'd-block' : 'd-md-none')}
                >
                  {this.renderStudiesCards()}
                </div>
              </div>
            )}
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
