import React from 'react';
import './index.css';
import RestaurantCard from './components/RestaurantCard';
import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import Typography from '@material-ui/core/Typography';
import OrderPage from './components/OrderPage';

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
        height: "100vh",  
        flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        overflowY: "auto",
    }
}

const orders = [
    {
        orderNumber: 1,
        name: "phil",
        date: "12:54:12, 12/21",
        foodItems: [
            {
                id: "testid1",
                count: "2",
                name: "Whopper"
            },
            {
                id: "testid2",
                count: "1",
                name: "Fries" 
            }
        ],
        tip: 2.99,
        tableIdentifier: 3,
    },
    {
        orderNumber: 3,
        name: "john",
        date: "12:54:12, 12/21",
        foodItems: [
            {
                id: "testid1",
                count: "1",
                name: "Whopper"
            },
            {
                id: "testid2",
                count: "2",
                name: "Fries" 
            }
        ],
        tip: 1.99,
        tableIdentifier: 2,
    }
]

class Test extends React.Component {
    render() {
        return (
            <React.StrictMode>
                        <OrderPage imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Burger_King_logo.svg/1200px-Burger_King_logo.svg.png" name="Burger King" orders={orders}/>
            </React.StrictMode>
        )
    }
}

export default withStyles(styles)(Test);