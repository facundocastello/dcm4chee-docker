import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Redirect } from 'react-router-dom';

class ViewerComponent extends Component {
  componentDidMount() {
    const study = this.props.location.query;
    if (study === undefined) return <Redirect to='/' />;
  }

  renderInstances = () => {
    const queryParams = this.props.location.query;
    if (queryParams === undefined) return;
    return this.props.studies.map((study, index) => (
      <img
        className={classnames(
          'm-1',
          queryParams.selectedStudyIndex === index && 'border'
        )}
        src={`http://localhost:8080/wado?requestType=WADO&studyUID=${study.StudyInstanceUID}&seriesUID=${study.SeriesInstanceUID}&objectUID=${study.SOPInstanceUID}&columns=256`}
      />
    ));
  };

  render() {
    const { studies } = this.props;
    return <div>{this.renderInstances()}</div>;
  }
}
const mapStateToProps = ({ studies }) => ({ ...studies });

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewerComponent);
