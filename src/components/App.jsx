import React from 'react';
import { Container, Segment } from 'semantic-ui-react';

const App = props => {
  return (
    <Container
      className="app"
      textAlign="center"
      text
    >
      <Segment>
        <h1>React Redux Template</h1>
        {props.children}
      </Segment>
    </Container>
  );
}
export default App;
