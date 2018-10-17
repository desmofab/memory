import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MemoryIcon from '@material-ui/icons/Memory'
import GamesIcon from '@material-ui/icons/Games'


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },    
    button: {
      margin: theme.spacing.unit,
    },
    extendedIcon: {
      marginRight: theme.spacing.unit,
    },
  })


class TopBar extends Component {

    render() {        
        const {classes} = this.props

        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MemoryIcon />
                        </IconButton>                        
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            React Memory
                        </Typography>
                        <a href="/"><Button variant="extendedFab" aria-label="New Game" className={classes.button}>
                            <GamesIcon className={classes.extendedIcon} />
                            New Game
                        </Button></a>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}


TopBar.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TopBar)