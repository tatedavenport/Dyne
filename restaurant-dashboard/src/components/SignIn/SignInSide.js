import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import EcoIcon from '@material-ui/icons/Eco';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { firebase } from '../../index';


const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#28a745',
      },
      secondary: {
        main: '#00acc1'
      }
    },
  });

const styles = {
  root: {
    height: '100vh',
    width: '100vw'
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#00acc1",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}

class SignInSide extends React.Component {

    state = {
      email: "",
      password: "",
    }

    handleEmailChange = (e) => {
      this.setState({email: e.target.value});
    }
    
    handlePasswordChange = (e) => {
      this.setState({password: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        //sign in with firebase
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(()=>{
          //get id token
          firebase.auth().currentUser.getIdToken(true).catch(error => {
            console.log(error);
          }).then(idToken => {
            //change component with this.props.history.push
            this.props.history.push(`/admin/dashboard`);
          });
        }).catch(error => {
          console.log(error);
          console.log(this.state.email);
          //TODO: display error message and clear fields
        })
    }

    render() {
        return (
            <Grid container component="main" className={this.props.classes.root}>
                <CssBaseline />
                <div style={{display: "flex", justifyContent: "center", width: "100%", height: "100%"}}>
                <Grid item xs={6} sm={6} md={6} component={Paper} elevation={6} square>
                    <div className={this.props.classes.paper}>
                    <Avatar className={this.props.classes.avatar}>
                        <EcoIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={this.props.classes.form} noValidate>
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={this.handleEmailChange}
                        />
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={this.handlePasswordChange}
                        />
                        <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                        />
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={this.props.classes.submit}
                        onClick={this.handleSubmit}
                        style={{backgroundColor: "#00acc1"}}
                        >
                        Sign In
                        </Button>
                        <Grid container>
                        </Grid>
                        <Box mt={5}>
                        </Box>
                    </form>
                    </div>
                </Grid>
                </div>
                {//<Grid item xs={false} sm={4} md={7} className={this.props.classes.image} />
                }
            </Grid>
        );
    };
}

export default withStyles(styles)(SignInSide);