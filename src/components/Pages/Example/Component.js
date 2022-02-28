import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@mui/material';

export default class Home extends Component{
  render(){
    return(
        <Fragment>
            <Paper>
                sfhasgfgdg
            </Paper>
        </Fragment>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node,
  mediaQuery: PropTypes.bool,
  history:PropTypes.object,
};
  
Home.defaultProps = {
  classes: {},
  children: null,
  history:{}
};