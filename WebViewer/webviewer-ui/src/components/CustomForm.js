import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Input from './Input';

import { receiveFormValue } from '../store/forms';
import Button from './Button';

class CustomForm extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }

  componentDidMount() {
    const { formName, formItems } = this.props;
    const items = Object.keys(formItems).forEach(element => {
      this.props.receiveFormValue(formName, {
        [element]: formItems[element].defaultValue
      });
    });
  }

  handleSubmit = () => {
    const { forms, formName } = this.props;
    this.props.actionSubmit(forms[formName] ? forms[formName] : {});
  };

  onInputChange = event => {
    const { formItems, formName } = this.props;

    switch (event.target.type) {
      case 'select-one':
        const elements = formItems[event.target.name].elements;
        this.props.receiveFormValue(formName, {
          [event.target.name]:
            event.target.selectedIndex === 0
              ? ''
              : elements[event.target.selectedIndex - 1][
                  event.target.getAttribute('indexname')
                ]
        });
        break;

      default:
        this.props.receiveFormValue(formName, {
          [event.target.name]: event.target.value
        });
        break;
    }
  };

  renderFormItems = () => {
    const { formItems, formName } = this.props;
    return Object.keys(formItems).map((item, index) => (
      <Input
        key={`${formName}-${index}`}
        name={item}
        onInputChange={this.onInputChange}
        className='col-12 col-md-6 col-lg-3'
        {...formItems[item]}
      />
    ));
  };

  render() {
    const { className, inputsClass, formButton } = this.props;
    return (
      <div className={classnames(className && className)}>
        <div className={classnames(inputsClass, 'row mb-3')}>
          {this.renderFormItems()}
        </div>
        {formButton && (
          <div className='d-flex justify-content-center'>
            <Button className='bg-medytec' clickedButton={this.handleSubmit}>
              {formButton}
            </Button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ forms }) => ({ ...forms });

const mapDispatchToProps = { receiveFormValue };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomForm);
