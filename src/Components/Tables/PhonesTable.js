import React, { useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import Grid from "@material-ui/core/Grid";
import { format } from "date-fns";
import axios from "axios";
import { PutPhone } from "../../Apis/Phones";
import { es } from "date-fns/locale";

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
    lookup: {
      Claro: "Claro",
      Movistar: "Movistar",
      Tigo: "Tigo",
      Avantel: "Avantel",
      VirginMobile: "Virgin Mobile",
      Woom: "Woom",
    },
  },
  {
    title: "Comentario",
    field: "comment",
  },
  {
    title: "Fecha Creación dd/mm/yyyy",
    field: "creation",
    editable: "never",
    render: (rowData) => {
      return (
        <p>
          {format(new Date(rowData.creation), "dd/MM/yyyy", { locale: es })}
        </p>
      );
    },
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
