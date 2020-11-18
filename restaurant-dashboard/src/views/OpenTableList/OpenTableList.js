import React, { useEffect } from "react";
// @material-ui/core components
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { firebase } from "../../index.js";
import axios from 'axios';
import { render } from "react-dom";
import OrderTabs from "components/OrderTabs/OrderTabs.js";
import BugReport from "@material-ui/icons/BugReport";
import Tasks from "components/Tasks/Tasks.js";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import { bugs, website, server } from "variables/general.js";
import { Button } from "@material-ui/core";

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
    selectedTab: null
  }

  componentDidMount() {
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
              newTableDataEntry[1] = order.data.foodItems?order.data.foodItems.length:0;
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
    if (e.target.textContent === "Needs Attention") {
      //needs attention
      firebase.auth().currentUser.getIdToken(true).then(idToken => {
        axios({
          method:"POST",
          url:`http://localhost:8080/restaurantOrders/orderUpdate/${idToken}`,
          data: {
            ids: this.state.needsAttention.ids,
            newStatus: "in process"
          }
        }).then(response => {
          //use response to set state
        }).catch(error =>{
          console.log(error);
        })
      })
    } else if (e.target.textContent === "In Process") {
      //in process
    } else if (e.target.textContent === "Closed") {
      //closed
    }
  }

  tabClick = (e) => {
    console.log(e.target.textContent);
    this.setState({checkboxState: []});
    this.setState({selectedTab: e.target.textContent});
  }

  setCheckedState = (checkboxState) => {
    console.log(checkboxState);
    this.setState({checkboxState: checkboxState});
  }

  render() {
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
                    <Table
                      tableHeaderColor="primary"
                      tableHead={["Order Number", "Item Count", "Customer Name", "Time Since Order"]}
                      tableData={this.state.needsAttention.items}
                      stickyHeader
                      setCheckedState={this.setCheckedState}
                    />
                  )
                },
                {
                  tabName: "In Process",
                  tabIcon: Code,
                  tabContent: (
                    <Table
                      tableHeaderColor="primary"
                      tableHead={["Order Number", "Item Count", "Customer Name", "Time Since Order"]}
                      tableData={[["#5s709", "5", "George P. Burdell", "5 minutes"], ["#9xse8", "1", "Frank Sinard", "8 Minutes"]]}
                      stickyHeader
                      setCheckedState={this.setCheckedState}
                    />
                  )
                },
                {
                  tabName: "Closed",
                  tabIcon: Cloud,
                  tabContent: (
                    <Table
                      tableHeaderColor="primary"
                      tableHead={["Order Number", "Item Count", "Customer Name", "Time Since Order"]}
                      tableData={[["#fx690", "6", "Alvin Fitzpatrick", "2 minutes"]]}
                      stickyHeader
                      setCheckedState={this.setCheckedState}
                    />
                  )
                }
              ]}
            />
        </GridItem>
      </GridContainer>
        <div style={{display: "flex", flexDirection: "row-reverse"}}>
          <Button variant="contained" className={this.props.classes.myButton}>Move to In process</Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(OpenTableList);
