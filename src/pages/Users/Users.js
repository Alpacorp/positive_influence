import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import CreateUserForm from '../../Components/Forms/Users/CreateUserForm';
import UsersTable from '../../Components/Tables/UsersTable';

const Users = () => {

  return (
    <>
      <Grid>
        <CreateUserForm />
        <UsersTable />
      </Grid>
    </>
  )
};

export default Users;