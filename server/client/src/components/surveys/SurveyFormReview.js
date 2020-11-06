import React from 'react';
import { connect } from 'react-redux';
import formFields from './formField';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
    const renderComponent = formFields.map(({ label, name }) => {
        return (
            <div key={name} style={{ margin: '15px', fontSize: '20px' }}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        );
    });

    return (
        <div>
            <h5>Please confirm your entries</h5>
            <div style={{ padding: '10px 0' }}> {renderComponent}</div>
            <button
                className='amber darken-3 white-text  btn-flat'
                onClick={onCancel}
            >
                Go Back
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
