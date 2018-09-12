import React from 'react';
import cx from 'classnames';
import orderBy from 'lodash/orderBy';
import { Grid, Table, Icon } from 'semantic-ui-react';
import TableRow from '../Containers/TableRow';

const invertDirection = {
  asc: 'desc',
  desc: 'asc'
};

export default class TableSection extends React.Component {
  state = {
    columnToSort: '',
    sortDirection: 'desc'
  };

  renderUsers() {
    const { users } = this.props;
    let data = users;
    if (this.state.columnToSort.length > 0) {
      data = orderBy(this.props.users, this.state.columnToSort, this.state.sortDirection);
    }
    return data.map(user => <TableRow key={user.id} user={user} />);
  }

  handleSort = columnName => {
    this.setState(
      state => ({
        columnToSort: columnName,
        sortDirection:
          state.columnToSort === columnName ? invertDirection[state.sortDirection] : 'asc'
      }),
      () => {
        //console.log(this.state);
      }
    );
  };

  render() {
    const header = [
      {
        name: 'First name',
        prop: 'firstName'
      },
      {
        name: 'Last name',
        prop: 'lastName'
      },
      {
        name: 'Phone',
        prop: 'phone'
      },
      {
        name: 'Gender',
        prop: 'gender'
      },
      {
        name: 'Age',
        prop: 'age'
      }
    ];

    const tableHeader = (
      <Table.Header>
        <Table.Row>
          {header.map((item, idx) => {
            return (
              <Table.HeaderCell key={`thc-${idx}`} onClick={() => this.handleSort(item.prop)}>
                {item.name}
                {this.state.columnToSort === item.prop ? (
                  this.state.sortDirection === 'asc' ? (
                    <Icon name={'sort up'} color={'teal'} />
                  ) : (
                    <Icon name={'sort down'} color={'teal'} />
                  )
                ) : (
                  <Icon name={'sort'} color={'grey'} />
                )}
              </Table.HeaderCell>
            );
          })}
          {/*for delete btn*/}
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>
    );

    return (
      <Grid textAlign="center" verticalAlign="middle" className="register-form-inner">
        <Grid.Row>
          <Grid.Column>
            <Table striped>
              {tableHeader}
              <Table.Body>{this.renderUsers()}</Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
