import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


const data = {
  'columns' : [
    {'label': 'Dessert','property': 'name'},
    {'label': 'Calorie','property': 'calorie'},
    {'label': 'Fat','property': 'fat'},
    {'label': 'Carb','property': 'carb'},
    {'label': 'Protein','property': 'protein'},
  ],
  'rows' : [
    {'name':'Frozen yoghurt', 'calorie': 159, 'fat' : 6.0, 'carb' : 24, 'protein' : 4.0},
    {'name':'Ice cream sandwich', 'calorie': 237, 'fat' : 9.0,'carb' : 37,'protein' :  4.3},
    {'name':'Eclair', 'calorie': 262,'fat' : 16.0,'carb' : 24, 'protein' :  6.0},
    {'name':'Cupcake', 'calorie': 305,'fat' : 3.7,'carb' : 67,'protein' :  4.3},
    {'name':'Gingerbread', 'calorie':  356,'fat' : 16.0,'carb' : 49,'protein' :  3.9},
  ]
}



function SimpleTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {data.columns.map(column => (
              <TableCell>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.rows.map(row => (
            <TableRow key={row.id}>
              {data.columns.map(column => (
                
                <TableCell>{row[column.property]}</TableCell>
              ))}
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
