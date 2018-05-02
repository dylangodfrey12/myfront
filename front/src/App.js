import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import logo from './logo.svg';
//npm run dev
class App extends Component {
    state = {
      id: ''
    };
  
    componentDidMount() {
      this.callApi()
        .then(res => this.setState({ id: res.id }))
        .catch(err => console.log(err));
    }
  
    callApi = async () => {
      const response = await fetch('/api/id');
      const body = await response.json();
  
      if (response.status !== 200) throw Error(body.message);
  
      return body;
    };
  
    render() {
      return (
        <div className="App">
          <header className="App-header">

          </header>
          <p className="App-intro">{this.state.id}</p>
        </div>
      );
    }
  }
  
  export default App;


