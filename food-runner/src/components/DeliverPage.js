import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router";

const ORDER_TIME = 20;

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

class DeliverPage extends React.Component {


    generateDate(date) {
        console.log(date)
        let timeString = date.split(",")[1];
        console.log(timeString)
        let timeValues = timeString.split(':');
        let minutes = parseInt(timeValues[1]);
        let hours = parseInt(timeValues[0]);
        let newMinutes = minutes + ORDER_TIME;
        let modifier = timeValues[2].split(' ')[1];
        if (newMinutes >= 60) {
            newMinutes = newMinutes - 60;
            hours += 1;
        }
        return `${hours}:${pad(newMinutes, 2)} ${modifier}`;
    }

    

    render() {
        console.log('hi')
        return (
            <div style={{width: "100vw", height: "100vh", backgroundColor: "#333333", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Card style={{backgroundColor: "#424242", width: "80%", height: "80%", color: "#ffffff"}}>
                    <CardContent>
                        <div>
                            <Typography style={{color: "#c2c2c2", marginTop: "1rem", marginBottom: "1rem"}}>
                                Deliver by {this.generateDate(this.props.location.state.order.date)}
                            </Typography>
                            <Typography variant="h4" style={{marginTop: "1rem", marginBottom: "1rem"}}>
                                {this.props.location.state.restaurantName}
                            </Typography>
                            <Typography style={{color: "#c2c2c2", marginTop: "1rem", marginBottom: "1rem"}}>
                                Order #{this.props.location.state.order.orderNumber} - {this.props.location.state.foodItemCount}x Items
                            </Typography>
                            <hr style={{width: "95%", marginTop: "2rem", marginBottom: "1rem"}}/>
                            <Typography style={{color: "#c2c2c2", marginTop: ".5rem", marginBottom: ".5rem"}}>
                                Deliver To
                            </Typography>
                            <Typography variant="h6" style={{marginTop: ".5rem", marginBottom: ".5rem"}}>
                                {this.props.location.state.order.name}
                            </Typography>
                            <Typography style={{color: "#c2c2c2", marginTop: ".5rem", marginBottom: ".5rem"}}>
                                At Table {this.props.location.state.order.tableIdentifier}
                            </Typography>
                            <hr style={{width: "95%", marginTop: "2rem", marginBottom: "1rem"}}/>
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                <Typography variant="h6">
                                    Total Earnings
                                </Typography>
                                <Typography variant="h6" style={{color: "#c2c2c2"}}>
                                    ${this.props.location.state.dasherTotal}
                                </Typography>
                            </div>
                            <div style={{display: "flex", flexDirection: "column-reverse", overflow: "auto"}}>
                                <Button style={{color: "#ffffff", marginTop: "9rem"}}>
                                    Back to Menu
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default DeliverPage;