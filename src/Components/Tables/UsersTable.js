import React, { useState, useEffect } from 'react';
import MaterialTable from "@material-table/core";
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { PutUser } from '../../Apis/Users';

const columns = [
  {
    title: 'id',
    field: 'iduser',
    editable: 'never',
  },
  {
    title: 'Nombres',
    field: 'username',
  },
  {
    title: 'Apellidos',
    field: 'lastname',
  },
  {
    title: 'Género',
    field: 'gender',
  },
  {
    title: 'Perfil',
    field: 'profile',
  },
  {
    title: 'Fecha Nacimiento',
    field: 'birthdate',
  },
  {
    title: 'Ciudad',
    field: 'city',
  },
  {
    title: 'Agente',
    field: 'agent',
    editable: 'never',
  },
  {
    title: 'Fecha Creación',
    field: 'creation',
    editable: 'never'
  },
];

const UsersTable = () => {

  const [dataTable, setDataTable] = useState([]);
  const urlUsers = 'https://accounts-social-control.herokuapp.com/userstable/';

  async function getUsers() {
    const response = await axios.get(urlUsers);
    setDataTable(response.data.message);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Grid item>
      <MaterialTable
        title="Usuarios Creados"
        columns={columns}
        data={dataTable}
        getRowId={(row) => row.iduser}
        editable={{
          // onRowAdd: newData =>
          //   new Promise((resolve, reject) => {
          //     setTimeout(() => {
          //       console.log("newData", newData)
          //       setDataTable([...dataTable, newData]);
          //       resolve();
          //     }, 1000)
          //   }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...dataTable];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                PutUser(newData);
                setDataTable([...dataUpdate]);
                resolve();
              }, 1000)
            }),
        }}
      />
    </Grid>
  );
};

export default UsersTable;