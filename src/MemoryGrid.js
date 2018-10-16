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
        setTimeout(() => {
            this.setState({
                tilesInMove: []
            })
        }, 2000)       
    }

    resetMove = () => {
        setTimeout(() => {
            const {tiles, tilesInMove} = this.state

            this.setState({
                tiles: tiles.map((row, index) => {
                    if([tilesInMove[0].key, tilesInMove[1].key].indexOf(index) >= 0){
                        row.unveiled = false
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

    tileClicked = index => {
        const {tiles, tilesInMove} = this.state
        const clickedTile = tiles[index]

        if(!this.isValidMove(clickedTile)){
            return
        }

        // Second move - pair matching
        if(tilesInMove.length === 1){

            if(clickedTile.label === tilesInMove[0].label){
                this.niceMove()
            }
            else{
                this.resetMove()
            }
        }

        // TODO ++moveCountTotal state from main app

        this.setState({
            tiles: tiles.map((row, rowIndex) =>{
                if(rowIndex === index){
                    row.unveiled = true
                }
                return row
            }),
            tilesInMove: [...tilesInMove, {...clickedTile, key: index}]
        }, () => {
            if(this.isGameOver()){
                this.youWin()
            }
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