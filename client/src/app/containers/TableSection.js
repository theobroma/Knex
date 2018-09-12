import { connect } from 'react-redux';
import React from 'react';

import TableSection from '../components/TableSection';
import { getUsers } from '../actions';

const mapStateToProps = state => {
  return {
    users: state.users.data
  };
};

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsers())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableSection);
