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

  state = {
    name: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  }

  handleClick = () => {
    this.props.onButtonClick(this.state);
  }

  handleNameChange = (e) => {
    this.setState({name: e.target.value});
  }

  handleAddress1Change = (e) => {
    this.setState({address1: e.target.value});
  }

  handleAddress2Change = (e) => {
    this.setState({address2: e.target.value});
  }

  handleZipChange = (e) => {
    this.setState({zip: e.target.value});
  }

  handleCityChange = (e) => {
    this.setState({city: e.target.value});
  }

  handleCountryChange = (e) => {
    this.setState({country: e.target.value});
  }

  handleStateChange = (e) => {
    this.setState({state: e.target.value});
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
              onChange={this.handleNameChange}
              value={this.state.name}
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
              onChange={this.handleAddress1Change}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
              onChange={this.handleAddress2Change}
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
              onChange={this.handleCityChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField id="state" name="state" label="State/Province/Region" fullWidth onChange={this.handleStateChange}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              onChange={this.handleZipChange}
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
              onChange={this.handleCountryChange}
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
