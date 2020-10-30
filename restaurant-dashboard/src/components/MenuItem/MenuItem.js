import React from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import avatar from "assets/img/faces/marc.jpg";
import { TextField } from "@material-ui/core";
import axios from 'axios';

import { firebase } from '../../index';

const styles = {
    cardCategoryWhite: {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none"
    }
  };
  
  

class MenuItem extends React.Component {

    state = {
        selectedImage: null,
        url:'',
        name:this.props.menuItem?this.props.menuItem.name:'',
        price:this.props.menuItem?this.props.menuItem.price:null,
        category:this.props.menuItem?this.props.menuItem.category:'',
        description:this.props.menuItem?this.props.menuItem.description:''
    }


    onFileChange = (e) => {
        this.setState({selectedImage: e.target.files[0]});
        let storageRef = firebase.storage().ref();
        let imageRef = storageRef.child(`images/${this.props.id}`);
        imageRef.put(e.target.files[0]).then(snapshot => {
            imageRef.getDownloadURL().then(url => {
                this.setState({url});
            });
            console.log('image uploaded');
        }).catch(error => {
            console.log('upload failed');
        });
    }

    onClickHandler = (e) => {
        //if price not number show error
        console.log(this.state.price)
        console.log(parseInt(this.state.price));
        if (isNaN(parseInt(this.state.price))) {
            this.setState({price:'Enter a number'});
        } else {
            //allow rest of submission, but check for empty
            let storageRef = firebase.storage().ref();
            let imageRef = storageRef.child(`images/${this.props.id}`);
            firebase.auth().currentUser.getIdToken(true).then(idToken => {
                imageRef.getDownloadURL().then(url=> {
                    axios({
                        method: 'post',
                        url: `http://localhost:8080/restaurantOrders/menu/${idToken}/${this.props.id}`,
                        data: {
                            name: this.state.name,
                            imageUrl: url,
                            category: this.state.category,
                            price: this.state.price,
                            description: this.state.description
                        }
                    }).then(response => {
                        console.log('update successful');
                    }).catch(error => {
                        console.log(error);
                    });
                })
            }) 
        }
    }

    componentDidMount() {
        //get image url
        let storageRef = firebase.storage().ref();
        let imageRef = storageRef.child(`images/${this.props.id}`);
        imageRef.getDownloadURL().then(url => {
            this.setState({url});
        }).catch(error => {
            console.log('no image found');
        });
    }

    onNameChange = e => {
        this.setState({name: e.target.value});
    }

    onPriceChange = e => {
        this.setState({price: e.target.value});
    }

    onCategoryChange = e => {
        this.setState({category: e.target.value});
    }

    onDescriptionChange = e => {
        this.setState({description: e.target.value});
    }


    render() {
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                        <h4 className={this.props.classes.cardTitleWhite}>{this.state.name}</h4>
                        <p className={this.props.classes.cardCategoryWhite}></p>
                        </CardHeader>
                        <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8}>
                            <CustomInput
                                labelText="Food Name"
                                id="name"
                                formControlProps={{
                                fullWidth: true
                                }}
                                inputProps={{onChange:this.onNameChange, value:this.state.name}}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Price"
                                id="price"
                                formControlProps={{
                                fullWidth: true
                                }}
                                inputProps={{onChange:this.onPriceChange, value:this.state.price}}
                            />
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                            <CustomInput
                                labelText="Category"
                                id="category"
                                formControlProps={{
                                fullWidth: true
                                }}
                                inputProps={{onChange:this.onCategoryChange, value:this.state.category}}
                            />
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                            <CustomInput
                                labelText="Description"
                                id="about-me"
                                formControlProps={{
                                fullWidth: true
                                }}
                                inputProps={{onChange:this.onDescriptionChange, value:this.state.description, multiline: true, rows: 5}}
                            />
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={6}>
                                <img width="100" height="100" src={this.state.url}/>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                                <input type="file" onChange={this.onFileChange}>
                                </input>
                            </GridItem>
                        </GridContainer>
                        </CardBody>
                        <CardFooter>
                        <Button color="primary" onClick={this.onClickHandler}>Update Profile</Button>
                        </CardFooter>
                    </Card>
                    </GridItem>
                </GridContainer>
                </div>
        )
    }
}

export default withStyles(styles)(MenuItem);