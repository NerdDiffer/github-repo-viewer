import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, Button, Icon, Divider } from 'semantic-ui-react';
import * as actions from '../../state/actions/repos';
import Owner from './Owner'
import ReposControls from './Controls';
import ReposList from './List';

class Repos extends Component {
  constructor(props) {
    super(props);

    this.renderChildren = this.renderChildren.bind(this);
    this.handleSortByName = this.handleClickHeader.bind(this, 'name');
    this.handleSortByLanguage = this.handleClickHeader.bind(this, 'language');
    this.handleSortByUpdatedAt = this.handleClickHeader.bind(this, 'updated_at');
  }

  // pass in value from cell (key to sort by) and toggle sorting direction
  handleClickHeader(key) {
    const { sortDir, sortKey, nameOfSelectedUser, reposForSelectedUser } = this.props;
    const dir = sortDir === 'asc' ? 'desc' : 'asc';
    const criteria = { key, dir };

    this.props.sortRepos(nameOfSelectedUser, reposForSelectedUser, criteria);
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
      const { sortKey, sortDir } = this.props;

      return (
        <ReposList sortKey={sortKey} sortDir={sortDir} repos={reposForSelectedUser}
          handleSortByName={this.handleSortByName}
          handleSortByLanguage={this.handleSortByLanguage}
          handleSortByUpdatedAt={this.handleSortByUpdatedAt}
        />
      );
    }
  }

  render() {
    const { selectedUser, nameOfSelectedUser } = this.props;

    const { isFetching } = selectedUser || { isFetching: false };

    return (
      <div className="repos list">
        <h2>Repos</h2>
        <ReposControls />
        <Divider section />
        {this.renderHeader(this.props)}
        <Owner
          ToggleModal={<Button content={`More about ${nameOfSelectedUser}`} loading={isFetching} />}
          data={selectedUser}
        />
        {this.renderChildren()}
      </div>
    );
  }
}

const mapStateToProps = ({ current, repos, owners }) => {
  const { login } = current;
  const { byUser: reposByUser, secondarySortCriteria: sort } = repos;
  const { key: sortKey, dir: sortDir } = sort;

  return {
    nameOfSelectedUser: login,
    reposForSelectedUser: reposByUser[login] ? reposByUser[login].repos : null,
    selectedUser: owners[login] || null,
    sortKey,
    sortDir
  };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({ ...actions }, dispatch)
);

const ConnectedRepos = connect(
  mapStateToProps,
  mapDispatchToProps
)(Repos);

export default ConnectedRepos;
