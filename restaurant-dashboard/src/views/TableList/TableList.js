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


class TableList extends React.Component {

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
      }).then(response => {
        console.log(response);
        //create new tableData array - 4 entries: order number, item count, customer name, and time since order
        let newTableData = [];
        response.data.forEach((order, idx) => {
          let newTableDataEntry = [];
          newTableDataEntry[0] = order.orderNumber;
          newTableDataEntry[1] = order.foodItems.length;
          newTableDataEntry[2] = order.name;
          newTableDataEntry[3] = order.date;
          newTableData[idx] = newTableDataEntry;
        });
        //set state
        this.setState({needsAttention: newTableData});
      }).catch(error => {
        console.log(error);
      })
    }).catch(error => {
      console.log('Couldn\'t get idToken');
    })
  }

  render() {
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={this.props.classes.cardTitleWhite}>Need Attention</h4>
              <p className={this.props.classes.cardCategoryWhite}>
                These orders need attention
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
                tableData={[
                  ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
                  ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
                  ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                  ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
                  ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
                  ["Mason Porter", "Chile", "Gloucester", "$78,615"]
                ]}
                stickyHeader
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    
    );
  }
}

export default withStyles(styles)(TableList);
