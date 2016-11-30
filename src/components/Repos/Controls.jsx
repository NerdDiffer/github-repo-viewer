import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Button } from 'semantic-ui-react';
import { getRepos } from '../../state/actions/repos';
import { getUser } from '../../state/actions/owners';

class ReposControls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    }

    const { login } = this.props;

    if (login) {
      this.props.getRepos(login)
        .then(() => this.handleGetUser(login));
    }

    this.updateValue = this.updateValue.bind(this);

    this.handleGetRepos = this.handleGetRepos.bind(this);
    this.handleGetUser = this.handleGetUser.bind(this);
  }

  updateValue(ev) {
    const value = ev.target.value;
    this.setState({ value });
  }

  handleGetRepos(e) {
    e.preventDefault();
    const { value } = this.state;
    return this.props.getRepos(value)
      .then(() => this.setState({ value: '' }))
      .then(() => this.handleGetUser(value))
      .catch(err => {
        const msg = `${err}, skipping fetch user`;
        console.log(msg);
        return msg;
      });
  }

  handleGetUser(value) {
    this.props.getUser(value);
  }

  render() {
    return (
      <Form className="repo controls">
        <Form.Input
          name="login"
          type="text"
          label="Username"
          value={this.state.value}
          onChange={this.updateValue}
        />
        <Button onClick={this.handleGetRepos} content="Show another user's repos" />
      </Form>
    );
  }
}

const mapStateToProps = ({ current }) => {
  const { login } = current;
  return { login };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({ getUser, getRepos }, dispatch)
);

const ConnectedReposControls = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReposControls);

export default ConnectedReposControls;
