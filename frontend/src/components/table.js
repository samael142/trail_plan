import React from "react";
import { Link } from "react-router-dom";
import TableForm from "./tableForm";


const TableItem = ({ table }) => {
    return (
        <tr key={table.id}>
            <td>
                <Link to={`table/${table.id}`}>{table.name}</Link>
            </td>
            <td>
                {table.date}
            </td>
            <td>
                {table.admin.first_name + ' ' + table.admin.last_name}
            </td>
            <td>
                {table.users.map(item => item.first_name + ' ' + item.last_name).join(', ')}
            </td>
        </tr>
    )
}

const TablesList = ({ tables, users, createTable, isAuthenticated }) => {
    return (
        <div>
            <br />
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Название
                        </th>
                        <th>
                            Дата
                        </th>
                        <th>
                            Автор
                        </th>
                        <th>
                            Туристы
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tables.map((table) => <TableItem table={table} />)}
                </tbody>
            </table>
            {isAuthenticated &&
            <TableForm createTable={createTable} users={users}/>
            }
        </div>
    )
}

export default TablesList
