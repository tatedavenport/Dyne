import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

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

class ContactInfo extends React.Component {

    state = {
        firstName: "",
        lastName: "",
        number: "",
    }

    handleClick = () => {
        this.props.onButtonClick(this.state);
    }

    handleFirstNameChange = (e) => {
        this.setState({firstName: e.target.value});
    }

    handleLastNameChange = (e) => {
        this.setState({lastName: e.target.value});
    }

    handleNumberChange = (e) => {
        this.setState({number: e.target.value});
    }

    render() {
        const classes = this.props.classes;
        return (
            <div>
                <React.Fragment>
                    <Typography variant="h6" gutterBottom>
                        Who should we contact?
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label="First name"
                            fullWidth
                            autoComplete="given-name"
                            onChange={this.handleFirstNameChange}
                            value={this.state.firstName}
                        />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="lastName"
                            name="lastName"
                            label="Last name"
                            fullWidth
                            autoComplete="given-name"
                            onChange={this.handleLastNameChange}
                            value={this.state.lastName}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            required
                            id="phoneNumber"
                            name="phoneNumber"
                            label="Phone Number"
                            fullWidth
                            autoComplete="shipping address-level2"
                            onChange={this.handleNumberChange}
                            value={this.state.number}
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

export default withStyles(styles)(ContactInfo);