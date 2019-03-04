import React, {useEffect} from 'react';
import Grow from '@material-ui/core/Grow';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const defaultSearchStyles = theme => ({
  main: {
    display: 'flex',
    flex: '1 0 auto',
  },
  searchIcon: {
    color: theme.palette.text.secondary,
    marginTop: '10px',
    marginRight: '8px',
  },
  searchText: {
    flex: '0.8 0',
  },
  clearIcon: {
    '&:hover': {
      color: theme.palette.error.main,
    },
  },
});

function TableSearch(props)  {

  const handleTextChange = event => {
    const { onSearchChange } = props.options;

    if (onSearchChange) {
      onSearchChange(event.target.value);
    }

    props.onSearch(event.target.value);
  }

  useEffect(() => {
    // Update the document title using the browser API
    document.addEventListener('keydown', onKeyDown, false);
  });
  


  const onKeyDown = event => {
    if (event.keyCode === 27) {
      props.onHide();
    }
  };

  
    const { classes, options, onHide } = props;

    return (
      <Paper>  
      <Grow appear in={true} timeout={300}>
        <div className={classes.main}>
          <SearchIcon className={classes.searchIcon} />
          <TextField
            className={classes.searchText}
            autoFocus={true}
            InputProps={{
              'aria-label': 'Search',
            }}
            onChange={handleTextChange}
            fullWidth={true}
            
          />
          <IconButton className={classes.clearIcon} onClick={onHide}>
            <ClearIcon />
          </IconButton>
        </div>
      </Grow>
      </Paper>
    );
  
}

export default withStyles(defaultSearchStyles)(TableSearch);
