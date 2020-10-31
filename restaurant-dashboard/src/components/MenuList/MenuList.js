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
                console.log(response.data.id); //this is the newly created menu items id
                const id = response.data.id;
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

    onDeleteHandler = id => {
        firebase.auth().currentUser.getIdToken(true).then(idToken => {
            axios({
                method:'post',
                url:`http://localhost:8080/restaurantOrders/menu/${idToken}/${id}/delete`
            }).then(response => {
                console.log('Document deleted');
                //delete corresponding menuitem
                const newArray = this.state.menuItems.filter(menuItem => {
                    return menuItem.id !== id;
                });
                console.log(newArray);
                this.setState({menuItems: newArray});
            }).catch(error => {
                console.log(error);
            });
        }).catch(error => {
            console.log(error);
        }); 
    }

    render() {
        console.log(this.state.menuItems);
        return (
            <div>
                <GridContainer direction='row'>
                    <GridItem xs={12} sm={12} md={8}>
                        <GridContainer>
                            {this.state.menuItems.map(menuItem => {
                                return (
                                    <GridItem xs={12} sm={12} md={12}>
                                        <MenuItem name={menuItem.data?menuItem.data.name:''} id={menuItem.id} menuItem={menuItem.data?menuItem.data:{}} onDeleteHandler={this.onDeleteHandler}/>
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