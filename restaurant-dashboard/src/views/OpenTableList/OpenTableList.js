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
  }
};


class OpenTableList extends React.Component {

  state = {
    needsAttention: [],
    inProcess: []
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
      }).then(response1 => {
        axios({
            method: 'post',
            url:'http://localhost:8080/restaurantOrders/orders',
            data: {
              idToken: idToken,
              status:'in process' 
            }
        }).then(response2 => {
            console.log(response1);
            //create new tableData array - 4 entries: order number, item count, customer name, and time since order
            let newTableData1 = [];
            response1.data.forEach((order, idx) => {
              let newTableDataEntry = [];
              newTableDataEntry[0] = order.orderNumber;
              newTableDataEntry[1] = order.foodItems?order.foodItems.length:0;
              newTableDataEntry[2] = order.name;
              newTableDataEntry[3] = order.date;
              newTableData1[idx] = newTableDataEntry;
            });
            let newTableData2 = [];
            response2.data.forEach((order, idx) => {
                let newTableDataEntry = [];
                newTableDataEntry[0] = order.orderNumber;
                newTableDataEntry[1] = order.foodItems?order.foodItems.length:0;
                newTableDataEntry[2] = order.name;
                newTableDataEntry[3] = order.date;
                newTableData2[idx] = newTableDataEntry;
              });
            //set state
            this.setState({needsAttention: newTableData1});
            this.setState({inProcess: newTableData2});
        }).catch(error2 => {
            console.log('Error getting in process orders')
        })
      }).catch(error1 => {
        console.log('Error getting needs attention orders');
      })
    }).catch(error => {
      console.log('Couldn\'t get idToken');
    })
  }

  render() {
    return (
      <GridContainer>
        {/* <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={this.props.classes.cardTitleWhite}>Closed</h4>
              <p className={this.props.classes.cardCategoryWhite}>
                These orders have already been taken care of
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["Order Number", "Item Count", "Customer Name", "Time Since Order"]}
                tableData={this.state.needsAttention}
                stickyHeader
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={this.props.classes.cardTitleWhite}>In Process</h4>
              <p className={this.props.classes.cardCategoryWhite}>
                These orders are in the kitchen
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["Order Number", "Item Count", "Customer Name", "Time Since Order"]}
                tableData={this.state.inProcess}
                stickyHeader
              />
            </CardBody>
          </Card>
        </GridItem> */}
        <GridItem xs={12}>
          <OrderTabs
              title="Orders:"
              headerColor="primary"
              tabs={[
                {
                  tabName: "Open Orders",
                  tabIcon: BugReport,
                  tabContent: (
                    <Table
                      tableHeaderColor="primary"
                      tableHead={["Order Number", "Item Count", "Customer Name", "Time Since Order"]}
                      tableData={[["#57ad6", "2", "Timmy", "3 minutes"],["#4x760", "3", "Sally Thompson", "12 Minutes"], ["#3dfd7", "1", "Tate Davenport", "16 Minutes"]]}
                      stickyHeader
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
                    />
                  )
                }
              ]}
            />
        </GridItem>
      </GridContainer>
    
    );
  }
}

export default withStyles(styles)(OpenTableList);
