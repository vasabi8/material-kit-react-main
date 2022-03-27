
import data_fin_date from './date_fin_index_date2.json';

import data_fin_date_p1 from './date_fin_index_p1.json';
import data_fin_date_p2 from './date_fin_index_p2.json';
import data_fin_date_p3 from './date_fin_index_p3.json';
import data_fin_date_p4 from './date_fin_index_p4.json';
import data_fin_date_p5 from './date_fin_index_p5.json';
import data_fin_date_p6 from './date_fin_index_p6.json';

import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import Page from '../components/Page';

import Iconify from '../components/Iconify';

//
import USERLIST from '../_mocks_/user';


import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

import * as AnnotationsModule from 'highcharts/modules/annotations';

if (typeof Highcharts === 'object') {
  AnnotationsModule(Highcharts);
}

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);


  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;





  //
  const sdata = data_fin_date;

  const label_annot1 = [
    {
      point: {
        xAxis: 0,
        yAxis: 0,
        x: 1221782400000,
        y: 0.0199758459818759,
      },
      text: 'Банкрутство Lehman Brothers',
    },
    {
      point: {
        xAxis: 0,
        yAxis: 0,
        x: 1236643200000,
        y: 0.898222944044433,
      },
      text: 'Прийняття антикризових законів за вимогою МВФ',
    },
    {
      point: {
        xAxis: 0,
        yAxis: 0,
        x: 1390176000000,
        y: 0.0159437235753208,
      },
      text: 'Заворушення на Грушевського',
    },
    {
      point: {
        xAxis: 0,
        yAxis: 0,
        x: 1392854400000,
        y: 0.250527144935715,
      },
      x: -10,
      text: '<span style="color:red">Початок тимчасової окупації <br>Криму і Севастополя росією</span>',
    },
    {
      point: {
        xAxis: 0,
        yAxis: 0,
        x: 1395619200000,
        y: 0.451656480610005,
      },
      text: 'Погодження вимог МВФ ',
    },
    {
      point: {
        xAxis: 0,
        yAxis: 0,
        x: 1397433600000,
        y: 0.371653763277575,
      },
      text: '<span style="color:red">Вторгнення росії на сході України</span>',
    },
    {
      point: {
        xAxis: 0,
        yAxis: 0,
        x: 1406764800000,
        y: 0.186752138048395,
      },
      y: -10,
      text: '<span style="color:red">Загострення війни з росією на сході країни</span>',
    },
    {
      point: {
        xAxis: 0,
        yAxis: 0,
        x: 1425254400000,
        y: 0.828007474107233,
      },
      text: 'Віднесення Дельта банку до <br>категорії неплатоспроможних',
    },
    {
      point: {
        xAxis: 0,
        yAxis: 0,
        x: 1426204800000,
        y: 0.785024720201774,
      },
      text: 'Початок переговорів про реструктуризацію<br> зовнішнього боргу',
    },
    {
      point: {
        xAxis: 0,
        yAxis: 0,
        x: 1543190400000,
        y: 0.00526471803399592,
      },
      text: '<span style="color:red">Збройна агресія Росії <br>у Керченській протоці<br>',
    },
    {
      point: {
        xAxis: 0,
        yAxis: 0,
        x: 1584057600000,
        y: 0.0460149651285076,
      },
      text: 'Початок карантину <br>через COVID-19',
    },
    {
      point: {
        xAxis: 0,
        yAxis: 0,
        x: 1645660800000,
        y: 0.106764637984651,
      },
      text: '<span style="color:red">Повномаштабне вторгнення росії<br>',
    },
  ];

  const label_annot2 = [];

//const label_annot2 = []

  const options1 = {
    chart: {
      height: 700,
      type: 'area', //,
      // dateFormat: ('%Y-%m-%d')
    },

    accessibility: {
      description: '.',
      landmarkVerbosity: 'one',
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        day: '%e %b %Y',
      },
      labels: {
        format: '{value:%Y-%m-%d}',
        align: 'centre',
      },
    },

    yAxis: {
      title: {
        text: null,
      },
      labels: {
        align: 'left',
        x: 24,
      },
      steps: 0.2,
    },

    legend: {
      enabled: false,
    },

    series: [
      {
        data: sdata,
        type: 'line',
        color: '#057D46',
        fillOpacity: 0.5,
        name: '',
        marker: {
          enabled: false,
        },
        threshold: null,
      },
    ],

    annotations: [
      {
        draggable: '',
        labels: label_annot1,
      },
      {
        draggable: '',

        labelOptions: {
          shape: 'connector',
          align: 'right',
          justify: false,
          crop: true,
          style: {
            fontSize: '0.8em',
            textOutline: '1px white',
          },
        },

        labels: label_annot2,
      },
    ],
    rangeSelector: {
      inputDateFormat: '%d/%m/%Y',
      inputEditDateFormat: '%d/%m/%Y',
      inputEnabled: false,
      //selected: 1
    },
  };



  const options2 = {
    ignoreHiddenSeries: false,
    chart: {
      height: 700,
      // dateFormat: ('%Y-%m-%d')
    },

    title: {
      text: '',
    },

    accessibility: {
      description: '.',
      landmarkVerbosity: 'one',
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        day: '%e %b %Y',
      },
      labels: {
        format: '{value:%Y-%m-%d}',
        align: 'centre',
      },
    },

    yAxis: {
      title: {
        text: null,
      },
      labels: {
        align: 'left',
        x: 24,
      },
      steps: 0.2,
    },

    legend: {
      // maxWeight: 400,

      width: '90%',
      margin: 250,
      itemStyle: {
        color: '#333333',
        cursor: 'pointer',
        fontSize: '10px',
        fontWeight: 'normal',
      },
      //  itemDistance: 1,
      enabled: true,
      floating: true,
      align: 'left',
      verticalAlign: 'top',
      x: 250,
      y: -37,
    },

    plotOptions: {
      series: {
        showInLegend: true,
      },
      area: {
        stacking: 'normal',
      },
    },

    series: [
      {
        name: 'Субіндекс валютного ринку',
        type: 'area',
        data: data_fin_date_p2,
        color: '#005591',
      },
      {
        name: 'Субіндекс корпоративних цінних паперів',
        type: 'area',
        data: data_fin_date_p3,
        color: '#DC4B64',
      },
      {
        name: 'Субіндекс державних цінних паперів',
        type: 'area',
        data: data_fin_date_p4,
        color: '#7D0532',
      },
      {
        name: 'Субіндекс поведінки домогосподарств',
        type: 'area',
        data: data_fin_date_p5,
        color: '#91C864',
      },
      {
        name: 'Субіндекс банківського сектору ',
        type: 'area',
        data: data_fin_date_p6,
        color: '#057D46',
      },

      {
        name: 'Ефект кореляції*',
        type: 'area',
        data: data_fin_date_p1,
        color: '#46AFE6',
      },
      {
        name: 'Індекс фінансового стресу (ІФС)',
        type: 'line',
        data: data_fin_date,
        color: '#057D46',
      },
    ],

    rangeSelector: {
      // inputDateFormat: '%d/%m/%Y',
      // inputEditDateFormat: '%d/%m/%Y',
      inputEnabled: false,
      buttons: [
        {
          type: 'month',
          count: 1,
          text: '1m',
          events: {
            click: function () {
              alert('Clicked button');
            },
          },
        },
        {
          type: 'month',
          count: 3,
          text: '3m',
        },
        {
          type: 'month',
          count: 6,
          text: '6m',
        },
        {
          type: 'ytd',
          text: 'YTD',
        },
        {
          type: 'year',
          count: 1,
          text: '1y',
        },
        {
          type: 'all',
          text: 'All',
        },
      ],

      //selected: 1
    },
    tooltip: {
      headerFormat: '<table>',

      pointFormat:
          '<tr><td style="color: {series.color}"><b>{series.name}: </b></td>' +
          '<td style="text-align: right"><b>{point.y}</b></td></tr>',

      footerFormat: '</table>',
      split: false,
      shared: true,
      valueDecimals: 2,
      useHTML: true,
    },
  };



  return (
    <Page title="User | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Financial stress index
          </Typography>

        </Stack>

        <Card>


          <HighchartsReact highcharts={Highcharts} constructorType={'stockChart'} options={options1} />

        </Card>

<br/>

        <Card>
          <HighchartsReact highcharts={Highcharts} constructorType={'stockChart'} options={options2} />
        </Card>
      </Container>
    </Page>
  );
}
