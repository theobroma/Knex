import { connect } from 'react-redux';
import TableRow from '../components/TableRow';
import { removeUser } from '../actions';

const mapStateToProps = (state, props) => {
  return {};
};

const mapDispatchToProps = dispatch => ({ removeUser: id => dispatch(removeUser(id)) });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableRow);
