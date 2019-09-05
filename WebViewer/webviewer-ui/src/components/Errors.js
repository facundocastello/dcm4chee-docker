import React, { Component } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Errors extends Component {
  componentDidUpdate(prevProps, prevState) {
    const { errors } = this.props;
    if (prevProps.errors !== errors) {
      const errorKeys = Object.keys(errors);
      if (errorKeys.length === 0) return;
      const Message = () =>
        errorKeys.map(key => (
          <div key={key}>
            <strong className="text-capitalize">{key}</strong>
            {errors[key].map((error, index) => (
              <li key={`${key}-${index}`}>{error}</li>
            ))}
          </div>
        ));
      this.notify(Message);
    }
  }

  notify = Message => toast.error(<Message />);

  render() {
    const { errors } = this.props;
    return <ToastContainer />;
  }
}

const mapStateToProps = ({ ui }) => ({
  errors: ui.errors
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Errors);
