import React from "react";


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {login: '', password: ''}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
      this.props.getToken(this.state.login, this.state.password)
      event.preventDefault()
    }

    render() {
        return (
            <form className="row g-3" onSubmit={(event) => this.handleSubmit(event)}>
                <div className="col-auto">
                    <br />
                <input className="form-control" type="text" name="login" placeholder="login" value={this.state.login}
                       onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="col-auto">
                    <br />
                <input className="form-control" type="password" name="password" placeholder="password" value={this.state.password}
                       onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="col-auto">
                    <br />
                <input className="btn btn-primary mb-3" type="submit" value="Login"/>
                </div>
            </form>
        );
    }
}

export default LoginForm
