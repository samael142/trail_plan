import React from 'react'
import MyComponent from './multiselect';


class TableForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            users: [],
            date: '',
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleUsersChange(event) {
        if (!event.target.selectedOptions) {
            return;
        }

        let users = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            users.push(parseInt(event.target.selectedOptions.item(i).value))
        }

        this.setState({
            users: users
        })
    }

    handleSubmit(event) {
        if ((this.state.name.length === 0) || (this.state.date.length === 0)) {
            return;
        }
        this.props.createTable(this.state.name, this.state.users, this.state.date)
        event.preventDefault()
    }

    render() {
        return (
            <div>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="form-group">
                        <input type="text" className="form-control" name="name" value={this.state.name}
                            onChange={(event) => this.handleChange(event)} />
                    </div>
                    <div className="form-group">
                        <input type="date" className="form-control" name="date" value={this.state.date}
                            onChange={(event) => this.handleChange(event)} />
                    </div>
                    <div className="form-group">
                        <label for="users">user</label>

                        <select name="users" multiple className='form-control'
                            onChange={(event) => this.handleUsersChange(event)}>
                            {this.props.users.map((user) => <option value={user.pk}>{user.first_name} {user.last_name} </option>)}
                        </select>
                    </div>

                    <br />
                    <input type="submit" className="btn btn-primary" value="Save" />
                </form>
                {/* <MyComponent users={this.state.users}/> */}
            </div>
        );
    }
}

export default TableForm
