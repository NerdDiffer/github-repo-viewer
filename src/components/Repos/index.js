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

    this.handleSortByName = this.handleClickHeader.bind(this, 'name');
    this.handleSortByLanguage = this.handleClickHeader.bind(this, 'language');
    this.handleSortByUpdatedAt = this.handleClickHeader.bind(this, 'updated_at');
  }

  // pass in value from cell (key to sort by) and toggle sorting direction
  handleClickHeader(key) {
    const { sortDir, nameOfSelectedUser, repos } = this.props;
    const dir = sortDir === 'asc' ? 'desc' : 'asc';
    const criteria = { key, dir };

    this.props.sortRepos(nameOfSelectedUser, repos, criteria);
  }

  renderOwner() {
    const { repoOwner } = this.props;

    if (!repoOwner || !repoOwner.isValid) {
      return null;
    } else {
      const { isFetching, info } = repoOwner;
      const { name, login } = info;

      const toggleButton = (
        <Button loading={isFetching} content={`More about ${name || login}`} />
      );

      return (
        <div className="owner">
          <h4>Code by {name || login}</h4>
          <Owner
            ToggleModal={toggleButton}
            data={info}
          />
        </div>
      );
    }
  }

  renderRepos() {
    const { repos, repoOwner } = this.props;

    if (!repos || (repoOwner && !repoOwner.isValid)) {
      return null;
    } else if (repos.length === 0) {
      return (<p>Looks like this user has no repos</p>);
    } else {
      const { sortKey, sortDir } = this.props;

      return (
        <ReposList sortKey={sortKey} sortDir={sortDir} repos={repos}
          handleSortByName={this.handleSortByName}
          handleSortByLanguage={this.handleSortByLanguage}
          handleSortByUpdatedAt={this.handleSortByUpdatedAt}
        />
      );
    }
  }

  render() {
    return (
      <div className="repos list">
        <h2>Repos</h2>
        <ReposControls />
        <Divider section />
        {this.renderOwner()}
        {this.renderRepos()}
      </div>
    );
  }
}

const mapStateToProps = ({ current, repos, owners }) => {
  const { login } = current;
  const { byUser, secondarySortCriteria } = repos;
  const { key, dir } = secondarySortCriteria;

  return {
    nameOfSelectedUser: login,
    repos: byUser[login] ? byUser[login].repos : null,
    repoOwner: owners[login] || null,
    sortKey: key,
    sortDir: dir
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
