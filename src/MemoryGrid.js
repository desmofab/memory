import React, {Component} from 'react'
import getShuffledTiles from './utils'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
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
    render() {
        const {classes} = this.props
        const {tilesData} = this.props
        const shuffledTiles = getShuffledTiles(tilesData)

        return (
            <Grid className={classes.root} container spacing={8} justify="center">
                {shuffledTiles.map((row, index) => (
                    <Grid item key={index}>
                        <Paper className={classes.paper} elevation={1}>
                            <Typography component="h2" variant="h1">
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