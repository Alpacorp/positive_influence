import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import UserForm from '../../Components/Forms/UserForm';
import UsersTable from '../../Components/Tables/UsersTable';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    '& .MuiButton-root': {
      // height: 55,
      backgroundColor: 'skyblue',
    },
  },
}));


const Users = () => {

  const classes = useStyles()


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