import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Redirect } from 'react-router-dom';

class ViewerComponent extends Component {
  state = {
    selectedIndex: undefined,
    selectedImageStyle: {
      position: 'relative',
      top: '0px',
      left: '0px',
      width: '250px',
      height: '250px',
      backgroundImage:
        'url(http://localhost:8080/wado?requestType=WADO&studyUID=1.2.826.0.1.3680043.8.1055.1.20111103111148288.98361414.79379639&seriesUID=1.2.826.0.1.3680043.8.1055.1.20111103111204584.92619625.78204558&objectUID=1.2.826.0.1.3680043.8.1055.1.20111103111204952.93667897.66089881)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    },
    zoomDirection: undefined,
    moveTool: false,
    pressedClick: false,
    mouseMove: {
      x: 0,
      y: 0
    }
  };

  componentDidMount() {
    const study = this.props.location.query;
    if (study === undefined) return <Redirect to='/' />;
    const queryParams = this.props.location.query;
    if (queryParams !== undefined) {
      this.handleSelectedImage(queryParams.selectedStudyIndex);
    }
  }

  handleMoveImage = event => {
    const { moveTool, pressedClick } = this.state;
    if (!moveTool || !pressedClick) return;
    event.persist();
    let x = event.clientX;
    let y = event.clientY;

    this.setState(prevState => {
      const xOffset =
        prevState.mouseMove.x === 0 ? 0 : x - prevState.mouseMove.x;
      const yOffset =
        prevState.mouseMove.y === 0 ? 0 : y - prevState.mouseMove.y;
      return {
        mouseMove: {
          x: x,
          y: y
        },

        selectedImageStyle: {
          ...prevState.selectedImageStyle,
          top:
            prevState.selectedImageStyle.top.split('px')[0] * 1 +
            yOffset +
            'px',
          left:
            prevState.selectedImageStyle.left.split('px')[0] * 1 +
            xOffset +
            'px'
        }
      };
    });
  };

  makeToolAction = () => {
    const { zoomDirection } = this.state;
    if (zoomDirection) this.handleZoom(zoomDirection);
  };

  handleSelectedImage = index => {
    const { studies } = this.props;
    const study = studies[index];
    this.setState(prevState => ({
      selectedImageStyle: {
        ...prevState.selectedImageStyle,
        backgroundImage: `url(http://localhost:8080/wado?requestType=WADO&studyUID=${study.StudyInstanceUID}&seriesUID=${study.SeriesInstanceUID}&objectUID=${study.SOPInstanceUID})`
      },
      selectedIndex: index
    }));
  };

  renderInstances = () => {
    const queryParams = this.props.location.query;
    if (queryParams === undefined) return;
    const selectedIndex =
      this.state.selectedIndex !== undefined
        ? this.state.selectedIndex
        : queryParams.selectedStudyIndex;
    return this.props.studies.map((study, index) => (
      <div
        onClick={() => this.handleSelectedImage(index)}
        style={{
          backgroundImage: `url(http://localhost:8080/wado?requestType=WADO&studyUID=${study.StudyInstanceUID}&seriesUID=${study.SeriesInstanceUID}&objectUID=${study.SOPInstanceUID}&columns=25)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          width: '35px',
          height: '35px'
        }}
        className={classnames('m-1', selectedIndex === index && 'border')}
      />
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

  handleZoom = () => {
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

  setTool = type => {
    switch (type) {
      case 'zoomIn':
        this.setState({ zoomDirection: 'in', moveTool: false });
        break;
      case 'zoomOut':
        this.setState({ zoomDirection: 'out', moveTool: false });

        break;
      case 'move':
        this.setState({
          pressedClick: false,
          mouseMove: { x: 0, y: 0 },
          moveTool: true,
          zoomDirection: undefined
        });

        break;

      default:
        break;
    }
  };

  render() {
    const { moveTool, selectedImageStyle, zoomDirection } = this.state;
    const { studies } = this.props;

    return (
      <div style={{ overflow: 'hidden' }}>
        <div
          style={{ position: 'relative', zIndex: 100, background: 'white' }}
          className='d-flex ml-5 tools'
        >
          <div
            className={classnames(
              'mx-1 p-1 border ',
              zoomDirection === 'in' && 'bg-secondary'
            )}
            onClick={() => this.setTool('zoomIn')}
          >
            zoomDirection in
          </div>
          <div
            className={classnames(
              'mx-1 p-1 border ',
              zoomDirection === 'out' && 'bg-secondary'
            )}
            onClick={() => this.setTool('zoomOut')}
          >
            zoomDirection out
          </div>
          <div
            className={classnames(
              'mx-1 p-1 border ',
              moveTool && 'bg-secondary'
            )}
            onClick={() => this.setTool('move')}
          >
            Move
          </div>
        </div>
        <div
          className='d-flex position-absolute'
          style={{
            top: '90px',
            bottom: 0,
            left: 0,
            right: 0,
            overflow: 'hidden'
          }}
        >
          <div
            className='bg-dark w-15'
            style={{ overflowY: 'scroll', zIndex: 100 }}
          >
            <div className='d-flex flex-row flex-wrap justify-content-center allImages'>
              {this.renderInstances()}
            </div>
          </div>
          <div className='w-85 bg-success selectedImage'>
            <div
              style={selectedImageStyle}
              onMouseDown={() => this.setState({ pressedClick: true })}
              onMouseUp={() =>
                this.setState({
                  pressedClick: false,
                  mouseMove: { x: 0, y: 0 }
                })
              }
              onMouseMove={this.handleMoveImage}
              onMouseOut={() =>
                this.setState({
                  mouseMove: { x: 0, y: 0 },
                  pressedClick: false
                })
              }
              onClick={this.makeToolAction}
              className='m-1'
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
