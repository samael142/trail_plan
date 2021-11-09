import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";


class TablesV2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'tables': [],
            'tablesUsers': {}
        }
    }

    componentDidMount() {
        this.fetchData();
    }


    fetchData() {
        const token = localStorage.getItem('token')
        const headers = {'Authorization': 'Token ' + token}
        let users = []
        axios.get('http://127.0.0.1:8000/api/tables', {'headers': headers})
            .then(response => {
                const tables = response.data
                this.setState(
                    {
                        'tables': tables
                    }
                )
                tables.forEach(element => users.push(...element.users))
                this.getUsers([...new Set(users)])
            }).catch(error => console.log(error))
    };


    TableItem = ({table}) => {
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

    render() {
        const items = this.state.tables
        return (
            <table className="table">
                <thead>
                <tr key={'tablesHead'}>
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
                {items.map((table) => <this.TableItem table={table}/>)}
                </tbody>
            </table>
        )
    }
}


export default TablesV2