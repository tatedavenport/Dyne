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
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import axios from "axios";
import { firebase } from "../../index.js";

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

class UserProfile extends React.Component {

  state = {
    companyName: "",
    city: "",
    state: "",
    country: "",
    address: "",
    zip: "",
    description: "",
    hours: "",
    email: "",
  }

  onNameChange = e => {
    this.setState({companyName: e.target.value});
  }

  onCityChange = e => {
    this.setState({city: e.target.value});
  }

  onStateChange = e => {
    this.setState({state: e.target.value})
  }

  onCountryChange = e => {
    this.setState({country: e.target.value})
  }

  onAddressChange = e => {
    this.setState({address: e.target.value})
  }

  onZipChange = e => {
    this.setState({zip: e.target.value})
  }

  onDescriptionChange = e => {
    this.setState({description: e.target.value})
  }

  onHoursChange = e => {
    this.setState({hours: e.target.value})
  }

  onEmailChange = e => {
    console.log(e.target.value)
    this.setState({email: e.target.value})
  }

  componentDidMount() {
    //populate components with current restaurant profile info
    console.log('mounted')
    firebase.auth().currentUser.getIdToken(true).then(idToken => {
      axios({
        method:"GET",
        url:`http://localhost:8080/restaurantOrders/restaurants/${idToken}`
      }).then(response => {
        console.log(response);
        this.setState({
          companyName: response.data.name,
          description: response.data.description,
          hours: response.data.hours,
          address: response.data.address,
          zip: response.data.zip, 
          city: response.data.city,
          state: response.data.state,
          country: response.data.country,
          email: response.data.email
        });
      }).catch(error =>{
        console.log(error);
      })
    })
  }

  updateProfileClick = e => {
    console.log(this.state);
    //send update request to axios, populate state with response
    firebase.auth().currentUser.getIdToken(true).then(idToken => {
      axios({
        method:"POST",
        url:`http://localhost:8080/restaurants/${idToken}`,
        data: {
          description: this.state.description,
          companyName: this.state.companyName,
          hours: this.state.hours,
          address: this.state.address,
          zip: this.state.zip,
          city: this.state.city,
          state: this.state.state,
          email: this.state.email,
          country: this.state.country
        }
      }).then(response => {

      }).catch(error => {
        console.log(error);
      })
    })
  }

  render() {
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={this.props.classes.cardTitleWhite}>Edit Profile</h4>
                <p className={this.props.classes.cardCategoryWhite}>Complete your profile</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Company"
                      id="company-disabled"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange:this.onNameChange,
                        value: this.state.companyName
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Email address"
                      id="email-address"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange:this.onEmailChange,
                        value: this.state.email
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Hours"
                      id="hours"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange:this.onHoursChange,
                        value: this.state.hours
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Address"
                      id="address"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange:this.onAddressChange,
                        value: this.state.address
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="City"
                      id="city"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange:this.onCityChange,
                        value: this.state.city
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Country"
                      id="country"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange:this.onCountryChange,
                        value: this.state.country
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Zip Code"
                      id="postal-code"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange:this.onZipChange,
                        value: this.state.zip
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Description"
                      id="description"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5
                      }}
                      inputProps={{
                        onChange:this.onDescriptionChange,
                        value: this.state.description
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.updateProfileClick}>Update Profile</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(UserProfile)
