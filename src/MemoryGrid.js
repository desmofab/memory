import React, {Component} from 'react'
import getShuffledTiles from './utils'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'


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
            tilesInMove: []
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
        /* TODO ... */
        console.log('YOU WIN!!!!')
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

            if(tilesInMove[0].label === tilesInMove[1].label){
                this.niceMove()
            }
            else{
                this.resetMove()
            }

            movesIncrement()
        } 
    }

    /* setState Callback */
    stateChanged() {

        if(this.isGameOver()){
            this.youWin()
        }else{
            this.pairMatching()
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
            <Grid className={classes.root} container spacing={8} justify="center">
                {tiles.map((row, index) => (
                    <Grid item key={index} className='tile' onClick={() => this.tileClicked(index)}>
                        <Paper className={`${classes.paper} ${row.feedback}`} elevation={4}>
                            <Typography className={row.unveiled ? 'tile-unveiled' : 'tile-veiled'}
                                        component="h2"
                                        variant="h1">
                                {row.label}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>           
        )
    }
}

MemoryGrid.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MemoryGrid)