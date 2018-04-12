import React, { Component } from 'react';
import InputForm from './InputForm';

import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
    cache: null,
    value: '',
    matches: []
  };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getMatches = this.getMatches.bind(this);
    this.sorted = this.sorted.bind(this);
  }
  
  // componentShouldUpdate() {
  //   return 
  // }

  componentDidMount() {
    // this.callApi()
    //   .then(res => this.setState({ words: res }))
    //   .catch(err => console.log(err));
  }

  callApi = async (val) => {
    console.log('in callApi', val)
    const words = await fetch('/words',{
      method:'POST',
      body: JSON.stringify({word:val}),
      headers: new Headers({
            "Content-Type": "application/json"
        })
    });
    const body = await words.json();

    if (words.status !== 200) throw Error(body.message);

    return body;
  };

  handleChange(event) {
    event = event.trim()
    
    if (!this.state.cache){
      console.log(' cache doesnt exist ', event)
      this.callApi(event)
      .then(res =>  this.sorted(res))
      .then(() => this.getMatches(event))
      .catch(err => console.log(err));
    }
    else if (event !== ''){
      console.log('cache exists ', event)
      this.getMatches(event)
    } 
    else if (event === '') this.setState({matches:[]})
  }

  getMatches(event){
    if (this.state.matches.length > 0)
      this.setState({matches: this.state.matches.filter((word) => word.str.startsWith(event))})  
    else{
      console.log('matchets length is 0, event = ', event, 'cache = ', this.state.cache)
      this.setState({matches: this.state.cache[event[0]].filter((word) => word.str.startsWith(event))})
    }
  }

  sorted(cache){
    console.log('in sorted', cache)
    for (let ltr in cache){
      cache[ltr].sort((a,b)=> b.freq - a.freq)
    }
    this.setState({cache: cache})
  }

   handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <InputForm  handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
        {this.state.matches.map((word,i)=> <p key={i}>{word.str}{word.freq}</p>)}
      </div>
    );
  }
}

export default App;


// {this.state.words.map((el,i)=>{
//           return <p key={i} className="App-intro">{el.str}, freq: {el.freq}</p>
//         })}
