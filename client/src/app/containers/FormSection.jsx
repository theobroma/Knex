import { connect } from 'react-redux';
import FormSection from '../components/FormSection';
import { addUser } from '../actions';
// import { toggleRowEditing, editRow } from '../actions';

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

const mapDispatchToProps = dispatch => ({
  addUser: user => dispatch(addUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormSection);
