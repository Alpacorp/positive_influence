import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import UserForm from '../../Components/Forms/UserForm';
import UsersTable from '../../Components/Tables/UsersTable';

const Users = () => {

  return (
    <>
      <Grid>
        <UserForm />
        <UsersTable />
      </Grid>
    </>
  )
};

export default Users;