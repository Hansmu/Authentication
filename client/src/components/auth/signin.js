import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

class Signin extends Component {
    handleFormSubmit({ email, password }) {
        console.log(email, password);
    }

    render() {
        return(
            <form onSubmit={this.props.handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Email: </label>
                    <Field name="email" component={ (email) =>
                         <input type="text" {...email.input} className="form-control"/>
                    }/>
                    <label>Password: </label>
                    <Field name="password" component={ (password) =>
                        <input type="text" {...password.input} className="form-control"/>
                    }/>
                </fieldset>
                <button action="submit" className="btn btn-primary">Sign In</button>
            </form>
        );
    }
}

export default reduxForm({ form:'signin' })(Signin);