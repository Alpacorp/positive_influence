import React, { useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import PropTypes from "prop-types";
import { PutMention } from "../../Apis/Mentions";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const columns = [
  {
    title: "Id Mención",
    field: "idmention",
    editable: "never",
  },
  {
    title: "Id Usuario",
    field: "iduserment",
    editable: "never",
  },
  {
    title: "Tipo Cuenta Social",
    field: "typeaccment",
  },
  {
    title: "Url Mención",
    field: "urlment",
    render: (rowData) => {
      return (
        <a href={rowData.urlment} target="blank">
          {rowData.urlment}
        </a>
      );
    },
  },
  {
    title: "Campaña o Cliente",
    field: "campain",
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

const MentionsTable = ({ iduser, status, option }) => {
  const [urlUserId, setUrlUserId] = useState(0);
  const [dataTable, setDataTable] = useState([]);
  const urlUserMentions = `https://accounts-social-control.herokuapp.com/mention/${urlUserId}/`;
  const urlLastMentions = `https://accounts-social-control.herokuapp.com/mentions/200/`;

  async function getMentions() {
    if (option === 1) {
      const res = await axios.get(urlUserMentions);
      setDataTable(res.data.message);
    } else {
      const res = await axios.get(urlLastMentions);
      setDataTable(res.data.message);
    }
    const response = await axios.get(urlUserMentions);
    if (iduser === "") {
      setUrlUserId(0);
    } else {
      setUrlUserId(iduser);
      setDataTable(response?.data);
    }
  }

  useEffect(() => {
    getMentions();
    // eslint-disable-next-line
  }, [status, iduser]);

  return (
    <Grid item>
      <MaterialTable
        title={`Menciones del Usuario - (${dataTable?.length || 0})`}
        columns={columns}
        data={dataTable}
        getRowId={(row) => row.iduser}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...dataTable];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                PutMention(newData);
                setDataTable([...dataUpdate]);
                resolve();
              }, 1000);
            }),
        }}
      />
    </Grid>
  );
};

MentionsTable.propTypes = {
  iduser: PropTypes.string,
  status: PropTypes.bool,
  option: PropTypes.number,
};

MentionsTable.defaultProps = {
  iduser: "",
  status: false,
  option: 0,
};

export default MentionsTable;
