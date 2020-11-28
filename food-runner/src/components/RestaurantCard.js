import React from 'react';
import Card from '@material-ui/core/Card';
import { ThemeProvider, withStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { withRouter } from "react-router";



class RestaurantCard extends React.Component {

    constructor(props) {
        super(props);
    }

    onViewClick = (e) => {
        axios({
            method: "GET",
            url: `http://localhost:8080/foodRunner/restaurants/${this.props.id}/orders`
        }).then(response => {
            this.props.history.push({
                pathname: "order-page",
                state: {
                    name: this.props.name,
                    imageUrl: this.props.imageUrl,
                    orders: response.data,
                    id: this.props.id
                }
            });
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        return (
            <div style={{paddingTop: "10px", paddingBottom: "10px", color: "#ffffff", width: "75vw"}}>
                <Card style={{backgroundColor: "#424242"}}>
                    <CardHeader 
                        title={this.props.name}
                    />
                    <CardMedia style={{backgroundColor: "#FFFFFF", height: 0, paddingTop: "56.25%"}}
                        square
                        title={this.props.name}
                        image={this.props.imageUrl}
                    />
                    <CardContent>
                        <Typography variant="body2">
                            {this.props.description}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <Button onClick={this.onViewClick}>
                            View Orders
                        </Button>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default withRouter(RestaurantCard);