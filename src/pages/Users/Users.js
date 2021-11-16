import * as React from 'react';
import { useState, useEffect } from 'react';
import MaterialTable from "@material-table/core";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    '& .MuiButton-root': {
      height: 55,
      backgroundColor: 'skyblue',
    },
  },
}));

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

const data = [
  {
    "id": 3964,
    "username": "Ramiro ",
    "lastname": "Tinjaca",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1992-02-02",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-10-27T18:18:51.000Z"
  },
  {
    "id": 3954,
    "username": "Ramiro ",
    "lastname": "Tinjaca",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1992-02-02",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-10-27T18:18:50.000Z"
  },
  {
    "id": 3944,
    "username": "Jaime ",
    "lastname": "Risalda",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1991-01-01",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-10-27T17:01:01.000Z"
  },
  {
    "id": 3934,
    "username": "Lucia ",
    "lastname": "Buitrago ",
    "gender": "Femenino",
    "profile": "Actor",
    "birthdate": "1992-02-02",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-10-20T15:09:15.000Z"
  },
  {
    "id": 3924,
    "username": "Luis ",
    "lastname": "Venavides",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1991-11-10",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-10-20T14:23:52.000Z"
  },
  {
    "id": 3914,
    "username": "Sara ",
    "lastname": "Carvajal ",
    "gender": "Femenino",
    "profile": "Actriz",
    "birthdate": "1995-05-05",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-10-20T14:00:27.000Z"
  },
  {
    "id": 3904,
    "username": "Sara ",
    "lastname": "Carvajal ",
    "gender": "Femenino",
    "profile": "Actriz",
    "birthdate": "1995-05-05",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-10-20T14:00:26.000Z"
  },
  {
    "id": 3894,
    "username": "Rocio ",
    "lastname": "Ceballo",
    "gender": "Femenino",
    "profile": "Actriz",
    "birthdate": "1994-04-04",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-10-19T18:00:58.000Z"
  },
  {
    "id": 3884,
    "username": "Gerardo ",
    "lastname": "Victoria ",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1993-03-03",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-10-19T17:25:42.000Z"
  },
  {
    "id": 3874,
    "username": "Ana Maria ",
    "lastname": "Castro",
    "gender": "Femenino",
    "profile": "Actriz",
    "birthdate": "1992-02-02",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-10-19T16:56:25.000Z"
  },
  {
    "id": 3864,
    "username": "Robinson",
    "lastname": "Quiintero",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1991-01-01",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-10-19T16:27:33.000Z"
  },
  {
    "id": 3854,
    "username": "Chirley",
    "lastname": "Alegria",
    "gender": "Femenino",
    "profile": "Actriz",
    "birthdate": "1995-05-05",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-10-12T23:45:17.000Z"
  },
  {
    "id": 3844,
    "username": "Chirley",
    "lastname": "Alegria",
    "gender": "Femenino",
    "profile": "Actriz",
    "birthdate": "1995-05-05",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-10-12T23:45:17.000Z"
  },
  {
    "id": 3834,
    "username": "Maritza ",
    "lastname": "Lozano",
    "gender": "Femenino",
    "profile": "Actriz",
    "birthdate": "1994-04-04",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-10-12T22:40:36.000Z"
  },
  {
    "id": 3824,
    "username": "Esteban ",
    "lastname": "Alzate",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1993-03-03",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-10-12T21:08:35.000Z"
  },
  {
    "id": 3814,
    "username": "Esteban ",
    "lastname": "Alzate",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1993-03-03",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-10-12T21:08:35.000Z"
  },
  {
    "id": 3804,
    "username": "Eliza ",
    "lastname": "Marques",
    "gender": "Femenino",
    "profile": "Actriz",
    "birthdate": "1992-02-02",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-10-12T19:41:29.000Z"
  },
  {
    "id": 3794,
    "username": "Eliza ",
    "lastname": "Marques",
    "gender": "Femenino",
    "profile": "Actriz",
    "birthdate": "1992-02-02",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-10-12T19:41:29.000Z"
  },
  {
    "id": 3784,
    "username": "Gilberto ",
    "lastname": "Sandobal",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1991-01-01",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-10-12T18:35:28.000Z"
  },
  {
    "id": 3774,
    "username": "Nicolas ",
    "lastname": "Aponte",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1994-04-04",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-09-07T18:26:39.000Z"
  },
  {
    "id": 3764,
    "username": "Carolina",
    "lastname": "Zapata",
    "gender": "Femenino",
    "profile": "Actriz",
    "birthdate": "1993-03-03",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-09-07T17:34:18.000Z"
  },
  {
    "id": 3754,
    "username": "Carolina",
    "lastname": "Zapata",
    "gender": "Femenino",
    "profile": "Actriz",
    "birthdate": "1993-03-03",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-09-07T17:34:18.000Z"
  },
  {
    "id": 3744,
    "username": "Daniela ",
    "lastname": "Tierraadentro",
    "gender": "Femenino",
    "profile": "Actriz",
    "birthdate": "1992-02-02",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-09-07T16:30:11.000Z"
  },
  {
    "id": 3734,
    "username": "Maribel ",
    "lastname": "Castañeda",
    "gender": "Masculino",
    "profile": "Actriz",
    "birthdate": "1991-01-01",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-09-07T15:46:15.000Z"
  },
  {
    "id": 3724,
    "username": "Maribel ",
    "lastname": "Castañeda",
    "gender": "Masculino",
    "profile": "Actriz",
    "birthdate": "1991-01-01",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-09-07T15:46:07.000Z"
  },
  {
    "id": 3714,
    "username": "Maribel ",
    "lastname": "Castañeda",
    "gender": "Masculino",
    "profile": "Actriz",
    "birthdate": "1991-01-01",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-09-07T15:45:31.000Z"
  },
  {
    "id": 3704,
    "username": "Camila ",
    "lastname": "Alvarez ",
    "gender": "Femenino",
    "profile": "Actriz",
    "birthdate": "1993-03-03",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-09-01T17:11:45.000Z"
  },
  {
    "id": 3694,
    "username": "Sandra ",
    "lastname": "Gusman ",
    "gender": "Femenino",
    "profile": "Actriz",
    "birthdate": "1992-02-02",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-09-01T16:35:23.000Z"
  },
  {
    "id": 3684,
    "username": "Elena ",
    "lastname": "Quiroga",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1991-01-01",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-09-01T16:03:22.000Z"
  },
  {
    "id": 3674,
    "username": "Elena ",
    "lastname": "Quiroga",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1991-01-01",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-09-01T16:03:22.000Z"
  },
  {
    "id": 3664,
    "username": "Gisel",
    "lastname": "Riobueno ",
    "gender": "Femenino",
    "profile": "Actriz",
    "birthdate": "1994-04-04",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-30T18:40:00.000Z"
  },
  {
    "id": 3654,
    "username": "Victor ",
    "lastname": "Alfonzo",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1993-03-03",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-30T17:59:15.000Z"
  },
  {
    "id": 3644,
    "username": "Maicol ",
    "lastname": "Marin",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1992-02-02",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-30T17:20:48.000Z"
  },
  {
    "id": 3634,
    "username": "David",
    "lastname": "Gonzales",
    "gender": "Femenino",
    "profile": "Actor",
    "birthdate": "1991-01-01",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-30T16:44:09.000Z"
  },
  {
    "id": 3624,
    "username": "David",
    "lastname": "Gonzales",
    "gender": "Femenino",
    "profile": "Actor",
    "birthdate": "1991-01-01",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-30T16:44:09.000Z"
  },
  {
    "id": 3614,
    "username": "Ana Maria",
    "lastname": "Navarro",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1995-05-05",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-20T02:35:29.000Z"
  },
  {
    "id": 3604,
    "username": "Sara ",
    "lastname": "Alzada",
    "gender": "Femenino",
    "profile": "Actriz",
    "birthdate": "1994-04-04",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-19T23:31:30.000Z"
  },
  {
    "id": 3594,
    "username": "Sara ",
    "lastname": "Alzada",
    "gender": "Femenino",
    "profile": "Actriz",
    "birthdate": "1994-04-04",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-19T23:31:30.000Z"
  },
  {
    "id": 3584,
    "username": "Pablo",
    "lastname": "Quiroga",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1993-03-03",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-19T21:08:59.000Z"
  },
  {
    "id": 3574,
    "username": "Marcos",
    "lastname": "Riaños",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1992-02-02",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-19T20:33:47.000Z"
  },
  {
    "id": 3564,
    "username": "Yeyo ",
    "lastname": "Sandobal",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1991-01-01",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-19T19:49:42.000Z"
  },
  {
    "id": 3554,
    "username": "Vanessa",
    "lastname": "Lozano",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1993-03-03",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-18T20:47:19.000Z"
  },
  {
    "id": 3544,
    "username": "Patricia",
    "lastname": "Horguela",
    "gender": "Femenino",
    "profile": "Actriz",
    "birthdate": "1992-02-02",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-18T19:36:30.000Z"
  },
  {
    "id": 3534,
    "username": "Angela",
    "lastname": "Pulido",
    "gender": "Femenino",
    "profile": "Actriz",
    "birthdate": "1991-01-01",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-18T18:30:28.000Z"
  },
  {
    "id": 3524,
    "username": "Angela",
    "lastname": "Pulido",
    "gender": "Femenino",
    "profile": "Actriz",
    "birthdate": "1991-01-01",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-18T18:30:28.000Z"
  },
  {
    "id": 3514,
    "username": "Angela",
    "lastname": "Pulido",
    "gender": "Femenino",
    "profile": "Actriz",
    "birthdate": "1991-01-01",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-18T18:30:28.000Z"
  },
  {
    "id": 3504,
    "username": "Marha ",
    "lastname": "Galindo ",
    "gender": "Femenino",
    "profile": "Actriz",
    "birthdate": "1995-05-05",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-17T22:26:22.000Z"
  },
  {
    "id": 3494,
    "username": "Andres ",
    "lastname": "Loaiza",
    "gender": "Masculino",
    "profile": "Cocinero/ra",
    "birthdate": "1994-04-04",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-17T21:54:49.000Z"
  },
  {
    "id": 3484,
    "username": "Julian",
    "lastname": "Casanare",
    "gender": "Masculino",
    "profile": "Abañil",
    "birthdate": "1993-03-03",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-17T19:43:30.000Z"
  },
  {
    "id": 3474,
    "username": "Francisco ",
    "lastname": "Torres",
    "gender": "Masculino",
    "profile": "Abañil",
    "birthdate": "1992-02-02",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-17T19:09:11.000Z"
  },
  {
    "id": 3464,
    "username": "Juan Pablo",
    "lastname": "Garcia",
    "gender": "Masculino",
    "profile": "Abañil",
    "birthdate": "1991-01-01",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-17T18:37:44.000Z"
  },
  {
    "id": 3454,
    "username": "Marcos ",
    "lastname": "Alonzo ",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1992-02-02",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-14T20:09:51.000Z"
  },
  {
    "id": 3444,
    "username": "Joan ",
    "lastname": "Quintero",
    "gender": "Masculino",
    "profile": "01",
    "birthdate": "1991-01-01",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-14T19:26:13.000Z"
  },
  {
    "id": 3434,
    "username": "Yiseth ",
    "lastname": "Caravajal ",
    "gender": "Femenino",
    "profile": "Actriz",
    "birthdate": "1998-08-08",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-13T21:27:41.000Z"
  },
  {
    "id": 3424,
    "username": "Rubiela ",
    "lastname": "Castaño",
    "gender": "Femenino",
    "profile": "Actriz",
    "birthdate": "1997-07-07",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-13T20:40:46.000Z"
  },
  {
    "id": 3414,
    "username": "Rubiela ",
    "lastname": "Castaño",
    "gender": "Femenino",
    "profile": "Actriz",
    "birthdate": "1997-07-07",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-13T20:40:45.000Z"
  },
  {
    "id": 3404,
    "username": "Ximena",
    "lastname": "Arevalo",
    "gender": "Femenino",
    "profile": "Actor",
    "birthdate": "1996-06-06",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-13T19:42:11.000Z"
  },
  {
    "id": 3394,
    "username": "Laura",
    "lastname": "Patiño",
    "gender": "Femenino",
    "profile": "Actriz",
    "birthdate": "1995-05-05",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-13T18:36:51.000Z"
  },
  {
    "id": 3384,
    "username": "Camilo",
    "lastname": "Orosco",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1994-04-04",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-13T18:05:08.000Z"
  },
  {
    "id": 3374,
    "username": "Andres ",
    "lastname": "Giraldo",
    "gender": "Femenino",
    "profile": "Actor",
    "birthdate": "1993-03-03",
    "city": "Atlantico",
    "agent": 1,
    "creation": "2021-08-13T17:39:43.000Z"
  },
  {
    "id": 3364,
    "username": "Andres ",
    "lastname": "Giraldo",
    "gender": "Femenino",
    "profile": "Actor",
    "birthdate": "1993-03-03",
    "city": "Atlantico",
    "agent": 1,
    "creation": "2021-08-13T17:39:40.000Z"
  },
  {
    "id": 3354,
    "username": "Ivan",
    "lastname": "Candela",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1992-02-02",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-13T16:31:01.000Z"
  },
  {
    "id": 3344,
    "username": "Estiven ",
    "lastname": "Beltran ",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1991-01-01",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-13T15:38:59.000Z"
  },
  {
    "id": 3334,
    "username": "Samanta",
    "lastname": "Castro",
    "gender": "Femenino",
    "profile": "Actriz",
    "birthdate": "1997-07-07",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-12T20:57:38.000Z"
  },
  {
    "id": 3324,
    "username": "Cindy",
    "lastname": "Huerta",
    "gender": "Femenino",
    "profile": "Actriz",
    "birthdate": "1996-06-06",
    "city": "Bogotá",
    "agent": 6,
    "creation": "2021-08-12T20:35:20.000Z"
  },
  {
    "id": 3314,
    "username": "Mariana ",
    "lastname": "Clavijo",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1995-05-05",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-12T20:10:56.000Z"
  },
  {
    "id": 3304,
    "username": "David",
    "lastname": "Gusman",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1994-04-04",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-12T19:46:43.000Z"
  },
  {
    "id": 3294,
    "username": "Oscar ",
    "lastname": "Ospina",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1993-03-03",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-12T19:26:20.000Z"
  },
  {
    "id": 3284,
    "username": "Carlos",
    "lastname": "Alvarado",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1992-02-02",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-12T18:45:58.000Z"
  },
  {
    "id": 3274,
    "username": "Hernesto",
    "lastname": "Pinzon",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1991-01-01",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-12T17:39:20.000Z"
  },
  {
    "id": 3264,
    "username": "Juan Manuel",
    "lastname": "Pizarro ",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1998-08-08",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-11T02:54:07.000Z"
  },
  {
    "id": 3254,
    "username": "Maria",
    "lastname": "Medellin",
    "gender": "Femenino",
    "profile": "Administrador de Empresas",
    "birthdate": "1997-07-07",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-11T02:14:18.000Z"
  },
  {
    "id": 3244,
    "username": "Valentina",
    "lastname": "Giraldo ",
    "gender": "Femenino",
    "profile": "Actriz",
    "birthdate": "1996-06-06",
    "city": "Bolivar",
    "agent": 1,
    "creation": "2021-08-11T01:45:53.000Z"
  },
  {
    "id": 3234,
    "username": "Emanuel ",
    "lastname": "Gusman",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1995-05-05",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-11T00:57:32.000Z"
  },
  {
    "id": 3224,
    "username": "Camilo",
    "lastname": "Quintero",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1994-04-04",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-11T00:39:44.000Z"
  },
  {
    "id": 3214,
    "username": "Gina ",
    "lastname": "Uribe",
    "gender": "Femenino",
    "profile": "Actriz",
    "birthdate": "1993-03-03",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-10T22:51:07.000Z"
  },
  {
    "id": 3204,
    "username": "Marina ",
    "lastname": "Cueva",
    "gender": "Masculino",
    "profile": "Actriz",
    "birthdate": "1992-02-02",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-10T21:58:31.000Z"
  },
  {
    "id": 3194,
    "username": "Marina ",
    "lastname": "Cueva",
    "gender": "Masculino",
    "profile": "Actriz",
    "birthdate": "1992-02-02",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-10T21:58:30.000Z"
  },
  {
    "id": 3184,
    "username": "Marina",
    "lastname": "Cuevas",
    "gender": "Masculino",
    "profile": "Actriz",
    "birthdate": "1992-02-02",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-10T20:43:10.000Z"
  },
  {
    "id": 3174,
    "username": "Esteban ",
    "lastname": "Arevalo ",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1991-01-01",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-10T20:22:33.000Z"
  },
  {
    "id": 3164,
    "username": "Elena",
    "lastname": "Riobueno",
    "gender": "Femenino",
    "profile": "Actriz",
    "birthdate": "1995-05-05",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-07T15:55:00.000Z"
  },
  {
    "id": 3154,
    "username": "Maria",
    "lastname": "Alvarado",
    "gender": "Femenino",
    "profile": "Actriz",
    "birthdate": "1994-04-04",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-07T15:14:20.000Z"
  },
  {
    "id": 3144,
    "username": "Hernan",
    "lastname": "Castro",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1993-03-03",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-07T14:57:47.000Z"
  },
  {
    "id": 3134,
    "username": "Rodrigo",
    "lastname": "Ballesteros ",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1992-02-20",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-07T14:28:02.000Z"
  },
  {
    "id": 3124,
    "username": "Alfonzo",
    "lastname": "Suarez",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1991-01-01",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-07T13:59:23.000Z"
  },
  {
    "id": 3114,
    "username": "Alfonzo",
    "lastname": "Suarez",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1991-01-01",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-07T13:59:23.000Z"
  },
  {
    "id": 3104,
    "username": "Andrea",
    "lastname": "Paez",
    "gender": "Femenino",
    "profile": "Ciclista",
    "birthdate": "1995-05-05",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-06T14:01:23.000Z"
  },
  {
    "id": 3094,
    "username": "Andrea",
    "lastname": "Paez",
    "gender": "Femenino",
    "profile": "Ciclista",
    "birthdate": "1995-05-05",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-06T14:01:22.000Z"
  },
  {
    "id": 3084,
    "username": "Laura ",
    "lastname": "Salcedo",
    "gender": "Femenino",
    "profile": "Actriz",
    "birthdate": "1994-04-04",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-06T13:12:42.000Z"
  },
  {
    "id": 3074,
    "username": "Estela",
    "lastname": "Garcia",
    "gender": "Femenino",
    "profile": "Actriz",
    "birthdate": "1993-03-03",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-06T12:49:39.000Z"
  },
  {
    "id": 3064,
    "username": "Carlos",
    "lastname": "Castro",
    "gender": "Masculino",
    "profile": "Mecanico",
    "birthdate": "1992-02-02",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-06T12:24:04.000Z"
  },
  {
    "id": 3054,
    "username": "Andres",
    "lastname": "Buitrago",
    "gender": "Masculino",
    "profile": "Mecanico",
    "birthdate": "1991-01-01",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-06T12:02:20.000Z"
  },
  {
    "id": 3044,
    "username": "Esteban ",
    "lastname": "Garcel",
    "gender": "Masculino",
    "profile": "Mecanico",
    "birthdate": "1991-01-01",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-05T22:27:07.000Z"
  },
  {
    "id": 3034,
    "username": "Mario",
    "lastname": "Sandobal ",
    "gender": "Masculino",
    "profile": "Mecanico",
    "birthdate": "1991-01-01",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-08-05T21:56:54.000Z"
  },
  {
    "id": 3024,
    "username": "Sara",
    "lastname": "Castro",
    "gender": "Femenino",
    "profile": "Actor",
    "birthdate": "1994-04-04",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-07-21T13:03:37.000Z"
  },
  {
    "id": 3014,
    "username": "Victor ",
    "lastname": "Cruz",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1993-03-03",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-07-21T12:49:39.000Z"
  },
  {
    "id": 3004,
    "username": "Victor ",
    "lastname": "Cruz",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1993-03-03",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-07-21T12:49:39.000Z"
  },
  {
    "id": 2994,
    "username": "Cony",
    "lastname": "Luna",
    "gender": "Femenino",
    "profile": "Agronomo",
    "birthdate": "1992-02-02",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-07-21T11:22:58.000Z"
  },
  {
    "id": 2984,
    "username": "Cony",
    "lastname": "Luna",
    "gender": "Femenino",
    "profile": "Agronomo",
    "birthdate": "1992-02-02",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-07-21T11:22:46.000Z"
  },
  {
    "id": 2974,
    "username": "Jose",
    "lastname": "Vasques",
    "gender": "Masculino",
    "profile": "Actor",
    "birthdate": "1991-01-01",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-07-21T10:53:51.000Z"
  },
  {
    "id": 2971,
    "username": "Daniel",
    "lastname": "Buitrago",
    "gender": "Masculino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-10T00:01:03.000Z"
  },
  {
    "id": 2970,
    "username": "Andres",
    "lastname": "Castro",
    "gender": "Masculino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-10T00:01:01.000Z"
  },
  {
    "id": 2969,
    "username": "Carlos",
    "lastname": "Monteria",
    "gender": "Masculino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-10T00:00:59.000Z"
  },
  {
    "id": 2968,
    "username": "Salomon",
    "lastname": "Hurtado",
    "gender": "Masculino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-10T00:00:56.000Z"
  },
  {
    "id": 2967,
    "username": "Ana",
    "lastname": "Giraldo",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-10T00:00:55.000Z"
  },
  {
    "id": 2966,
    "username": "Yomaira",
    "lastname": "Castro",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-10T00:00:52.000Z"
  },
  {
    "id": 2965,
    "username": "Nicol",
    "lastname": "Villa",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-10T00:00:49.000Z"
  },
  {
    "id": 2964,
    "username": "Zaira",
    "lastname": "Duran",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-10T00:00:47.000Z"
  },
  {
    "id": 2963,
    "username": "Daniela",
    "lastname": "Palacios",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-10T00:00:43.000Z"
  },
  {
    "id": 2962,
    "username": "Mafe",
    "lastname": "Rios",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-10T00:00:41.000Z"
  },
  {
    "id": 2961,
    "username": "Lucia",
    "lastname": "Castro",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-10T00:00:38.000Z"
  },
  {
    "id": 2960,
    "username": "Katerine",
    "lastname": "Hortua",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-10T00:00:36.000Z"
  },
  {
    "id": 2959,
    "username": "Carolina",
    "lastname": "Portillo",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-10T00:00:34.000Z"
  },
  {
    "id": 2958,
    "username": "Briyid",
    "lastname": "Salas",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-10T00:00:32.000Z"
  },
  {
    "id": 2957,
    "username": "Maricela",
    "lastname": "Buitre",
    "gender": "Masculino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-10T00:00:28.000Z"
  },
  {
    "id": 2956,
    "username": "Santiago",
    "lastname": "Quiroga",
    "gender": "Masculino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-10T00:00:26.000Z"
  },
  {
    "id": 2955,
    "username": "Robinson",
    "lastname": "Yepes",
    "gender": "Masculino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-10T00:00:23.000Z"
  },
  {
    "id": 2954,
    "username": "Daniel",
    "lastname": "Nuevo",
    "gender": "Masculino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-10T00:00:21.000Z"
  },
  {
    "id": 2953,
    "username": "Carlos",
    "lastname": "Hurtado",
    "gender": "Masculino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-10T00:00:19.000Z"
  },
  {
    "id": 2952,
    "username": "Carlos",
    "lastname": "Hurtado",
    "gender": "Masculino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-10T00:00:17.000Z"
  },
  {
    "id": 2951,
    "username": "Jorge",
    "lastname": "Quiñones",
    "gender": "Masculino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-10T00:00:14.000Z"
  },
  {
    "id": 2950,
    "username": "Nicolas",
    "lastname": "Vergara",
    "gender": "Masculino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-10T00:00:12.000Z"
  },
  {
    "id": 2949,
    "username": "Julian",
    "lastname": "Benabides",
    "gender": "Masculino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-10T00:00:10.000Z"
  },
  {
    "id": 2948,
    "username": "Ivan",
    "lastname": "Castro",
    "gender": "Masculino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-10T00:00:08.000Z"
  },
  {
    "id": 2947,
    "username": "Natali",
    "lastname": "Guevara",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-10T00:00:06.000Z"
  },
  {
    "id": 2946,
    "username": "Carolina",
    "lastname": "Rivera",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-10T00:00:04.000Z"
  },
  {
    "id": 2945,
    "username": "Sofia",
    "lastname": "Girasol",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-10T00:00:03.000Z"
  },
  {
    "id": 2944,
    "username": "Juliana",
    "lastname": "Sevilla",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-10T00:00:00.000Z"
  },
  {
    "id": 2943,
    "username": "Danna",
    "lastname": "Angel",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-09T23:59:58.000Z"
  },
  {
    "id": 2942,
    "username": "Patricia",
    "lastname": "Delgado",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-09T23:59:56.000Z"
  },
  {
    "id": 2941,
    "username": "Gloria",
    "lastname": "Ortiz",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-09T23:59:54.000Z"
  },
  {
    "id": 2940,
    "username": "Vanessa",
    "lastname": "Buitrago",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-09T23:59:51.000Z"
  },
  {
    "id": 2939,
    "username": "Laura",
    "lastname": "Garcia",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-09T23:59:49.000Z"
  },
  {
    "id": 2938,
    "username": "Sara",
    "lastname": "Alvaradez",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-09T23:59:47.000Z"
  },
  {
    "id": 2937,
    "username": "Eduardo",
    "lastname": "Perez",
    "gender": "Masculino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-09T23:59:44.000Z"
  },
  {
    "id": 2936,
    "username": "Oscar",
    "lastname": "Manrique",
    "gender": "Masculino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-09T23:59:40.000Z"
  },
  {
    "id": 2935,
    "username": "Edgar",
    "lastname": "Pinzon",
    "gender": "Masculino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-09T23:59:38.000Z"
  },
  {
    "id": 2934,
    "username": "Maurizio",
    "lastname": "Rivera",
    "gender": "Masculino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-09T23:59:36.000Z"
  },
  {
    "id": 2933,
    "username": "Jerson",
    "lastname": "Riobueno",
    "gender": "Masculino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-09T22:26:38.000Z"
  },
  {
    "id": 2932,
    "username": "Humberto",
    "lastname": "Giraldo",
    "gender": "Masculino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-09T22:26:36.000Z"
  },
  {
    "id": 2931,
    "username": "Ramiro",
    "lastname": "Cuenca",
    "gender": "Masculino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-09T22:26:34.000Z"
  },
  {
    "id": 2930,
    "username": "Adrian",
    "lastname": "Garamillo",
    "gender": "Masculino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-09T22:26:33.000Z"
  },
  {
    "id": 2929,
    "username": "Saul",
    "lastname": "Buitrago",
    "gender": "Masculino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-09T22:26:31.000Z"
  },
  {
    "id": 2928,
    "username": "Carlos",
    "lastname": "Barragan",
    "gender": "Masculino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-09T22:26:30.000Z"
  },
  {
    "id": 2927,
    "username": "Kimberly",
    "lastname": "Hurtado",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-09T22:26:28.000Z"
  },
  {
    "id": 2926,
    "username": "Kimberly",
    "lastname": "Hurtado",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-09T22:26:27.000Z"
  },
  {
    "id": 2925,
    "username": "Gabriela",
    "lastname": "Castillo",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-09T22:26:25.000Z"
  },
  {
    "id": 2924,
    "username": "Cindy",
    "lastname": "Giraldo",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-09T22:26:23.000Z"
  },
  {
    "id": 2923,
    "username": "Lina",
    "lastname": "Palacios",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-09T22:26:22.000Z"
  },
  {
    "id": 2922,
    "username": "Jimena",
    "lastname": "Castro",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-09T22:26:20.000Z"
  },
  {
    "id": 2921,
    "username": "Juliana",
    "lastname": "Portillo",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-09T22:26:19.000Z"
  },
  {
    "id": 2920,
    "username": "Laura",
    "lastname": "Garcia",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-09T22:26:17.000Z"
  },
  {
    "id": 2919,
    "username": "Vanessa",
    "lastname": "Buitrago",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-09T22:26:15.000Z"
  },
  {
    "id": 2918,
    "username": "Ana",
    "lastname": "Maria",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-09T22:26:14.000Z"
  },
  {
    "id": 2917,
    "username": "Zuly",
    "lastname": "Villanueva",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-09T22:26:12.000Z"
  },
  {
    "id": 2916,
    "username": "Daniela",
    "lastname": "Restrepo",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 1,
    "creation": "2021-06-09T22:26:11.000Z"
  },
  {
    "id": 2915,
    "username": "Luis",
    "lastname": "Javier",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 2,
    "creation": "2021-06-09T22:26:09.000Z"
  },
  {
    "id": 2914,
    "username": "Vicente",
    "lastname": "Jose",
    "gender": "Masculino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 2,
    "creation": "2021-06-09T22:26:07.000Z"
  },
  {
    "id": 2913,
    "username": "Luis",
    "lastname": "Carlos",
    "gender": "Masculino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 2,
    "creation": "2021-06-09T22:26:05.000Z"
  },
  {
    "id": 2912,
    "username": "Martin",
    "lastname": "Duarte",
    "gender": "Masculino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 2,
    "creation": "2021-06-09T22:26:04.000Z"
  },
  {
    "id": 2911,
    "username": "Luis",
    "lastname": "Angel",
    "gender": "Masculino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 2,
    "creation": "2021-06-09T22:26:02.000Z"
  },
  {
    "id": 2910,
    "username": "Justa",
    "lastname": "Rojas",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 2,
    "creation": "2021-06-09T22:26:00.000Z"
  },
  {
    "id": 2909,
    "username": "Lina",
    "lastname": "Carranza",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 2,
    "creation": "2021-06-09T22:25:59.000Z"
  },
  {
    "id": 2908,
    "username": "Juliana",
    "lastname": "Toledano",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 2,
    "creation": "2021-06-09T22:25:57.000Z"
  },
  {
    "id": 2907,
    "username": "Balbina",
    "lastname": "Torregrosa",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 2,
    "creation": "2021-06-09T22:25:56.000Z"
  },
  {
    "id": 2906,
    "username": "Concepcion",
    "lastname": "Manso",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 2,
    "creation": "2021-06-09T22:25:54.000Z"
  },
  {
    "id": 2905,
    "username": "Josefa",
    "lastname": "Maria",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 2,
    "creation": "2021-06-09T22:25:52.000Z"
  },
  {
    "id": 2904,
    "username": "Flor",
    "lastname": "Mir",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 2,
    "creation": "2021-06-09T22:25:51.000Z"
  },
  {
    "id": 2903,
    "username": "Socorro",
    "lastname": "Sebastian",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 2,
    "creation": "2021-06-09T22:25:49.000Z"
  },
  {
    "id": 2902,
    "username": "Virginia",
    "lastname": "Mora",
    "gender": "Femenino",
    "profile": "Emprendedor/ra",
    "birthdate": "21/06/88",
    "city": "Bogotá",
    "agent": 2,
    "creation": "2021-06-09T22:25:48.000Z"
  },
];

const genders = [
  {
    value: "Masculino",
    label: "Masculino",
  },
  {
    value: "Femenino",
    label: "Femenino",
  }
];

const cities = [
  {
    idcity: 29,
    city: "Amazonas",
  },
  {
    idcity: 1,
    city: "Antioquia",
  },
  {
    idcity: 25,
    city: "Arauca",
  },
  {
    idcity: 2,
    city: "Atlantico",
  },
  {
    idcity: 3,
    city: "Bogotá",
  },
  {
    idcity: 4,
    city: "Bolivar",
  },
  {
    idcity: 5,
    city: "Boyaca",
  },
  {
    idcity: 6,
    city: "Caldas",
  },
  {
    idcity: 7,
    city: "Caqueta",
  },
  {
    idcity: 26,
    city: "Casanare",
  },
  {
    idcity: 8,
    city: "Cauca",
  },
  {
    idcity: 9,
    city: "Cesar",
  },
  {
    idcity: 12,
    city: "Choco",
  },
  {
    idcity: 10,
    city: "Cordova",
  },
  {
    idcity: 11,
    city: "Cundinamarca",
  },
  {
    idcity: 30,
    city: "Guainia",
  },
  {
    idcity: 31,
    city: "Guaviare",
  },
  {
    idcity: 13,
    city: "Huila",
  },
  {
    idcity: 14,
    city: "La Guajira",
  },
  {
    idcity: 15,
    city: "Magdalena",
  },
  {
    idcity: 16,
    city: "Meta",
  },
  {
    idcity: 17,
    city: "Nariño",
  },
  {
    idcity: 18,
    city: "Norte de Santander",
  },
  {
    idcity: 27,
    city: "Putumayo",
  },
  {
    idcity: 19,
    city: "Quindio",
  },
  {
    idcity: 20,
    city: "Risaralda",
  },
  {
    idcity: 28,
    city: "San Andres",
  },
  {
    idcity: 21,
    city: "Santander",
  },
  {
    idcity: 22,
    city: "Sucre",
  },
  {
    idcity: 23,
    city: "Tolima",
  },
  {
    idcity: 24,
    city: "Valle",
  },
  {
    idcity: 32,
    city: "Vaupes",
  },
  {
    idcity: 33,
    city: "Vichada",
  },
];

function Users() {

  const classes = useStyles()

  const [dataTable, setDataTable] = useState([]);
  const [genderData, setGenderData] = useState();
  const [citiesData, setCitiesData] = useState();

  const handleGender = (event) => {
    setGenderData(event.target.value);
  };

  const handleCity = (event) => {
    setCitiesData(event.target.value);
  }

  const urlUsers = 'https://accounts-social-control.herokuapp.com/userstable/';

  async function getUsers() {
    const response = await axios.get(urlUsers);
    setDataTable(response.data.message);
    console.log("me cargue de Nuevo");
  };

  useEffect(() => {
    // getUsers();
    console.log("me cargue de Nuevo");
  }, []);

  return (
    <>
      <form autoComplete="off" className={classes.root}>
        <TextField id="username" label="Nombres" variant="outlined" error={false} required />
        <TextField id="lastname" label="Apellidos" variant="outlined" required />
        <TextField
          id="gender"
          label="Género"
          variant="outlined"
          select
          defaultValue=""
          value={genderData ? genderData : ""}
          onChange={handleGender}
          helperText="Selecciona el género"
          required
        >
          {
            genders.map((item) => (
              <MenuItem key={item.value} value={item.label} >
                {item.label}
              </MenuItem>
            ))
          }
        </TextField>
        <TextField id="profile-sele" label="Perfil" variant="outlined" helperText="Digita el perfil del usuario" required />
        <TextField id="birthdate" variant="outlined" type="date" helperText="Fecha de Nacimiento" required />
        <TextField
          id="citySele"
          label="Selecciona Ciudad"
          variant="outlined"
          select
          defaultValue=""
          value={citiesData ? citiesData : ""}
          onChange={handleCity}
          helperText="Selecciona la Ciudad"
          required
        >
          {
            cities.map((citie) => (
              <MenuItem key={citie.idcity} value={citie.city}>
                {citie.city}
              </MenuItem>
            ))
          }
        </TextField>
        <TextField id="agent" label="Agente" variant="outlined" type="number" required />
        <Button
          variant="contained"
          color="default"
          className={classes.root}
          endIcon={<Icon>send</Icon>}
          type="submit"
        >
          Enviar Registro
        </Button>
      </form>
      <MaterialTable
        title="Usuarios Creados"
        columns={columns}
        // data={dataTable}
        data={data}
        getRowId={(row) => row.id}
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
    </>
  )
};

export default Users;