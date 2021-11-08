import React from "react";
import { Link } from "react-router-dom";
import TableForm from "./tableForm";
import Select, { components } from 'react-select'


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

const TablesList = ({ tables, users, createTable }) => {
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
            <TableForm createTable={createTable} users={users} />
            <MyComponent users={getUsersList(users)} />
        </div>
    )
}

const getUsersList = (users) => {
    let endList = []
    users.forEach(user => endList.push({ value: user.pk, label: user.first_name + ' ' + user.last_name }))
    return endList
}

const MultiValueRemove = (props) => {
    if (props.data.isFixed) {
        return null;
    }
    return <components.MultiValueRemove {...props} />;
};

const MyComponent = ({ users }) => (
    <Select isMulti options={users} defaultValue={[users[0]]} isClearable={false}
        components={{ MultiValueRemove }} onChange={(event) => handleChange(event)}/>
)

const handleChange = (event) => {
    console.log(event)
}

export default TablesList
