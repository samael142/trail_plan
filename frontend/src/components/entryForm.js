import React from 'react'


class EntryForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            good: '',
            user: localStorage.getItem('loginId'),
            table: parseInt(this.props.table),
            'quantity': 0,
            'unit': 'шт',
            'price': 0,
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        event.preventDefault()
        if (this.state.good.length === 0) {
            return;
        }
        this.props.parentCallback(this.state);
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <input type="text" className="form-control" name="good" value={this.state.good}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <br/>
                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }
}

export default EntryForm
