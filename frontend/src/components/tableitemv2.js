import React from "react";
import { withRouter } from "react-router";
import axios from "axios";
import EntryForm from "./entryForm";
import { debounce } from 'lodash';


class TableEntriesV2 extends React.Component {
    constructor(props) {
        super(props)
        const tableID = parseInt(this.props.match.params.id)
        this.state = { 'tableEntries': [], 'tableId': tableID, 'usersForSelect': {}, disabled: {} }
        this.onEntrySubmit = debounce(this.onEntrySubmit, 500)
    }

    componentDidMount() {
        this.getUsers();
        this.fetchData(this.state.tableId);

    }


    getUsers() {
        const headers = this.getHeaders()
        axios.get(`http://127.0.0.1:8000/api/tables/${this.state.tableId}`, { 'headers': headers })
            .then(response => {
                const tableUsers = response.data.users
                let usrArr = {}
                axios.get('http://127.0.0.1:8000/api/users', { 'headers': headers, params: { 'pk': tableUsers.join(',') } })
                    .then(response => {
                        const users = response.data
                        users.forEach(element => usrArr[element.pk] = (element.first_name + ' ' + element.last_name))
                        this.setState(
                            {
                                'usersForSelect': usrArr
                            }
                        )
                    }).catch(error => console.log(error))
            }).catch(error => console.log(error))
    }

    getHeaders() {
        const token = localStorage.getItem('token')
        const headers = { 'Authorization': 'Token ' + token }
        return headers
    }

    fetchData = id => {
        const headers = this.getHeaders()
        let disableStatus = {}
        axios.get('http://127.0.0.1:8000/api/table_entries', { 'headers': headers, params: { 'table': id } })
            .then(response => {
                const tableEntries = response.data
                tableEntries.forEach(element => disableStatus[element.id] = true)
                this.setState(
                    {
                        'tableEntries': tableEntries,
                        disabled: disableStatus
                    }
                )
            }).catch(error => console.log(error))
    };

    handleEntryClick = id => {
        this.setState(previousState => ({
            disabled: {
                ...previousState.disabled,
                [id]: !previousState.disabled[id]
            }
        }));
    };


    TableItem = ({ item }) => {
        return (
            <tr key={item.id}>
                <td>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                            onChange={(id) => this.handleEntryClick(item.id)} />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault" />
                    </div>
                </td>
                <td>
                    <input className="form-control form-control-sm" type="text" value={item.good}
                        readOnly={this.state.disabled[item.id]}
                        onChange={e => this.onEntryChange(e.target.value, item.id, 'good')} />
                </td>
                <td>
                    <input className="form-control form-control-sm" type="number" value={item.quantity}
                        readOnly={this.state.disabled[item.id]}
                        onChange={e => this.onEntryChange(e.target.value, item.id, 'quantity')} />
                </td>
                <td>
                    <input className="form-control form-control-sm" type="text" value={item.unit}
                        readOnly={this.state.disabled[item.id]}
                        onChange={e => this.onEntryChange(e.target.value, item.id, 'unit')} />
                </td>
                <td>
                    <input className="form-control form-control-sm" type="number" value={item.price}
                        readOnly={this.state.disabled[item.id]}
                        onChange={e => this.onEntryChange(e.target.value, item.id, 'price')} />
                </td>
                <td>
                    <select className="form-select form-select-sm"
                        onChange={e => this.onEntryChange(e.target.value, item.id, 'user')}>
                        <option defaultValue={item.user}>{this.state.usersForSelect[item.user]}</option>
                        {Object.keys(this.state.usersForSelect).map(el => <option
                            value={el}>{this.state.usersForSelect[el]}</option>)}
                    </select>
                </td>
            </tr>
        )
    }

    onEntryChange(value, id, field) {
        let newTodoState = [...this.state.tableEntries]
        let editEntry = newTodoState.find(el => el.id === id)
        switch (field) {
            case 'good':
                editEntry.good = value
                break
            case 'quantity':
                editEntry.quantity = value
                break
            case 'unit':
                editEntry.unit = value
                break
            case 'price':
                editEntry.price = value
                break
            case 'user':
                editEntry.user = value
                break
            default:
                return
        }
        this.setState({
            'tableEntries': newTodoState
        })
        this.onEntrySubmit(editEntry)
    }

    onEntrySubmit = (editEntry) => {
        const headers = this.getHeaders()
        axios.put(`http://127.0.0.1:8000/api/table_entries/${editEntry.id}/`, {
            'good': editEntry.good,
            'user': editEntry.user,
            'table': editEntry.table,
            'quantity': editEntry.quantity,
            'unit': editEntry.unit,
            'price': editEntry.price,
        }, { headers })
    }

    addEntry = (childData) => {
        const headers = this.getHeaders()
        axios.post(`http://127.0.0.1:8000/api/table_entries/`, {
            'good': childData.good,
            'user': childData.user,
            'table': childData.table,
            'quantity': childData.quantity,
            'unit': childData.unit,
            'price': childData.price,
        }, { headers })
            .then(response => {
                const modifiedTableEntries = this.state.tableEntries
                const modifiedDisable = this.state.disabled
                modifiedDisable[response.data.id] = true
                modifiedTableEntries.push(response.data)
                this.setState({
                    'tableEntries': modifiedTableEntries,
                    disabled: modifiedDisable
                })
            }).catch(error => console.log(error))
    }

    render() {
        const items = this.state.tableEntries
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr key={'entriesHead'}>
                            <th />
                            <th>Название</th>
                            <th>Количество</th>
                            <th>Единиц</th>
                            <th>Цена</th>
                            <th>Кто</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => <this.TableItem item={item} />)}
                    </tbody>
                </table>
                {!!localStorage.getItem('token') &&
                    <EntryForm table={this.state.tableId} parentCallback={this.addEntry} />
                }
            </div>

        )
    }
}


export default withRouter(TableEntriesV2)
