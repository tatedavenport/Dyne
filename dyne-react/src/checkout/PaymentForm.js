import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/button';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#28a745'
    }
  }
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

class PaymentForm extends React.Component {
  handleClick = () => {
    this.props.onButtonClick();
  }

  render() {
    const classes = this.props.classes;
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Payment method
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField required id="cardName" label="Name on card" fullWidth autoComplete="cc-name" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardNumber"
              label="Card number"
              fullWidth
              autoComplete="cc-number"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField required id="expDate" label="Expiry date" fullWidth autoComplete="cc-exp" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cvv"
              label="CVV"
              helperText="Last three digits on signature strip"
              fullWidth
              autoComplete="cc-csc"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveCard" value="yes" />}
              label="Remember credit card details for next time"
            />
          </Grid>
          <Grid item xs={12}>
              <div className={classes.buttons}>
                <Button onClick={this.props.handleBack} className={classes.button}>
                  Back
                </Button>
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

export default withStyles(styles)(PaymentForm);
