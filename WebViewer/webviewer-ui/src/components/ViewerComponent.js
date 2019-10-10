import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Redirect } from 'react-router-dom';

class ViewerComponent extends Component {
  state = {
    selectedImageStyle: {
      position: 'relative',
      top: '0px',
      left: '0px',
      width: '250px',
      height: '250px',
      backgroundImage:
        'url(http://localhost:8080/wado?requestType=WADO&studyUID=1.2.826.0.1.3680043.8.1055.1.20111103111148288.98361414.79379639&seriesUID=1.2.826.0.1.3680043.8.1055.1.20111103111204584.92619625.78204558&objectUID=1.2.826.0.1.3680043.8.1055.1.20111103111204952.93667897.66089881&columns=256)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    },
    zoom: undefined
  };

  componentDidMount() {
    const study = this.props.location.query;
    if (study === undefined) return <Redirect to='/' />;
  }

  makeToolAction = () => {
    const { zoomDirection } = this.state;
    if (zoomDirection) this.zoom(zoomDirection);

    console.log('click');
  };

  renderInstances = () => {
    const queryParams = this.props.location.query;
    if (queryParams === undefined) return;
    return this.props.studies.map((study, index) => (
      <div className='col-3'>
        <img
          className={classnames(
            'm-1',
            queryParams.selectedStudyIndex === index && 'border'
          )}
          src={``}
        />
      </div>
    ));
  };

  setSize = ({ target: img }) => {
    this.setState(prevState => ({
      selectedImageStyle: {
        ...prevState.selectedImageStyle,
        width: `${img.offsetWidth}px`,
        height: `${img.offsetHeight}px`
      }
    }));
  };

  zoom = () => {
    const { zoomDirection } = this.state;
    if (zoomDirection === undefined) return;
    const ratio = zoomDirection === 'in' ? 1.2 : 0.8;

    this.setState(prevState => ({
      selectedImageStyle: {
        ...prevState.selectedImageStyle,
        width: `${prevState.selectedImageStyle.width.split('px')[0] * ratio}px`,
        height: `${prevState.selectedImageStyle.height.split('px')[0] *
          ratio}px`
      }
    }));
  };

  render() {
    const { selectedImageStyle, zoomDirection } = this.state;
    const { studies } = this.props;

    return (
      <div>
        <div className='d-flex ml-5 tools'>
          <div
            className='mx-1 p-1 border '
            onClick={() => this.setState({ zoomDirection: 'in' })}
          >
            {' '}
            zoom in{' '}
          </div>
          <div
            className='mx-1 p-1 border '
            onClick={() => this.setState({ zoomDirection: 'out' })}
          >
            {' '}
            zoom out
          </div>
        </div>
        <div className='row'>
          <div className='col-2 allImages'>{this.renderInstances()}</div>
          <div className='col-10 bg-success selectedImage'>
            <div
              style={selectedImageStyle}
              // onLoad={this.setSize}
              onClick={this.makeToolAction}
              class='m-1 border'
            ></div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ studies }) => ({ ...studies });

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewerComponent);
