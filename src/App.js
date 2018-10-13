import React, { Component } from 'react'
// import logo from './logo.svg'
import './App.css'
import MemoryGrid from './MemoryGrid'


class App extends Component {

  state = {
    tiles: [
      {
        'label': 'A',
        'bgColor': 'blue'
      },
      {
        'label': 'B',
        'bgColor': 'green'        
      },
      {
        'label': 'C',
        'bgColor': 'red'        
      },
      {
        'label': 'D',
        'bgColor': 'yellow'        
      },
      {
        'label': 'E',
        'bgColor': 'purple'        
      },
      {
        'label': 'F',
        'bgColor': 'brown'        
      },            
    ]        
  }

  render() {
    const {tiles} = this.state

    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}
          <div>
            <MemoryGrid tilesData={tiles} />
          </div>          
        </header>   
      </div>
    )
  }
}

export default App
