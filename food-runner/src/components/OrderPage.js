import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import CustomListItem from './CustomListItem';

const styles = {
    root: {
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
        alignItems: "center",
        color: "#ffffff",
        backgroundColor: "#333333",
        overflowY: "auto",
        height: "100vh"
    },
    avatar: {
        width: "7rem",
        height: "7rem"
    },
    secondRoot: {
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column",
        alignItems: "center",
    },
    marginLeftAndRight: {
        marginLeft: "1rem",
        marginRight: "1rem"
    }
}



class OrderPage extends React.Component {
    render() {
        return (
            <div style={styles.root}>
                <div style={styles.secondRoot}>
                    <Avatar src={this.props.location.state.imageUrl} style={styles.avatar}/>
                    <Typography>{this.props.location.state.name}</Typography>
                    <hr style={{width: "90vw"}}></hr>
                </div>
                <div>
                    <List>
                        {this.props.location.state.orders.map((order, idx)=> {
                            return (
                                <CustomListItem order={order.data} restaurantName={this.props.location.state.name} restID={this.props.location.state.id} orderID={order.id}/>
                            )
                        })}
                    </List>
                </div>
            </div>
        )
    }
}

export default OrderPage;