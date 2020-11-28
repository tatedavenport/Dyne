import React from 'react';
import './index.css';
import RestaurantCard from './components/RestaurantCard';
import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import Typography from '@material-ui/core/Typography';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import axios from 'axios';

const theme = createMuiTheme({
    palette: {
      text:{
        primary: "#FFFFFF"
      }
    }
});

const styles = {
    root: {
        backgroundColor: "#333333",
        color: "white",
        display: "flex",
        //height: "100vh",  
        flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        overflowY: "auto",
    }
}


class App extends React.Component {

    constructor(props) {
        super(props)
    }

    state = {
        restaurants: []
    }

    componentDidMount() {
        //fetch restaurants and set state
        axios({
            method:"GET",
            url: "http://localhost:8080/foodRunner/restaurants"
        }).then(response => {
            this.setState({restaurants: response.data});
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        return (
            <React.StrictMode>
                <ThemeProvider theme={theme}>
                    <div style={styles.root}>
                        <div style={{backgroundColor: "#424242", borderRadius: "16px", marginTop: "10px", textAlign: "center", paddingLeft: "1rem", paddingRight: "1rem", maxWidth: "66vw", marginBottom: "10px"}}>
                            <Typography variant="h5" style={{textAlign: "center"}}>
                                Pick a restaurant to Run for!
                            </Typography>
                        </div>
                        {this.state.restaurants.map((restaurant, idx) => {
                            return (
                                <RestaurantCard 
                                    name={restaurant.data.name}
                                    description={restaurant.data.description}
                                    imageUrl={restaurant.data.imageUrl}
                                    id={restaurant.id}
                                />
                            )
                        })}
                    </div>
                </ThemeProvider>
            </React.StrictMode>
        )
    }
}

export default withStyles(styles)(App);