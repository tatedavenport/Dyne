import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { Checkbox } from "@material-ui/core";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";



class CustomTable extends React.Component {

  render() {
    console.log('reg table')
    return (
      <div className={this.props.classes.tableResponsive}>
        <Table className={this.props.classes.table}>
          {this.props.tableHead !== undefined ? (
            <TableHead className={this.props.classes[this.props.tableHeaderColor + "TableHeader"]}>
              <TableRow className={this.props.classes.tableHeadRow}>
                {this.props.tableHead.map((prop, key) => {
                  return (
                    <TableCell
                      className={this.props.classes.tableCell + " " + this.props.classes.tableHeadCell}
                      key={key}
                    >
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody>
            {this.props.tableData.map((prop, key) => {
              return (
                <TableRow key={key} className={this.props.classes.tableBodyRow}>
                  {prop.map((prop, key) => {
                    return (
                      <TableCell className={this.props.classes.tableCell} key={key}>
                        {prop}
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    <Checkbox id={key} onChange={this.props.onCheckboxClick} checked={false}>
                      
                    </Checkbox>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}


export default withStyles(styles)(CustomTable);
