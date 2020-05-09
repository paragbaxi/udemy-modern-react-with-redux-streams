import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends Component {
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    renderInput = ({ input, label, meta }) => {
        // console.log(formProps);
        // console.log(meta);
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                {/* Can't see error message due to autocomplete */}
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>

            // Descriptive example of what JSX ...input is dong
            // <input
            //     onChange={formProps.input.onChange}
            //     value={formProps.input.value}
            // />
        );
    };

    onSubmit = (formValues) => {
        // console.log(formValues);
        // Called by redux-form this.props.handleSubmit() automatically
        // event.preventDefault();
        // validate input from action-creator passed from redux via connect()()
        this.props.onSubmit(formValues);
    };

    render() {
        // console.log(this.props);
        return (
            <form
                onSubmit={this.props.handleSubmit(this.onSubmit)}
                className="ui form error"
            >
                <Field
                    name="title"
                    component={this.renderInput}
                    label="Enter Title"
                />
                <Field
                    name="description"
                    component={this.renderInput}
                    label="Enter Description"
                />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {};
    if (!formValues.title) {
        // only ran if the user did not enter a title
        errors.title = 'You must enter a title';
    }

    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }
    return errors;
};

// export default reduxForm({
//     form: 'streamCreate',
//     validate,
// })(StreamCreate);
export default reduxForm({
    form: 'streamForm',
    validate,
})(StreamForm);
