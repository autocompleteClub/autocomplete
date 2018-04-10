import React, { Component } from 'react';
import InputForm from './InputForm';

import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
    words: [],
    value: '',
    foo:{}
  };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ words: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const words = await fetch('/api/hello');
    const body = await words.json();

    if (words.status !== 200) throw Error(body.message);

    return body;
  };

  handleChange(event) {
    this.setState({value: event.target.value});
  }

   handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        
        <p className="App-intro">{this.state.words}</p>
        <InputForm words={this.state.words} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

export default App;
