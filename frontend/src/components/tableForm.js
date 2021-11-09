import React from 'react'
import MultiUserSelect from "./multiselect";

class TableForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            users: [parseInt(localStorage.getItem('loginId')),],
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

    setUsersState = (users) => {
        let usersState = []
        if (users) {
            for (let user of users) {
                usersState.push(user.value)
            }
        }
        this.setState({
            users: usersState
        })
    }

    handleSubmit(event) {
        if ((this.state.name.length === 0) || (this.state.date.length === 0)) {
            return;
        }
        this.props.createTable(this.state.name, this.state.users, this.state.date)
        event.preventDefault()
    }

    usersForMultiUserSelectComponent() {
        let endList = []
        this.props.users.forEach(user => endList.push({value: user.pk, label: user.first_name + ' ' + user.last_name}))
        if ((endList.length) && (localStorage.getItem('loginId'))) {
            endList.find(el => el.value === parseInt(localStorage.getItem('loginId'))).isFixed = true
        }
        return endList
    }

    render() {
        return (
            <div>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" name="name" value={this.state.name}
                               onChange={(event) => this.handleChange(event)}/>
                        <input type="date" className="form-control" name="date"
                               value={this.state.date}
                               onChange={(event) => this.handleChange(event)}/>
                    </div>
                    <MultiUserSelect users={this.usersForMultiUserSelectComponent()}
                                     usersState={(usersState) => this.setUsersState(usersState)}/>
                    <br/>
                    <input type="submit" className="btn btn-primary" value="Save"/>
                </form>
            </div>
        );
    }
}

export default TableForm
