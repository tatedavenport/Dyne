import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#28a745'
      }
    }
});
  
const styles = {
    paper: {
      marginTop: '1rem',
      marginBottom: '1rem',
      padding: '1rem'
    },
    imageHolder: {
        display: 'flex',
        justifyContent: 'center'
    },
    imageText: {
        marginTop: '.7rem'
    }
}

  

class FoodItem extends React.Component {
    render() {
        const classes = this.props.classes;
        return (
            <Paper className={classes.paper} elevation={3}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField required id="foodName" label="Name of food" fullWidth autoComplete="cc-name" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                    required
                    id="foodPrice"
                    label="Food price"
                    fullWidth
                    autoComplete="cc-number"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField required id="category" label="Category" helperText="Separate with commas if more than one" fullWidth autoComplete="cc-exp" />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    multiline
                    required
                    id="foodDescription"
                    label="Description"
                    fullWidth
                    autoComplete="cc-csc"
                    rows={3}
                    variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.imageHolder}>
                        <IconButton>
                            <PhotoCamera></PhotoCamera>
                        </IconButton>
                        <Typography className={classes.imageText}>
                            Upload an image of your food item
                        </Typography>
                    </div>
                </Grid>
            </Grid>
            </Paper>
        )
    }
}

export default withStyles(styles)(FoodItem);