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
import { firebase } from '../../index';
import axios from 'axios';

const BASE_URL = 'localhost:8080';

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



const steps = ['Restaurant details', 'Contact information', 'Account Creation'];

class Checkout extends React.Component {

  state = {
    activeStep: 0,
  }

  values = {
    addressState: {},
    contactState: {},
    paymentState: {}
  }

  handleNext = () => {
    this.setState({activeStep: this.state.activeStep + 1});
  };

  handleBack = () => {
    this.setState({activeStep: this.state.activeStep - 1});
  };

  handleAddressSubmit = (addressState) => {
    this.handleNext();
    this.values.addressState = addressState;
  }

  handleContactSubmit = (contactState) => {
    this.handleNext();
    this.values.contactState = contactState;
  }

  handlePaymentSubmit = (paymentState) => {
    this.handleNext();
    this.values.paymentState = paymentState;
    this.handleCheckoutSubmit();
  }

  handleCheckoutSubmit = () => {
    //create firebase user, which will automatically be signed in
    let idToken;
    console.log(this.values.paymentState.email);
    firebase.auth().createUserWithEmailAndPassword(this.values.paymentState.email, this.values.paymentState.password).then(() => {
      //now user is created, get uid
      let user = firebase.auth().currentUser;
      if (!user) {
        console.log("Error: user is null");
      } else {
        user.getIdToken(true).then(idToken => {
          //post to /restaurants with state to create new restaurant in db, make sure to give it the correct userID
          axios({
            method: 'post',
            url: 'http://localhost:8080/restaurants',
            data: {
              name: this.values.addressState.name,
              imageUrl: 'fix this later with cloud storage',
              description: this.values.paymentState.description,
              foodItems: [],
              userID: idToken,
              hours: { //set this to be manual input later
                Sunday: "10AM-9PM",
                Monday: "10AM-9PM",
                Tuesday: "10AM-9PM",
                Wednesday: "10AM-9PM",
                Thursday: "10AM-9PM",
                Friday: "10AM-9PM",
                Saturday: "10AM-9PM",
              }
            },
          }).then(response => {
            console.log(response);
            let status_400 = false;
            if (!status_400) {
              let new_url = `/admin/${idToken}/dashboard`;
              this.props.history.push(`/admin/dashboard`);
            }
          }, error => {
            console.log(error);
          })
        });
      }
    }).catch(error => {
      console.log(error);
    })
  }


  getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AddressForm onButtonClick={(addressState) => this.handleAddressSubmit(addressState)} steps={steps}/>;
      case 1:
        return <ContactInfo onButtonClick={(contactState) => this.handleContactSubmit(contactState)} steps={steps} handleBack={() => this.handleBack()}/>
      case 2:
        return <PaymentForm onButtonClick={(paymentState) => this.handlePaymentSubmit(paymentState)} steps={steps} handleBack={() => this.handleBack()}/>;
      //case 3:
        //return <Review onButtonClick={() => this.handleReviewSubmit()} steps={steps} handleBack={() => this.handleBack()}/>;
      default:
        throw new Error('Unknown step');
    }
  }

  render() {
    const { classes } = this.props;
    console.log(this.state);
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
                    Thank you for your order!
                  </Typography>
                  <Typography variant="subtitle1">
                    We have emailed your order confirmation, and will contact you shortly with details about how to get setup.
                    Welcome to Dyne!
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
