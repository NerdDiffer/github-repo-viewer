import React from 'react';

const App = props => {
  return (
    <div className="app">
      <h1>React Redux Template</h1>
      {props.children}
    </div>
  );
}

export default App;
