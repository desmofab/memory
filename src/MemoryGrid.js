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
        this.state = {tiles: getShuffledTiles(props.tilesData)}
    }

    tileClicked = index => {
        const {tiles} = this.state;

        let newTile = tiles[index]
        newTile.unveiled = !newTile.unveiled

        this.setState({
            [index] : newTile
        });
    }

    render() {
        
        const {classes} = this.props
        let {tiles} = this.state

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