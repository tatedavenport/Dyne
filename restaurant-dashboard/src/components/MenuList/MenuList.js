import React from 'react';
import MenuItem from '../MenuItem/MenuItem';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import axios from 'axios';
import { firebase } from "../../index.js";
import { Button } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";

const styles = {
    buttonHolder: {
        display: 'flex',
        justifyContent: 'center'
    }
  };

class MenuList extends React.Component {

    state = {
        menuItems:[] 
    }

    componentDidMount() {
        firebase.auth().currentUser.getIdToken(true).then(idToken => {
            axios({
                method:'get',
                url:'http://localhost:8080/restaurantOrders/menu/'+idToken
            }).then(response => {
                this.setState({menuItems: response.data});
            }).catch(error => {
                console.log(error);
            })
        });
    }

    handleNewMenuItemClick = e => {
        //create new menu item in db
        firebase.auth().currentUser.getIdToken(true).then(idToken => {
            axios({
                method:'post',
                url:'http://localhost:8080/restaurantOrders/menu/'+idToken,
                data: {

                }
            }).then(response => {
                console.log(response.data._path.segments[3]); //this is the newly created menu items id
                const id = response.data._path.segments[3];
                const newArray = this.state.menuItems.concat([{data: {}, id: id}]);
                console.log(newArray);
                this.setState({menuItems: newArray});
            }).catch(error => {
                console.log(error);
            })
        });
        //get id for new menu item, create MenuItem component based on this id
        //push component to state
    }

    render() {
        return (
            <div>
                <GridContainer direction='row'>
                    <GridItem xs={12} sm={12} md={8}>
                        <GridContainer>
                            {this.state.menuItems.map(menuItem => {
                                return (
                                    <GridItem xs={12} sm={12} md={12}>
                                        <MenuItem name={menuItem.data?menuItem.data.name:''} id={menuItem.id} menuItem={menuItem.data?menuItem.data:{}}/>
                                    </GridItem>
                                )
                            })}
                        </GridContainer>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <div className={this.props.classes.buttonHolder}>
                            <Button onClick={this.handleNewMenuItemClick}>
                                New Menu Item
                            </Button>
                        </div>
                    </GridItem>
                </GridContainer>
            </div>
        )
    }
}

export default withStyles(styles)(MenuList);