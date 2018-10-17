import React, { Component } from 'react'
// import logo from './logo.svg'
import './App.css'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import TopBar from './TopBar'
import MemoryGrid from './MemoryGrid'


class App extends Component {

    state = {
        moves: 0,
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
        const {tiles, moves} = this.state
        const dark = createMuiTheme({
            palette: {
              type: 'dark',
            }
          })

        return (
            <MuiThemeProvider theme={dark}>
            <div className="App">
                <div>
                    <TopBar totalMoves={moves}/>
                </div>        
                <header className="App-header"></header>
                <div>
                    <MemoryGrid tilesData={tiles} />
                </div> 
            </div>
            </MuiThemeProvider>
        )
    }
}


export default App
