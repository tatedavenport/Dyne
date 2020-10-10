import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import ContactInfo from './ContactInfo';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#28a745',
    },
  },
});
const styles = {
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}



const steps = ['Restaurant details', 'Contact information', 'Payment details', 'Review Sign-Up'];

class Checkout extends React.Component {

  state = {
    activeStep: 0
  }

  handleNext = () => {
    this.setState({activeStep: this.state.activeStep + 1});
  };

  handleBack = () => {
    this.setState({activeStep: this.state.activeStep - 1});
  };

  handleAddressSubmit = () => {
    this.handleNext();
  }

  handleContactSubmit = () => {
    this.handleNext();
  }

  handlePaymentSubmit = () => {
    this.handleNext();
  }

  handleReviewSubmit = () => {

  }

  getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AddressForm onButtonClick={() => this.handleAddressSubmit()} steps={steps}/>;
      case 1:
        return <ContactInfo onButtonClick={() => this.handleContactSubmit()} steps={steps} handleBack={() => this.handleBack()}/>
      case 2:
        return <PaymentForm onButtonClick={() => this.handleContactSubmit()} steps={steps} handleBack={() => this.handleBack()}/>;
      case 3:
        return <Review onButtonClick={() => this.handleReviewSubmit()} steps={steps} handleBack={() => this.handleBack()}/>;
      default:
        throw new Error('Unknown step');
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <ThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline />
        <AppBar position="absolute" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Dyne
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Restaurant Sign-Up
            </Typography>
            <Stepper alternativeLabel activeStep={this.state.activeStep} className={classes.stepper}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {this.state.activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your order number is #2001539. We have emailed your order confirmation, and will
                    send you an update when your order has shipped.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {this.getStepContent(this.state.activeStep)}
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    </ThemeProvider>
    )
  }
}

export default withStyles(styles)(Checkout);
