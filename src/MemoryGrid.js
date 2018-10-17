import React, {Component} from 'react'
import getShuffledTiles from './utils'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Snackbar from '@material-ui/core/Snackbar';


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    }
})

class MemoryGrid extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tiles: getShuffledTiles(props.tilesData),
            tilesInMove: [],
            winMessage: false
        }
    }

    niceMove = () => {
        const {tiles} = this.state
        const selectedTileKeys = this.getSelectedTileKeys()

        this.setState({
            tiles: tiles.map((row, index) => {
                if(selectedTileKeys.indexOf(index) >= 0){
                    row.feedback = 'nice-move'
                }
                return row
            })
        })

        setTimeout(() => {
            this.setState({
                tiles: tiles.map((row, index) => {
                    row.feedback = ''                    
                    return row
                }),
                tilesInMove: []
            })
        }, 2000)       
    }

    resetMove = () => {
        const {tiles} = this.state
        const selectedTileKeys = this.getSelectedTileKeys()

        this.setState({
            tiles: tiles.map((row, index) => {
                if(selectedTileKeys.indexOf(index) >= 0){
                    row.feedback = 'reset-move'
                }
                return row
            })
        })        

        setTimeout(() => {
            this.setState({
                tiles: tiles.map((row, index) => {
                    if(selectedTileKeys.indexOf(index) >= 0){
                        row.unveiled = false
                        row.feedback = ''
                    }
                    return row
                }),
                tilesInMove: []
            })
        }, 2000)  
    }

    isValidMove = (clickedTile) => {
        const {tilesInMove} = this.state

        // Ignore tiles already unveiled
        if(clickedTile.unveiled){
            return false
        }

        // Avoid third tile unveiling
        if(tilesInMove.length === 2){
            return false
        }        

        return true
    }

    isGameOver = () => {
        const {tiles} = this.state

        const unveiled = tiles.reduce((acc, currentTile) => {
            let sum = currentTile.unveiled ? 1 : 0

            return acc + sum
        }, 0)

        return unveiled === 12
    }

    youWin = () => {
        this.setState({winMessage: true})
    }

    getSelectedTileKeys = () => {
        const {tilesInMove} = this.state

        const selectedTilesKeys = tilesInMove.map( tile => {
            return tile.key
        })

        return selectedTilesKeys
    }

    pairMatching = () => {
        const {movesIncrement} = this.props
        const {tilesInMove} = this.state
        
        // Second move - pair matching
        if(tilesInMove.length === 2){
            movesIncrement()

            if(tilesInMove[0].label === tilesInMove[1].label){
                this.niceMove()
            }
            else{
                this.resetMove()
            }
        } 
    }

    /* setState Callback */
    stateChanged() {

        this.pairMatching()

        if(this.isGameOver()){
            this.youWin()
        }
    }

    tileClicked = index => {
        const {tiles, tilesInMove} = this.state
        const clickedTile = tiles[index]

        if(!this.isValidMove(clickedTile)){
            return
        }

        this.setState({
            tiles: tiles.map((row, rowIndex) =>{
                if(rowIndex === index){
                    row.unveiled = true
                    row.feedback = 'selected-tile'
                }
                return row
            }),
            tilesInMove: [...tilesInMove, {...clickedTile, key: index}]
        }, this.stateChanged)
    }

    render() {        
        const {classes} = this.props
        const {tiles} = this.state

        return (
            <div>
            <Grid className={classes.root} container spacing={8} justify="center">
                {tiles.map((row, index) => (
                    <Grid item key={index} onClick={() => this.tileClicked(index)}>
                        <Paper className={`${classes.paper} ${row.feedback} tile`} elevation={4}>
                            <Typography className={`${row.bgColor} ${row.unveiled ? 'tile-unveiled' : 'tile-veiled'} `}
                                        component="h2"
                                        variant="h1">
                                {row.label}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={this.state.winMessage}
            autoHideDuration={5000}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message='CONGRATULATIONS! YOU WON!!!'
            />         
    </div>
        )
    }
}

MemoryGrid.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MemoryGrid)