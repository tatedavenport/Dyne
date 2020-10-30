import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/button';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import FoodItem from './FoodItem';

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
  },
  holder: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  icon: {
    marginTop: '.5rem'
  }
}

class PaymentForm extends React.Component {

  state = {
    email: "",
    password: "",
    description: "",
  }

  handleClick = () => {
    this.props.onButtonClick(this.state);
  }

  handleEmailChange = (e) => {
    this.setState({email: e.target.value});
  }

  handlePasswordChange = (e) => {
    this.setState({password: e.target.value});
  }

  handleDescriptionChange = (e) => {
    this.setState({description: e.target.value});
  }

  render() {
    const classes = this.props.classes;
    return (
      <div>
      <React.Fragment>
          <Typography variant="h6" gutterBottom>
              Create your account!
          </Typography>
          <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
              <TextField
                  required
                  id="accountName"
                  name="accoutnName"
                  label="Email"
                  fullWidth
                  autoComplete="given-name"
                  onChange={this.handleEmailChange}
                  value={this.state.email}
              />
              </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    required
                  id="password"
                  name="password"
                  label="Password"
                  fullWidth
                  autoComplete="given-name"
                  onChange={this.handlePasswordChange}
                  value={this.state.password}
              />
              </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                  id="description"
                  name="description"
                  label="Restaurant Description"
                  fullWidth
                  autoComplete="given-name"
                  onChange={this.handleDescriptionChange}
                  value={this.state.description}
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
  </div>
    )
  }
}

export default withStyles(styles)(PaymentForm);
