import React from 'react';
import { Table } from 'semantic-ui-react';

const LinkToRepo = ({ name, url })  => <a href={url} target="_blank">{name}</a>

const Repo = ({ data }) => {
  const  { id, name, description, language, watchers_count, watchers, size, created_at, updated_at, pushed_at, html_url } = data;

  return (
    <Table.Row className="repo">
      <Table.Cell>
        <LinkToRepo name={name} url={html_url} />
      </Table.Cell>
      <Table.Cell content={description} />
      <Table.Cell content={watchers} />
      <Table.Cell content={language} />
    </Table.Row>
  );
};

export default Repo;
