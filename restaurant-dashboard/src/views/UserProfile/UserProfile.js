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
import HoursInput from "./../../components/HoursInput/HoursInput";
import Avatar from '@material-ui/core/Avatar';

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
    sunday:{},
    monday: {},
    tuesday: {},
    wednesday: {},
    thursday: {},
    friday: {},
    saturday: {},
    email: "",
    imageUrl: ""
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

  onEmailChange = e => {
    console.log(e.target.value)
    this.setState({email: e.target.value})
  }

  onSundayHoursChange = day => {
    let hours = this.state.hours;
    hours.sunday = day;
    this.setState({hours: hours});
  }

  onMondayHoursChange = day => {
    let hours = this.state.hours;
    hours.monday = day;
    this.setState({hours: hours});
  }
  onTuesdayHoursChange = day => {
    let hours = this.state.hours;
    hours.tuesday = day;
    this.setState({hours: hours});
  }
  onWednesdayHoursChange = day => {
    let hours = this.state.hours;
    hours.wednesday = day;
    this.setState({hours: hours});
  }
  onThursdayHoursChange = day => {
    let hours = this.state.hours;
    hours.thursday = day;
    this.setState({hours: hours});
  }
  onFridayHoursChange = day => {
    let hours = this.state.hours;
    hours.friday = day;
    this.setState({hours: hours});
  }
  onSaturdayHoursChange = day => {
    let hours = this.state.hours;
    hours.saturday = day;
    this.setState({hours: hours});
  }

  componentDidMount() {
    //populate components with current restaurant profile info
    firebase.auth().currentUser.getIdToken(true).then(idToken => {
      axios({
        method:"GET",
        url:`http://localhost:8080/restaurantOrders/restaurants/${idToken}`
      }).then(response => {
        console.log(response)
        if (response.data.hours) {
          this.setState({
            imageUrl: response.data.imageUrl,
            companyName: response.data.name,
            description: response.data.description,
            address: response.data.address,
            zip: response.data.zip, 
            city: response.data.city,
            state: response.data.state,
            country: response.data.country,
            email: response.data.email,
            sunday: response.data.hours.sunday,
            monday: response.data.hours.monday,
            tuesday: response.data.hours.tuesday,
            wednesday: response.data.hours.wednesday,
            thursday: response.data.hours.thursday,
            friday: response.data.hours.friday,
            saturday: response.data.hours.saturday
          });
        } else {
            this.setState({
              imageUrl: response.data.imageUrl,
              companyName: response.data.name,
              description: response.data.description,
              address: response.data.address,
              zip: response.data.zip, 
              city: response.data.city,
              state: response.data.state,
              country: response.data.country,
              email: response.data.email,
            });
        }
      }).catch(error =>{
        console.log(error);
      })
    })
  }

  updateProfileClick = e => {
    //send update request to axios, populate state with response
    firebase.auth().currentUser.getIdToken(true).then(idToken => {
      axios({
        method:"POST",
        url:`http://localhost:8080/restaurants/${idToken}`,
        data: {
          description: this.state.description,
          companyName: this.state.companyName,
          hours: {sunday: this.state.sunday, monday: this.state.monday, tuesday: this.state.tuesday, wednesday: this.state.wednesday, thursday: this.state.thursday, friday: this.state.friday, saturday: this.state.saturday},
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

  onSundayStartChange = e => {
    let sunday = this.state.sunday;
    sunday.startTime = e.target.value;
    this.setState({sunday: sunday});
}

onSundayEndChange = e => {
    let sunday = this.state.sunday;
    sunday.endTime = e.target.value;
    this.setState({sunday: sunday});
}

onSundayStartModChange = e => {
    let sunday = this.state.sunday;
    sunday.startMod = e.target.value;
    this.setState({sunday: sunday});
}

onSundayEndModChange = e => {
    let sunday = this.state.sunday;
    sunday.endMod = e.target.value;
    this.setState({sunday: sunday});
}

onMondayStartChange = e => {
    let sunday = this.state.monday;
    sunday.startTime = e.target.value;
    this.setState({monday: sunday});
}

onMondayEndChange = e => {
    let sunday = this.state.monday;
    sunday.endTime = e.target.value;
    this.setState({monday: sunday});
}

onMondayStartModChange = e => {
    let sunday = this.state.monday;
    sunday.startMod = e.target.value;
    this.setState({monday: sunday});
}

onMondayEndModChange = e => {
    let sunday = this.state.monday;
    sunday.endMod = e.target.value;
    this.setState({monday: sunday});
}

onTuesdayStartChange = e => {
    let sunday = this.state.tuesday;
    sunday.startTime = e.target.value;
    this.setState({tuesday: sunday});
}

onTuesdayEndChange = e => {
    let sunday = this.state.tuesday;
    sunday.endTime = e.target.value;
}

onTuesdayStartModChange = e => {
    let sunday = this.state.tuesday;
    sunday.startMod = e.target.value;
    this.setState({tuesday: sunday});
}

onTuesdayEndModChange = e => {
    let sunday = this.state.tuesday;
    sunday.endMod = e.target.value;
    this.setState({tuesday: sunday});
}

onWednesdayStartChange = e => {
    let sunday = this.state.wednesday;
    sunday.startTime = e.target.value;
    this.setState({wednesday: sunday});
}

onWednesdayEndChange = e => {
    let sunday = this.state.wednesday;
    sunday.endTime = e.target.value;
    this.setState({wednesday: sunday});
}

onWednesdayStartModChange = e => {
    let sunday = this.state.wednesday;
    sunday.startMod = e.target.value;
    this.setState({wednesday: sunday});
}

onWednesdayEndModChange = e => {
    let sunday = this.state.wednesday;
    sunday.endMod = e.target.value;
    this.setState({wednesday: sunday});
}

onThursdayStartChange = e => {
    let sunday = this.state.thursday;
    sunday.startTime = e.target.value;
    this.setState({thursday: sunday});
}

onThursdayEndChange = e => {
    let sunday = this.state.thursday;
    sunday.endTime = e.target.value;
    this.setState({thursday: sunday});
}

onThursdayStartModChange = e => {
    let sunday = this.state.thursday;
    sunday.startMod = e.target.value;
    this.setState({thursday: sunday});
}

onThursdayEndModChange = e => {
    let sunday = this.state.thursday;
    sunday.endMod = e.target.value;
    this.setState({thursday: sunday});
}

onFridayStartChange = e => {
    let sunday = this.state.friday;
    sunday.startTime = e.target.value;
    this.setState({friday: sunday});
}

onFridayEndChange = e => {
    let sunday = this.state.friday;
    sunday.endTime = e.target.value;
    this.setState({friday: sunday});
}

onFridayStartModChange = e => {
    let sunday = this.state.friday;
    sunday.startMod = e.target.value;
    this.setState({friday: sunday});
}

onFridayEndModChange = e => {
    let sunday = this.state.friday;
    sunday.endMod = e.target.value;
    this.setState({friday: sunday});
}

onSaturdayStartChange = e => {
    let sunday = this.state.saturday;
    sunday.startTime = e.target.value;
    this.setState({saturday: sunday});
}

onSaturdayEndChange = e => {
    let sunday = this.state.saturday;
    sunday.endTime = e.target.value;
    this.setState({saturday: sunday});
}

onSaturdayStartModChange = e => {
    let sunday = this.state.saturday;
    sunday.startMod = e.target.value;
    this.setState({saturday: sunday});
}

onSaturdayEndModChange = e => {
    let sunday = this.state.saturday;
    sunday.endMod = e.target.value;
    this.setState({saturday: sunday});
}

onFileUpload = e => {
  console.log(e.target.files[0]);
  //update image in firebase storage
  //update restaurant imageUrl in firestore
  //update state with new url
}

  render() {
    console.log(this.state)
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
                <GridItem xs={12} sm={12} md={12}>
                  <div style={{display: "flex", flexDirection:"row", justifyContent: "center"}}>
                    <Avatar src={this.state.imageUrl}/>
                    <input type="file" onChange={this.onFileUpload}/>
                  </div>
                </GridItem>
              </GridContainer>
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
                  <GridItem xs={12} sm={12} md={8}>
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
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
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
                  <GridItem xs={12} sm={12} md={6}>
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
                  <GridItem xs={12} sm={12} md={6}>
                    <HoursInput
                      onSundayStartChange={this.onSundayStartChange}
                      onSundayEndChange={this.onSundayEndChange}
                      onSundayStartModChange={this.onSundayStartModChange}
                      onSundayEndModChange={this.onSundayEndModChange}
                      onMondayStartChange={this.onMondayStartChange}
                      onMondayEndChange={this.onMondayEndChange}
                      onMondayStartModChange={this.onMondayStartModChange}
                      onMondayEndModChange={this.onMondayEndModChange}
                      onTuesdayStartChange={this.onTuesdayStartChange}
                      onTuesdayEndChange={this.onTuesdayEndChange}
                      onTuesdayStartModChange={this.onTuesdayStartModChange}
                      onTuesdayEndModChange={this.onTuesdayEndModChange}
                      onWednesdayStartChange={this.onWednesdayStartChange}
                      onWednesdayEndChange={this.onWednesdayEndChange}
                      onWednesdayStartModChange={this.onWednesdayStartModChange}
                      onWednesdayEndModChange={this.onWednesdayEndModChange}
                      onThursdayStartChange={this.onThursdayStartChange}
                      onThursdayEndChange={this.onThursdayEndChange}
                      onThursdayStartModChange={this.onThursdayStartModChange}
                      onThursdayEndModChange={this.onThursdayEndModChange}
                      onFridayStartChange={this.onFridayStartChange}
                      onFridayEndChange={this.onFridayEndChange}
                      onFridayStartModChange={this.onFridayStartModChange}
                      onFridayEndModChange={this.onFridayEndModChange}
                      onSaturdayStartChange={this.onSaturdayStartChange}
                      onSaturdayEndChange={this.onSaturdayEndChange}
                      onSaturdayStartModChange={this.onSaturdayStartModChange}
                      onSaturdayEndModChange={this.onSaturdayEndModChange}
                      sunday={this.state.sunday}
                      monday={this.state.monday}
                      tuesday={this.state.tuesday}
                      wednesday={this.state.wednesday}
                      thursday={this.state.thursday}
                      friday={this.state.friday}
                      saturday={this.state.saturday}
                    >
                    </HoursInput>
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
