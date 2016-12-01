import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Button, Dropdown } from 'semantic-ui-react';
import { getRepos } from '../../state/actions/repos';
import { getUser } from '../../state/actions/owners';
import { setCurrentUser } from '../../state/actions/current';

class ReposControls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      options: []
    }

    const { login } = this.props;

    if (login) {
      this.props.getRepos(login)
        .then(() => this.handleGetUser(login));
    }

    this.handleGetRepos = this.handleGetRepos.bind(this);
    this.handleGetUser = this.handleGetUser.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleClickButton = this.handleClickButton.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { namesOfOwners: currNames } = this.props;
    const { namesOfOwners: nextNames } = nextProps;

    if (nextNames.length !== currNames.length) {
      const login = nextNames[nextNames.length - 1];
      const newestOption = { value: login, text: login };
      console.log(this.state.options);
      const options = this.state.options.concat(newestOption);

      this.setState({ options });
      console.log(this.state.options);
    }
  }

  handleGetRepos(value) {
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

  updateValue(ev) {
    const value = ev.target.value;
    this.setState({ value });
  }

  handleDropdownChange(_ev, { name, value }) {
    return this.props.setCurrentUser(value);
  }

  handleClickButton(e) {
    e.preventDefault();
    const { value } = this.state;
    return this.handleGetRepos(value);
  }

  render() {
    const { namesOfOwners } = this.props;
    const { options } = this.state;

    return (
      <Form className="repo controls">
        <Form.Input
          name="login"
          type="text"
          label="Username"
          value={this.state.value}
          onChange={this.updateValue}
        />
        <Form.Button
          onClick={this.handleClickButton}
          content="Fetch User Repos"
        />
        <Dropdown
          text='Show Cached Users'
          search
          floating
          labeled
          button
          className='icon'
          options={options}
          onChange={this.handleDropdownChange}
        />
      </Form>
    );
  }
}

const mapStateToProps = ({ current, owners }) => {
  const { login } = current;
  const { logins } = owners;

  return {
    login,
    namesOfOwners: logins
  };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({ getUser, getRepos, setCurrentUser }, dispatch)
);

const ConnectedReposControls = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReposControls);

export default ConnectedReposControls;
