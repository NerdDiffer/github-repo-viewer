import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, Button } from 'semantic-ui-react';
import * as actions from '../../state/actions/repos';
import Repo from './Repo'
import Owner from './Owner'
import ReposControls from './Controls';

class Repos extends Component {
  constructor(props) {
    super(props);

    this.renderChildren = this.renderChildren.bind(this);
  }

  renderHeader() {
    const { selectedUser, nameOfSelectedUser } = this.props;

    if (!nameOfSelectedUser) {
      return null;
    } else if (!!selectedUser){
      const { name, login } = selectedUser;
      return (<h4>Code by {name || login}</h4>);
    } else {
      return (<h4>Code by {nameOfSelectedUser}</h4>);
    }
  }

  renderChildren() {
    const { reposForSelectedUser } = this.props;

    if (!reposForSelectedUser) {
      return null;
    } else {
      return (
        <Table celled structured>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell content="name" />
              <Table.HeaderCell content="description" />
              <Table.HeaderCell content="watchers" />
              <Table.HeaderCell content="language" />
              <Table.HeaderCell content="last updated" />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {reposForSelectedUser.map((data, ind) => (<Repo key={ind} data={data} />))}
          </Table.Body>
        </Table>
      );
    }
  }

  render() {
    const { selectedUser, nameOfSelectedUser } = this.props;

    return (
      <div className="repos list">
        <h2>Repos</h2>
        <ReposControls />
        <Owner
          ToggleModal={<Button content={`More about ${nameOfSelectedUser}`} />}
          data={selectedUser}
        />
        <br />
        {this.renderHeader(this.props)}
        {this.renderChildren()}
      </div>
    );
  }
}

const mapStateToProps = ({ current, repos, owners }) => {
  const { login } = current;
  const { byUser: reposByUser } = repos;

  return {
    nameOfSelectedUser: login,
    reposForSelectedUser: reposByUser[login] ? reposByUser[login].repos : null,
    selectedUser: owners[login] || null
  };
};

const ConnectedRepos = connect(
  mapStateToProps
)(Repos);

export default ConnectedRepos;
