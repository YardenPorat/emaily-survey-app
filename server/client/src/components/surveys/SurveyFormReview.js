import React from 'react';
import { connect } from 'react-redux';
import formFields from './formField';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
    const renderComponent = formFields.map(({ label, name }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        );
    });

    return (
        <div>
            <h5>Please confirm your entries</h5>
            <div>{renderComponent}</div>
            <button
                className='yellow white-text darken-3 btn-flat'
                onClick={onCancel}
            >
                Back
            </button>
            <button
                className='green btn-flat white-text right'
                onClick={() => submitSurvey(formValues, history)}
            >
                Send Survey
                <i className='material-icons right'>email</i>
            </button>
        </div>
    );
};

const mapStateToProps = ({ form }) => ({
    formValues: form.surveyForm.values,
});

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
