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
    foodItems: []
  }

  handleClick = () => {
    this.props.onButtonClick();
  }

  handleNewItemClick = () => {
    console.log(this.state);
    let myArray = this.state.foodItems;
    myArray.push(this.state.foodItems.length);
    this.setState({foodItems: myArray});
    console.log(this.state);
  }

  render() {
    const classes = this.props.classes;
    return (
      <React.Fragment>
        <div className={classes.holder}>
          <Typography variant="h6" gutterBottom className={classes.icon}>
            Go ahead and add some items to your menu!
          </Typography>
          <IconButton onClick={this.handleNewItemClick}>
            <AddIcon ></AddIcon>
          </IconButton>
        </div>
            {this.state.foodItems.map(foodItem => <FoodItem/>)}
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
                  Finish Signing Up
                </Button>
              </div>
            </Grid>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(PaymentForm);
