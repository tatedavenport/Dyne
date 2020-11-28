import React, { useEffect } from "react";
// @material-ui/core components
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomTable from "components/CustomTable/CustomTable.js";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { firebase } from "../../index.js";
import axios from 'axios';
import { render } from "react-dom";
import OrderTabs from "components/OrderTabs/OrderTabs.js";
import BugReport from "@material-ui/icons/BugReport";
import Tasks from "components/Tasks/Tasks.js";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import { bugs, website, server } from "variables/general.js";
import { Backdrop, Button, Typography } from "@material-ui/core";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  myButton: {
    backgroundColor: "#a13bb6",
    color: "#fff"
  }
};


class OpenTableList extends React.Component {

  state = {
    needsAttention: {
      items:[],
      ids:[]
    },
    inProcess: {
      items:[],
      ids:[]
    },
    closed: {
      items:[],
      ids:[]
    },
    selectedTab: null,
    needsCheckboxState: [],
    inCheckboxState: [],
    closedCheckboxState: [],
    backDropOpen: false,
    backDropState: {
      date: "",
      name: "",
      orderNumber: "",
      running: false,
      tableIdentifier: "",
      tip: "", 
      foodItems: []
    }
  }

  resetNeedsCheckboxState = () => {
    console.log('resetting')
    let temp = [...this.state.needsCheckboxState]
    for(let i = 0; i < temp.length; i++) {
      temp[i]=false;
    }
    this.setState({needsCheckboxState: temp})
  }

  resetInCheckboxState = () => {
    console.log('resetting')
    let temp = [...this.state.inCheckboxState]
    for(let i = 0; i < temp.length; i++) {
      temp[i]=false;
    }
    this.setState({inCheckboxState: temp})
  }

  resetClosedCheckboxState = () => {
    console.log('resetting')
    let temp = [...this.state.closedCheckboxState]
    for(let i = 0; i < temp.length; i++) {
      temp[i]=false;
    }
    this.setState({closedCheckboxState: temp})
  }

  onNeedsCheckboxClick = (e) => {
    console.log('click')
    let stateArray = [...this.state.needsCheckboxState];
    let idx = parseInt(e.target.id);
    stateArray[e.target.id] = e.target.checked;
    this.setState({needsCheckboxState: stateArray});
  }

  onInCheckboxClick = (e) => {
    console.log('click')
    let stateArray = [...this.state.inCheckboxState];
    let idx = parseInt(e.target.id);
    stateArray[e.target.id] = e.target.checked;
    this.setState({inCheckboxState: stateArray});
  }

  onClosedCheckboxClick = (e) => {
    console.log('click')
    let stateArray = [...this.state.closedCheckboxState];
    let idx = parseInt(e.target.id);
    stateArray[e.target.id] = e.target.checked;
    this.setState({closedCheckboxState: stateArray});
  }

  updateOrders = (response) => {
    //need to clear first
    var needsStateArrayItems = [];
    var needsStateArrayIds = [];
    var inStateArrayItems = [];
    var inStateArrayIds = [];
    var closedStateArrayItems = [];
    var closedStateArrayIds = [];
    response.data.forEach((order, idx) => {
      let newTableDataEntry = [];
      newTableDataEntry[0] = order.data.orderNumber;
      newTableDataEntry[1] = order.data.foodItems?this.calculateFoodItemCount(order.data.foodItems):0;
      newTableDataEntry[2] = order.data.name;
      newTableDataEntry[3] = order.data.date;
      var stateArrayItems = [];
      if (order.data.status ==="needs attention") {
        needsStateArrayItems.push(newTableDataEntry);
        needsStateArrayIds.push(order.id);
      } else if (order.data.status ==="in process") {
        inStateArrayItems.push(newTableDataEntry);
        inStateArrayIds.push(order.id);
      } else if (order.data.status ==="closed") {
        closedStateArrayItems.push(newTableDataEntry);
        closedStateArrayIds.push(order.id);
      } else {
        console.log(`Order ${order.id} didn't have a valid status`);
      }
    });
    this.setState({needsAttention: {items: needsStateArrayItems, ids: needsStateArrayIds}});
    this.setState({inProcess: {items: inStateArrayItems, ids: inStateArrayIds}});
    this.setState({closed: {items: closedStateArrayItems, ids:  closedStateArrayIds}});
  }

  calculateFoodItemCount = foodItems => {
    let count = 0;
    foodItems.forEach(foodItem =>{
      count += foodItem.count ? foodItem.count : 0;
    })
    return count;
  }

  componentDidMount() {
    this.setState({selectedTab: "Needs Attention"});
    firebase.auth().currentUser.getIdToken(true).then(idToken => {
      axios({
        method: 'post',
        url:'http://localhost:8080/restaurantOrders/orders',
        data: {
          idToken: idToken,
          status:'needs attention'
        }
      }).then(response => {
            response.data.forEach((order, idx) => {
              let newTableDataEntry = [];
              newTableDataEntry[0] = order.data.orderNumber;
              newTableDataEntry[1] = order.data.foodItems?this.calculateFoodItemCount(order.data.foodItems):0;
              newTableDataEntry[2] = order.data.name;
              newTableDataEntry[3] = order.data.date;
              if (order.data.status ==="needs attention") {
                var stateArrayItems = [...this.state.needsAttention.items];
                var stateArrayIds = [...this.state.needsAttention.ids];
                stateArrayItems.push(newTableDataEntry);
                stateArrayIds.push(order.id);
                this.setState({needsAttention: {items: stateArrayItems, ids: stateArrayIds}});
              } else if (order.data.status ==="in process") {
                var stateArrayItems = [...this.state.inProcess.items];
                var stateArrayIds = [...this.state.inProcess.ids];
                stateArrayItems.push(newTableDataEntry);
                stateArrayIds.push(order.id);
                this.setState({inProcess: {items: stateArrayItems, ids: stateArrayIds}});
              } else if (order.data.status ==="closed") {
                var stateArrayItems = [...this.state.closed.items];
                var stateArrayIds = [...this.state.closed.ids];
                stateArrayItems.push(newTableDataEntry);
                stateArrayIds.push(order.id);
                this.setState({closed: {items: stateArrayItems, ids: stateArrayIds}});
              } else {
                console.log(`Order ${order.id} didn't have a valid status`);
              }
            });
      }).catch(error1 => {
        console.log(error1);
        console.log('Error getting needs attention orders');
      })
    }).catch(error => {
      console.log(error);
      console.log('Couldn\'t get idToken');
    })
  };

  moveButtonClick = (e) => {
    //based on the text content get the right set of ids to send to the server, 
    if (this.state.selectedTab === "Needs Attention") {
      console.log('needs attention');
      //needs attention
      firebase.auth().currentUser.getIdToken(true).then(idToken => {
        //get correct Needs Attention Orders
        let idsToSend = [];
        this.state.needsAttention.ids.forEach((id, idx) => {
          console.log(`${id}, ${idx}`)
          if (this.state.needsCheckboxState[idx]) {
            idsToSend.push(id);
          }
        });
        axios({
          method:"POST",
          url:`http://localhost:8080/restaurantOrders/orderUpdate/${idToken}`,
          data: {
            ids: idsToSend,
            newStatus: "in process"
          }
        }).then(response => {
          //use response to set state
          this.updateOrders(response);
          this.resetNeedsCheckboxState();
        }).catch(error =>{
          console.log(error);
        })
      })
    } else if (this.state.selectedTab === "In Process") {
      //in process
      console.log('in process');
      firebase.auth().currentUser.getIdToken(true).then(idToken => {
        //get correct in process Orders
        let idsToSend = [];
        this.state.inProcess.ids.forEach((id, idx) => {
          console.log(`${id}, ${idx}`)
          if (this.state.inCheckboxState[idx]) {
            idsToSend.push(id);
          }
        });
        axios({
          method:"POST",
          url:`http://localhost:8080/restaurantOrders/orderUpdate/${idToken}`,
          data: {
            ids: idsToSend,
            newStatus: "closed"
          }
        }).then(response => {
          //use response to set state
          this.updateOrders(response);
          this.resetInCheckboxState();
        }).catch(error =>{
          console.log(error);
        })
      })
    } else if (e.target.textContent === "Closed") {
      //closed
    }
  }

  tabClick = (e) => {
    this.setState({checkboxState: []});
    this.setState({selectedTab: e.target.textContent});
  }

  onRowClick = key => {
    console.log(key)
    //open backdrop populated with correct info using key
    //1. use key to find id
    let id;
    if (this.state.selectedTab === "Needs Attention") {
      id = this.state.needsAttention.ids[key];
    } else if (this.state.selectedTab ==="In Process") {
      id = this.state.inProcess.ids[key];
    } else if (this.state.selectedTab ==="Closed") {
      id = this.state.closed.ids[key];
    }
    //2. use id to request order info from backend
    firebase.auth().currentUser.getIdToken(true).then(idToken => {
      axios({
        method:"GET",
        url: `http://localhost:8080/restaurantOrders/restaurants/${idToken}/orders/${id}`
      }).then(response => {
        console.log(response.data);
        //3. use order info to populate backdrop state
        let newBackDropState = {
          name: response.data.data.name,
          orderNumber: response.data.data.orderNumber,
          date: response.data.data.date,
          foodItems: response.data.data.foodItems,
          running: response.data.data.running,
          tableIdentifier: response.data.data.tableIdentifier,
          tip: response.data.data.tip
        }
        //4. show backdrop
        this.setState({backDropOpen: true, backDropState: newBackDropState});
      }).catch(error => {
        console.log(error);
      })
    });
    
  }


  render() {
    console.log(this.state)
    return (
      <div>
      <GridContainer>
        <GridItem xs={12}>
          <OrderTabs
              tabClick={this.tabClick}
              title="Orders:"
              headerColor="primary"
              tabs={[
                {
                  tabName: "Needs Attention",
                  tabIcon: BugReport,
                  tabContent: (
                    <CustomTable
                      tableHeaderColor="primary"
                      tableHead={["Order Number", "Item Count", "Customer Name", "Time Since Order"]}
                      tableData={this.state.needsAttention.items}
                      stickyHeader
                      onCheckboxClick={this.onNeedsCheckboxClick}
                      checkboxState={this.state.needsCheckboxState}
                      onRowClick={this.onRowClick}
                    />
                  )
                },
                {
                  tabName: "In Process",
                  tabIcon: Code,
                  tabContent: (
                    <CustomTable
                      tableHeaderColor="primary"
                      tableHead={["Order Number", "Item Count", "Customer Name", "Time Since Order"]}
                      tableData={this.state.inProcess.items}
                      stickyHeader
                      onCheckboxClick={this.onInCheckboxClick}
                      checkboxState={this.state.inCheckboxState}
                      onRowClick={this.onRowClick}
                    />
                  )
                },
                {
                  tabName: "Closed",
                  tabIcon: Cloud,
                  tabContent: (
                    <CustomTable
                      tableHeaderColor="primary"
                      tableHead={["Order Number", "Item Count", "Customer Name", "Time Since Order"]}
                      tableData={this.state.closed.items}
                      stickyHeader
                      onCheckboxClick={this.onClosedCheckboxClick}
                      checkboxState={this.state.closedCheckboxState}
                      onRowClick={this.onRowClick}
                    />
                  )
                }
              ]}
            />
        </GridItem>
      </GridContainer>
        <div style={{display: "flex", flexDirection: "row-reverse"}}>
          <Button variant="contained" className={this.props.classes.myButton} onClick={this.moveButtonClick}>Move order</Button>
        </div>
        <Backdrop open={this.state.backDropOpen} style={{zIndex: 3}} onClick={()=>{this.setState({backDropOpen: false})}}>
              <Card style={{width: "30vw", height: "40vh"}}>
                <CardContent>
                  <div >
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                      <Typography style={{color: "#333333", marginLeft: "1rem", fontSize: "20px"}}>
                        Order #{this.state.backDropState.orderNumber}
                      </Typography>
                      <Typography style={{color: "#333333", marginRight: "1rem", fontSize: "20px"}}>
                        {this.state.backDropState.date}
                      </Typography>
                    </div>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "1rem"}}>
                      <Typography style={{fontSize: "25px"}}>
                        {this.state.backDropState.name}
                      </Typography>
                      <Typography style={{fontSize: "20px"}}>
                        {this.state.backDropState.running ? "Runner on the way!" : "No Runner yet!"}
                      </Typography>
                    </div>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "1rem"}}>
                      <Typography style={{color: "#333333", marginLeft: "1rem", fontSize: "20px"}}>
                        Table #{this.state.backDropState.tableIdentifier}
                      </Typography>
                    </div>
                    <hr style={{width: "95%", marginTop: "1rem"}}/>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "1rem"}}>
                      <div style={{display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "1rem"}}>
                        {this.state.backDropState.foodItems.map(foodItem => {
                          console.log(foodItem)
                          return (
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "1rem"}}>
                              <Typography style={{fontSize: "25px"}}>
                                {foodItem.count}x
                              </Typography>
                              <Typography style={{marginLeft: "2rem", fontSize: "25px"}}>
                                {foodItem.name}
                              </Typography>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <hr style={{width: "95%", marginTop: "2rem"}}/>
                  </div>
                </CardContent>
                <CardActions>

                </CardActions>
              </Card>
        </Backdrop>
      </div>
    );
  }
}

export default withStyles(styles)(OpenTableList);
