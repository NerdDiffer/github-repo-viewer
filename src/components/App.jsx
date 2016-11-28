import React from 'react';
import { Container, Segment } from 'semantic-ui-react';
import FlashMessage from './FlashMessage';

const App = props => {
  return (
    <Container
      className="app"
      textAlign="center"
      text
    >
      <Segment>
        <FlashMessage />
        <h1>Github Repo Viewer</h1>
        {props.children}
      </Segment>
    </Container>
  );
}
export default App;
