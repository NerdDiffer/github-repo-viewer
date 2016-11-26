import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Button } from 'semantic-ui-react';
import * as actions from '../../state/actions/repos';

class ReposControls extends Component {
  constructor(props) {
    super(props);

    const { login } = this.props;

    if (login) {
      this.props.getRepos(login);
    }

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(ev, { login }) {
    ev.preventDefault();
    this.props.getRepos(login);
  }

  render() {
    return (
      <Form onSubmit={this.submitForm}>
        <Form.Group>
          <Form.Input
            name="login"
            type="text"
            label="Username"
          />
          <Button action="submit">get user repos</Button>
        </Form.Group>
      </Form>
    );
  }
}

const mapStateToProps = ({ current }) => {
  const { login } = current;
  return { login };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({ ...actions }, dispatch)
);

const ConnectedReposControls = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReposControls);

export default ConnectedReposControls;
