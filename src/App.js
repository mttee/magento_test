import React from 'react';
import './App.css';
import Router from './Router/router'
import { Container } from 'semantic-ui-react'

function App() {
  return (
    <div className="App">
      <Container fluid>
        <Router/>
      </Container>
    </div>
  );
}

export default App;
