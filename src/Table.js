import React, { useMemo } from 'react';
import './App.css';
import { useTable } from 'react-table';
import DATA from './data.json';
import { COLUMNS } from './columns';

export const Table = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, []);

  const tableInstance = useTable({
    columns,
    data,
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <>
      <HomePageHeader />
      <FromTo />

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}> {column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.column.Header === 'Slot' && cell.value === null
                        ? (cell.value = 0)
                        : cell.column.Header === 'City' && cell.value === null
                        ? (cell.value = 'None')
                        : cell.column.Header === 'Velocity' &&
                          cell.value === null
                        ? (cell.value = '0.00')
                        : cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

const HomePageHeader = () => {
  return (
    <header className="header">
      <p>React test demo</p>
    </header>
  );
};

const FromTo = () => {
  return (
    <header className="FromTo">
      <label name="from">From:</label>
      <input id="fromInput" name="from" type="number" min="0"></input>
      <label name="to">To:</label>
      <input id="toInput" name="to" type="number" min="0"></input>
      <button onClick={getInputValue}>Load</button>
    </header>
  );
};

function getInputValue() {
  const fromInput = document.getElementById('fromInput').value;
  const toInput = document.getElementById('toInput').value;

  if (fromInput > toInput) {
    alert('Wrong range was chosen');
  }

  const test = document.getElementsByTagName('tr');

  let arrayToHide = [];
  for (let i = 1; i < test.length; i++) {
    arrayToHide.push(i);
  }

  let arrayToShow = [];
  for (let i = fromInput; i <= toInput; i++) {
    arrayToShow.push(i);
  }

  arrayToHide = arrayToHide.filter((item) => !arrayToShow.includes(item));

  arrayToHide.map((item) => (test[item].style = 'display: none'));
  arrayToShow.map((item) => (test[++item].style = 'display: table-row'));
}
