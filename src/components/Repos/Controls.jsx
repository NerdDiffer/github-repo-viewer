import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field as ReduxFormField } from 'redux-form';
import * as actions from '../../state/actions/repos';

export const InputField = field => {
  const { type, meta, input } = field;
  const isErrorPresent = meta.touched && meta.error;

  return (
    <div className="form_field_container">
      <input {...input} type={type} />
      {isErrorPresent ? <span className="error">{meta.error}</span> : null}
    </div>
  );
};

class ReposControls extends Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm({ login }) {
    this.props.getRepos(login);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.submitForm)}>
        <fieldset>
          <label>Username</label>
          <ReduxFormField
            name="login"
            type="text"
            component={InputField}
          />
        </fieldset>
        <br />
        <button action="submit">Refresh</button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({ ...actions }, dispatch)
);

const form = reduxForm({
  form: 'repos'
})(ReposControls);

const ConnectedReposControls = connect(
  null,
  mapDispatchToProps
)(form);

export default ConnectedReposControls;
