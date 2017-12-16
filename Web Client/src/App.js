import React from 'react';
import './App.css';

import Main from './app/Main';

class App extends React.Component {

  render() {
    return (
      <div>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css" />

        <Main />
      </div>
    );
  }
}

export default App;
