import React from "react";
import axios from "axios";
import './App.css';
import LoginForm from "./components/auth";
import TableEntriesV2 from "./components/tableitemv2";
import TablesList from "./components/table";
import HomePage from "./components/home";
import {Route, BrowserRouter, Switch, Redirect, Link} from "react-router-dom";


const NotFound404 = ({location}) => {
    return (
        <div>
            <h5>Page `{location.pathname}` not found</h5>
        </div>
    )
}


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'token': '',
            'errorMessage': '',
            'tables': [],
            'tableEntries': [],
            'users': [],
        }
    }

    createTable(name, users, date) {
        console.log(name, users, date)
    }

    getToken(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
            .then(response => {
                localStorage.setItem('token', response.data.token)
                this.setState({'token': response.data.token, 'errorMessage': ''}, this.getTables)
                this.getLoginId(username)
            })
            .catch(error => {
                this.setState({'errorMessage': 'Неверный логин или пароль'})
            })
    }

    getLoginId = username => {
        const headers = this.getHeaders()
        axios.get('http://127.0.0.1:8000/api/users', {headers: headers, params: {'username': username}})
            .then(response => {
                const loginId = response.data[0].pk
                localStorage.setItem('loginId', loginId)
                localStorage.setItem('loggedUser', (response.data[0].first_name + " " + response.data[0].last_name))
            }).catch(error => console.log(error))
    }


    logout() {
        localStorage.setItem('token', '')
        localStorage.setItem('loginId', '')
        localStorage.setItem('loggedUser', '')
        window.location.reload();
    }

    isAuthenticated() {
        return !!this.state.token
    }

    getHeaders() {
        if (this.isAuthenticated()) {
            return {'Authorization': 'Token ' + this.state.token}
        }
        return {}
    }

    componentDidMount() {
        const token = localStorage.getItem('token')
        this.setState({'token': token}, this.getTables)
    }

    getTables() {
        const headers = this.getHeaders()
        axios.get('http://127.0.0.1:8000/api/tables', {'headers': headers})
            .then(response => {
                const tables = response.data
                this.setState(
                    {
                        'tables': tables
                    }
                )
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/users', {'headers': headers})
            .then(response => {
                const users = response.data
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))
    };


    render() {
        return (
            <div className="container">
                <br/>
                <BrowserRouter>
                    <nav>
                        <div className="btn-group">
                                <Link className="btn btn-primary" to='/'>Home</Link>
                                <Link className="btn btn-primary" to='/tables'>Tables</Link>
                                {this.isAuthenticated() ?
                                    <button className="btn btn-primary"
                                            onClick={() => this.logout()}>{localStorage.getItem('loggedUser')}</button>
                                    :
                                    < Link className="btn btn-primary" to='/login'>Login</Link>
                                }
                        </div>
                    </nav>
                    <Switch>
                        <Route path='/' exact component={HomePage}/>
                        <Route path='/tables' exact component={() =>
                            <TablesList tables={this.state.tables}
                                        users={this.state.users}
                                        createTable={(name, users, date) => this.createTable(name, users, date)}
                                        isAuthenticated={this.isAuthenticated()}/>}/>
                        {this.isAuthenticated() ?
                            <Redirect from='/login' to='/'/>
                            :
                            <Route exact path='/login' component={() => <LoginForm
                                getToken={(username, password) => this.getToken(username, password)}/>}/>
                        }
                        <Route path='/table/:id' component={() => <TableEntriesV2 tables={this.state.tables}/>}/>
                        <Route component={NotFound404}/>
                    </Switch>
                </BrowserRouter>
                {this.state.errorMessage &&
                <h5 className="error"> {this.state.errorMessage} </h5>}
            </div>
        )
    }
}

export default App;
