import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field as ReduxFormField } from 'redux-form';
import * as actions from '../../state/actions/repos';
import Repo from './Repo'
import ReposControls from './Controls';

class Repos extends Component {
  constructor(props) {
    super(props);

    this.renderChildren = this.renderChildren.bind(this);
  }

  renderChildren() {
    const { repos } = this.props;

    if (!repos) {
      return null;
    } else {
      return (
        repos.map((data, ind) => (<Repo key={ind} data={data} />))
      );
    }
  }

  render() {
    const { nameOfUser } = this.props;

    return (
      <div className="repos list">
        <h2>Repos</h2>
        <ReposControls />
        <br />
        {nameOfUser ? <h3>{nameOfUser}</h3> : null}
        {this.renderChildren()}
      </div>
    );
  }
}

const mapStateToProps = ({ current, repos, owners }) => {
  const { login } = current;

  return {
    nameOfUser: login,
    repos: repos[login] || [],
    user: owners[login] || null
  };
};

const ConnectedRepos = connect(
  mapStateToProps
)(Repos);

export default ConnectedRepos;
