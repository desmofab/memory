import React, { Component } from 'react'
import './css/App.css'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import TopBar from './TopBar'
import MemoryGrid from './MemoryGrid'


class App extends Component {

    state = {
        tiles: [
            {
                'label': 'A',
                'bgColor': 'bg-blue'
            },
            {
                'label': 'B',
                'bgColor': 'bg-green'        
            },
            {
                'label': 'C',
                'bgColor': 'bg-red'        
            },
            {
                'label': 'D',
                'bgColor': 'bg-yellow'        
            },
            {
                'label': 'E',
                'bgColor': 'bg-purple'        
            },
            {
                'label': 'F',
                'bgColor': 'bg-brown'        
            },            
        ],
        moves: 0,      
    }

    movesIncrement = () => {
        const {moves} = this.state
    
        this.setState({
            moves: moves + 1
        })
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
                    <TopBar totalMoves={moves} />
                </div>        
                <header className="App-header"></header>
                <div>
                    <MemoryGrid tilesData={tiles} movesIncrement={this.movesIncrement} />
                </div> 
            </div>
            </MuiThemeProvider>
        )
    }
}


export default App
