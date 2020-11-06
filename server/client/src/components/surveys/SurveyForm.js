//SurveyForm
import _ from 'lodash';
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import formFields from './formField';

export const SurveyForm = ({ handleSubmit, onSurveySubmit }) => {
    const renderField = () => {
        return _.map(formFields, ({ label, name }) => {
            return (
                <Field
                    key={name}
                    label={label}
                    type='text'
                    name={name}
                    component={SurveyField}
                />
            );
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSurveySubmit)}>
                {renderField()}
                <Link to='/surveys' className='red btn-flat white-text'>
                    Cancel
                    <i className='material-icons right'>close</i>
                </Link>
                <button
                    type='submit'
                    className='btn-flat right white-text indigo darken-1'
                >
                    Next
                    <i className='material-icons right'>done</i>
                </button>
                <div></div>
            </form>
        </div>
    );
};

const validate = values => {
    // Validate form inputs
    const errors = {};

    //recipients list validation
    errors.recipients = validateEmails(values.recipients || '');

    _.each(formFields, ({ name }) => {
        if (!values[name]) {
            errors[name] = 'You must provide a value';
        }
    });

    return errors;
};

export default reduxForm({
    form: 'surveyForm',
    validate,
    destroyOnUnmount: false,
})(SurveyForm);
