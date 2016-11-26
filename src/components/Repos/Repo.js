import React from 'react';
import { Table, Label } from 'semantic-ui-react';

const LinkToRepo = ({ name, url })  => <a href={url} target="_blank">{name}</a>

const mapLangToLabel = {
  javascript: 'yellow',
  ruby: 'red',
  viml: 'green',
  shell: 'olive',
  css: 'violet'
};

const Repo = ({ data }) => {
  const  { id, name, description, language, watchers_count, watchers, size, created_at, updated_at, pushed_at, html_url } = data;

  const color = mapLangToLabel[language.toLowerCase()];

  return (
    <Table.Row className="repo">
      <Table.Cell>
        <LinkToRepo name={name} url={html_url} />
      </Table.Cell>
      <Table.Cell content={description} />
      <Table.Cell content={watchers} />
      <Table.Cell>
        <Label color={color} content={language} />
      </Table.Cell>
    </Table.Row>
  );
};

export default Repo;
