import React from "react";


class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'good': '',
            'quantity': 0,
            'unit': 'шт',
            'price': 0,
            'user': '',
            table: parseInt(this.props.table),
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input className="form-control form-control-sm" type="text"
                        onChange={this.handleChange}
                        value={this.state.good}
                    />
                    <button className="btn btn-success">
                        Добавить
                    </button>
                </form>
            </div>
        );
    }

    handleChange(e) {
        this.setState({'good': e.target.value, 'user': localStorage.getItem('loginId')});
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.good.length === 0) {
            return;
        }
        this.props.parentCallback(this.state);
    }
}

export default TodoApp;