import React from 'react';
import { useState, useEffect } from 'react';
import MaterialTable from "@material-table/core";
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import data from '../../MockData/MentionsUser.json';

const columns = [
  {
    title: 'Id Mención',
    field: 'idmention',
    editable: 'never',
  },
  {
    title: 'Id Usuario',
    field: 'iduserment',
  },
  {
    title: 'Tipo Cuenta Social',
    field: 'typeaccment',
  },
  {
    title: 'Url Mención',
    field: 'urlment',
    icon: 'favorite_border',
  },
  {
    title: 'Fecha Creación',
    field: 'creation',
  },
];

const MentionsTable = () => {
  const [dataTable, setDataTable] = useState([]);
  const urlUserMentions = 'https://accounts-social-control.herokuapp.com/mention/3934';

  async function getMentions() {
    const response = await axios.get(urlUserMentions);
    setDataTable(response.data);
    console.log("response", response);
    console.log("me cargue de Nuevo API");
  };

  useEffect(() => {
    getMentions();
    console.log("me cargue de Nuevo Mock");
  }, []);
  return (
    <Grid item>
      <MaterialTable
        title="Menciones del Usuario"
        columns={columns}
        // data={dataTable}
        data={data}
        getRowId={(row) => row.iduser}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setDataTable([...dataTable, newData]);
                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...dataTable];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setDataTable([...dataUpdate]);
                resolve();
              }, 1000)
            }),
        }}
      />
    </Grid>
  )
}

export default MentionsTable;