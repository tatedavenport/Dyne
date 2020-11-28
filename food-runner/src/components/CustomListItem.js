import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import { ThemeProvider, Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import axios from 'axios';
import { withRouter } from "react-router";

const RUNNER_BONUS = 1.49;

const styles = {
    marginLeftAndRight: {
        marginLeft: "1rem",
        marginRight: "1rem"
    },
    backdrop: {
        zIndex:  2,
        color: '#fff',
    },
    card: {
        width: "80vw",
        height: "50vh",
        backgroundColor: "#333333",
        color: "#ffffff"
    }
}

class CustomListItem extends React.Component {

    state ={
        backdrop: false
    }

    onItemClick = () => {
        console.log('item click')
        this.setState({backdrop: !this.state.backdrop});
    }

    onBackdropClick = () => {
        console.log('backdrop click')
        this.setState({backdrop: false});
    }

    calculateFoodItemsCount = foodItems => {
        let count = 0;
        foodItems.forEach(foodItem => {
            count += foodItem.count
        })
        return count
    }

    onAcceptClick = () => {
        //update the order
        axios({
            method: "POST",
            url: `http://localhost:8080/foodRunner/restaurants/${this.props.restID}/orders/${this.props.orderID}/run`
        }).then(response => {
            //push router
            this.props.history.push({
                pathname: "deliver-page",
                state: {
                    order: this.props.order,
                    restaurantName: this.props.restaurantName,
                    foodItemCount: this.calculateFoodItemsCount(this.props.order.foodItems),
                    dasherTotal: RUNNER_BONUS + this.props.order.tip
                }
            })
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <ListItem button style={{boxShadow: ".5px .5px 1px .5px #424242"}} onClick={this.onItemClick}>
                    <Typography style={styles.marginLeftAndRight}>
                        {this.props.order.orderNumber}
                    </Typography>
                    <Typography>
                            - 
                    </Typography>
                    <Typography style={styles.marginLeftAndRight}>
                        {this.props.order.name}
                    </Typography>
                    <Typography>
                            - 
                    </Typography>
                    <Typography style={styles.marginLeftAndRight}>
                        {this.props.order.date}
                    </Typography>
                </ListItem>
                <Backdrop open={this.state.backdrop} style={styles.backdrop}>
                        <Card style={styles.card}>
                            <CardContent>
                                    <Typography style={{color: "#C0C0C0"}} gutterBottom>
                                        #{this.props.order.orderNumber}
                                    </Typography>
                                    <Typography variant="h5" component="h2" style={{marginBottom: "1rem"}}>
                                        {this.props.restaurantName}
                                    </Typography>
                                    <Typography style={{color: "#C0C0C0"}}>
                                        {this.props.order.date}
                                    </Typography>
                                    <hr style={{width: "95%"}}></hr>
                                    <div style={{display: "flex", flexDirection: "column", marginTop: "2rem"}}>
                                        <div style={{display: "flex", flexDirection: "row"}}>
                                            <Typography style={{color: "#C0C0C0"}}>
                                                Food Runner Pay
                                            </Typography>
                                        </div>
                                        <div style={{display: "flex", flexDirection: "row"}}>
                                            <Typography style={{flex: "5", marginLeft: ".5rem"}}>
                                                Runner Bonus
                                            </Typography>
                                            <Typography style={{flex: "1"}}>
                                                ${RUNNER_BONUS}
                                            </Typography>
                                        </div>
                                        <div style={{display: "flex", flexDirection: "row"}}>
                                            <Typography style={{color: "#C0C0C0"}}> 
                                                Tip
                                            </Typography>
                                        </div>
                                        <div style={{display: "flex", flexDirection: "row"}}>
                                            <Typography style={{flex: "5", marginLeft: ".5rem"}}>
                                                Customer Tip
                                            </Typography>
                                            <Typography style={{flex: "1"}}>
                                                ${this.props.order.tip}
                                            </Typography>
                                        </div>
                                        <hr style={{width: "100%"}}></hr>
                                        <div style={{display: "flex", flexDirection: "row"}}>
                                            <Typography style={{flex: "5", marginLeft: ".5rem"}}>
                                                Total
                                            </Typography>
                                            <Typography style={{flex: "1"}}>
                                                ${this.props.order.tip + RUNNER_BONUS}
                                            </Typography>
                                        </div>
                                    </div>
                            </CardContent>
                            <CardActions>
                                <div style={{display: "flex", flexDirection: "row-reverse", justifyContent:"space-between", width: "100%"}}>
                                    <Button style={{color: "#ffffff", float: "right"}} onClick={this.onAcceptClick}>
                                        Accept
                                    </Button>
                                    <Button style={{color: "#ffffff", float: "right"}} onClick={this.onBackdropClick}>
                                        Back
                                    </Button>
                                </div>
                            </CardActions>
                        </Card>
                </Backdrop>
            </div>
        )
    }
}

export default withRouter(CustomListItem);