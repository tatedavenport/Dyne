import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { borderRight } from '@material-ui/system';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#28a745',
    },
  },
});

const styles = {
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}

class AddressForm extends React.Component {

  handleClick = () => {
    this.props.onButtonClick();
  }

  render() {
    const classes = this.props.classes;
    return(
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Restaurant details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="restaurantName"
              name="restaurantName"
              label="Restaurant name"
              fullWidth
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField id="state" name="state" label="State/Province/Region" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
              label="Use this address for payment details"
            />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.handleClick}
              >
                Next
              </Button>
            </div>
          </Grid>
        </Grid>
    </React.Fragment>
    )
  }
}

export default withStyles(styles)(AddressForm);
