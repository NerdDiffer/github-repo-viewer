import React from 'react';
import { Dimmer, Segment, Icon } from 'semantic-ui-react';

const Loading = (props) => {
  return (
    <Segment id="repos fetching">
      <Dimmer active />
      <Icon name="spinner" loading={true} size="huge" />
    </Segment>
  );
};

export default Loading;
