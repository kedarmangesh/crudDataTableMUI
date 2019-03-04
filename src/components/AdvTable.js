import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import CRUDTableHead from './Table/TableHead';
import CRUDTableToolbar from './Table/TableToolbar';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

function EnhancedTable(props) {

  const [state , setState] = useState({
    selected: [],
    page: 0,
    rowsPerPage: 5,
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
    {'id': 1 ,'name':'Frozen yoghurt', 'calorie': 159, 'fat' : 6.0, 'carb' : 24, 'protein' : 4.0},
    {'id': 2 ,'name':'Ice cream sandwich', 'calorie': 237, 'fat' : 9.0,'carb' : 37,'protein' :  4.3},
    {'id': 3 ,'name':'Eclair', 'calorie': 262,'fat' : 16.0,'carb' : 24, 'protein' :  6.0},
    {'id': 4 ,'name':'Cupcake', 'calorie': 305,'fat' : 3.7,'carb' : 67,'protein' :  4.3},
    {'id': 5 ,'name':'Gingerbread', 'calorie':  356,'fat' : 16.0,'carb' : 49,'protein' :  3.9},
  ]
}

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      setState(() => ({ selected: data.rows.map(n => n.id) }));
      return;
    }
    setState({ selected: [] });
  };

  const handleClick = (event, id) => {
    const { selected } = state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setState({ selected: newSelected });
  };

  const handleChangePage = (event, page) => {
    setState({ page });
  };

  const handleChangeRowsPerPage = event => {
    setState({ rowsPerPage: event.target.value });
  };

  const isSelected = id => {
    return state.selected.indexOf(id) !== -1;
  };
  
    const { classes } = props;
    const {selected, rowsPerPage, page } = state;
    //const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <CRUDTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <CRUDTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={data.rows.length}
              data = {data}
            />
            <TableBody>
              {data.rows.map(n => {
                  const isSelected2 = isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected2}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected2}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected2} />
                      </TableCell>
                      {data.columns.map(column => (
                        <TableCell>{n[column.property]}</TableCell>
                      ))}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    );
  
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
