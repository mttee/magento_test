import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Rt from './Router/router'
import { Container } from 'semantic-ui-react'

function App() {
  return (
    <Router>
      <div className="App">
        <Container fluid>
          <Rt/>
        </Container>
      </div>
    </Router>
  );
}

export default App;
