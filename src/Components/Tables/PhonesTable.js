import React, { useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { PutPhone } from "../../Apis/Phones";

const columns = [
  {
    title: "Id Teléfono",
    field: "idphone",
    editable: "never",
  },
  {
    title: "Teléfono",
    field: "number",
  },
  {
    title: "Operador",
    field: "operator",
  },
  {
    title: "Comentario",
    field: "comment",
  },
  {
    title: "Fecha Creación",
    field: "creation",
    editable: "never",
  },
];

const PhonesTable = () => {
  const [dataTable, setDataTable] = useState([]);
  const urlPhones = `https://accounts-social-control.herokuapp.com/phones/`;

  async function getNumbers() {
    const response = await axios.get(urlPhones);
    setDataTable(response?.data?.message);
  }

  useEffect(() => {
    getNumbers();
    // eslint-disable-next-line
  }, []);

  return (
    <Grid item>
      <MaterialTable
        title="Menciones del Usuario"
        columns={columns}
        data={dataTable}
        getRowId={(row) => row.id}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...dataTable];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                PutPhone(newData);
                setDataTable([...dataUpdate]);
                resolve();
              }, 1000);
            }),
        }}
      />
    </Grid>
  );
};

export default PhonesTable;
