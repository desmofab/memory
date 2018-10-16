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
            tilesInMove: [],
            moveIsForbidden: false
        }
    }

    resetMove = () => {
        const {tiles, tilesInMove} = this.state

        tilesInMove.forEach(currentTile => {
            tiles[currentTile.key].unveiled = false
        })

        this.setState({
            tiles: tiles,
            tilesInMove: []
        })     
    }

    tileClicked = index => {
        const {tiles, tilesInMove} = this.state
        const clickedTile = tiles[index]

        console.log(this.state)

        // Ignore tiles already unveiled
        if(clickedTile.unveiled){
            return
        }       
        
        // Avoid third tile unveiling
        if(tilesInMove.length === 2){
            return
        }
        // if(moveIsForbidden()){ //reactivate after reset
        //     return
        // }
        //TODO Reafctor code above with isValidMove()


        // TODO Check if the game is over using isGameOver()


        // Second move - pair matching
        if(tilesInMove.length === 1){
            const unveiledSibling = tiles.filter(currentTile => {
                return currentTile.label === clickedTile.label && currentTile.unveiled
            })

            // Good Job
            if(unveiledSibling.length === 1){
                this.setState({
                    tilesInMove: []
                })
            }
    
            // Bad Move
            if(unveiledSibling.length === 0){
                setTimeout(() => { this.resetMove() }, 3000)
            }
        }

        // TODO ++moveCountTotal props from main app

        clickedTile.key = index
        clickedTile.unveiled = true
        tiles[index] = clickedTile
        tilesInMove.push(clickedTile)

        this.setState({
            tiles: tiles,
            tilesInMove: tilesInMove
        })
    }

    render() {        
        const {classes} = this.props
        const {tiles} = this.state

        return (
            <Grid className={classes.root} container spacing={8} justify="center">
                {tiles.map((row, index) => (
                    <Grid item key={index} className='tile' onClick={() => this.tileClicked(index)}>
                        <Paper className={classes.paper} elevation={4}>
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