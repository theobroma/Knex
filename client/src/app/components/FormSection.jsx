import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import Validator from 'validatorjs';
import { Grid, Form, Icon, Input, Segment, Header, Message } from 'semantic-ui-react';

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' }
];

class FormSection extends React.Component {
  state = {
    firstName: 'Steve',
    lastName: 'Jobs',
    phone: '555-555-9999',
    gender: 'male',
    age: '56',
    formErrors: {
      firstName: '',
      lastName: '',
      phone: '',
      gender: '',
      age: ''
    },
    isFormValid: true
  };
  // preserve the initial state in a new object
  baseState = this.state;

  clearFormState = {
    firstName: '',
    lastName: '',
    phone: '',
    gender: '',
    age: '',
    formErrors: {
      firstName: '',
      lastName: '',
      phone: '',
      gender: '',
      age: ''
    },
    isFormValid: true
  };

  validate = () => {
    const data = this.state;
    const rules = {
      firstName: 'required|alpha|min:3|max:30',
      lastName: 'required|alpha|min:3|max:30',
      phone: 'required|telephone',
      gender: 'required',
      age: 'between:18,65|numeric'
    };

    const validator = new Validator(data, rules);

    Validator.register(
      'telephone',
      function(value, requirement, attribute) {
        return /^\d{3}-\d{3}-\d{4}$/.test(value);
      },
      'The :attribute phone number is not in the format XXX-XXX-XXXX.'
    );
    //console.log(validator);
    validator.passes(() => {
      // Validation passed
      this.setState({
        formErrors: {
          firstName: '',
          lastName: '',
          phone: '',
          gender: '',
          age: ''
        },
        isFormValid: true
      });
      console.log('val passes');
    });

    validator.fails(() => {
      const error = validator.errors.first('name');
      console.log(validator.errors);
      this.setState({ formErrors: validator.errors.errors, isFormValid: false });
    });
  };

  onChange = (e, data) => {
    const name = e.target.name || data.name;
    const value = e.target.value || data.value;
    this.setState({ [name]: value }, () => {
      this.validate();
      //console.log(this.state);
    });
  };

  clearForm = () => {
    this.setState(this.clearFormState);
  };

  resetForm = () => {
    this.setState(this.baseState);
  };

  submitForm = e => {
    e.preventDefault();
    //this.validate();
    if (this.state.isFormValid) {
      this.props.addUser(this.state);
      this.resetForm();
    }
  };

  render() {
    const { firstName, lastName, phone, gender, age, formErrors } = this.state;
    let formState = {};
    const formHeader = (
      <Header as="h2" color="teal" textAlign="center">
        Add User
        <Header.Subheader>Try to add new user to the table...</Header.Subheader>
      </Header>
    );

    if (this.props.users.pending) {
      formState.loading = true;
    }
    formState.error = true;

    const formContent = (
      <Form {...formState}>
        <Segment stacked raised>
          <Form.Field>
            <Form.Input
              icon="user"
              iconPosition="left"
              type="text"
              label="First Name"
              placeholder="First Name"
              value={firstName}
              name="firstName"
              onChange={this.onChange}
            />
            {formErrors.firstName && <Message error content={formErrors.firstName[0]} />}
          </Form.Field>
          <Form.Field>
            <Form.Input
              icon="user"
              iconPosition="left"
              type="text"
              label="Last Name"
              placeholder="Last Name"
              value={lastName}
              name="lastName"
              onChange={this.onChange}
            />
            {formErrors.lastName && <Message error content={formErrors.lastName[0]} />}
          </Form.Field>
          <Form.Field>
            <Form.Input
              icon="calendar alternate outline"
              iconPosition="left"
              type="number"
              label="Age"
              placeholder="Age"
              value={age}
              name="age"
              onChange={this.onChange}
            />
            {formErrors.age && <Message error content={formErrors.age[0]} />}
          </Form.Field>
          <Form.Field>
            <Form.Select
              fluid
              label="Gender"
              options={options}
              placeholder="Gender"
              value={gender}
              name="gender"
              onChange={this.onChange}
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              icon="phone"
              iconPosition="left"
              label="Phone Number"
              type="tel"
              placeholder="(xxx-xxx-xxxx)"
              size="mini"
              value={phone}
              name="phone"
              onChange={this.onChange}
            />
            {formErrors.phone && <Message error content={formErrors.phone[0]} />}
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Button
              color="yellow"
              fluid
              size="tiny"
              onClick={this.submitForm}
              basic
              disabled={!this.state.isFormValid}
            >
              <Icon name="dot circle outline" /> Submit
            </Form.Button>
            <Form.Button color="yellow" fluid size="tiny" onClick={this.clearForm} basic>
              <Icon name="eraser" />Clear
            </Form.Button>
            <Form.Button color="yellow" fluid size="tiny" onClick={this.resetForm} basic>
              <Icon name="refresh" />Reset
            </Form.Button>
          </Form.Group>
        </Segment>
      </Form>
    );

    return (
      <Grid textAlign="center" verticalAlign="middle" className="register-form-inner">
        <Grid.Row>
          <Grid.Column style={{ maxWidth: 550 }}>
            {formHeader}
            {formContent}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default FormSection;
