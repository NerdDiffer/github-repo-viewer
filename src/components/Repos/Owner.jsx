import React from 'react';
import { Card, Image } from 'semantic-ui-react';

const LinkToProfile = ({ login, url })  => <a href={url} target="_blank">{login}</a>

const Owner = ({ data }) => {
  if (!data) { return null; }

  const { login, id, avatar_url, gravatar_url, html_url, type } = data;

  return (
    <Card>
      <Image src={avatar_url} />
      <Card.Content>
        <Card.Header>
          <LinkToProfile login={login} url={html_url} />
        </Card.Header>
        <Card.Description>
          Some info about this person. https://developer.github.com/v3/users/#get-a-single-user
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default Owner;
