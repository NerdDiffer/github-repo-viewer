import React, { PropTypes } from 'react';
import { Modal, List, Image, Label } from 'semantic-ui-react';

const HireableLabel = ({ isHireable }) => {
  if (!isHireable) {
    return null;
  } else {
    return (<Label ribbon color="blue" content="Hireable" />);
  }
};

const LinkToProfile = ({ text, url })  => (<a href={url} target="_blank">{text}</a>);

const Owner = ({ data, ToggleModal }) => {
  if (!data) { return null; }

  const { login, id, avatar_url, gravatar_url, html_url, type, name, location, email, hireable, public_repos, followers, following, created_at } = data;

  const imageSize = '40%';
  const dateStr = new Date(created_at).toDateString();
  const listItems = [
    email, location, `${followers} followers`,
    `${public_repos} public repos`, `Member since: ${dateStr}`
  ];

  return (
    <Modal trigger={ToggleModal} size="small">
      <HireableLabel isHireable={hireable} />
      <Modal.Header>
        <LinkToProfile text={name || login} url={html_url} />
      </Modal.Header>
      <Modal.Content image>
        <Image src={avatar_url} width={imageSize} height={imageSize}>
        </Image>
        <Modal.Description>
          <List items={listItems}></List>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

Owner.PropTypes = {
  ToggleModal: PropTypes.element
};

export default Owner;
