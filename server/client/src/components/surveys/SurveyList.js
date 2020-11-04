import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

const SurveyList = ({ fetchSurveys, surveys }) => {
    useEffect(() => {
        fetchSurveys();
    }, []);

    const RenderSurveys = () => {
        return surveys.reverse().map(survey => {
            return (
                <div className='card darken-1' key={survey.id}>
                    <div className='card-content'>
                        <span className='card-title'>{survey.title}</span>
                        <p>{survey.body}</p>
                        <p className='right'>
                            Sent On:{' '}
                            {new Date(survey.dateSent).toLocaleDateString(
                                'en-GB'
                            )}
                        </p>
                    </div>
                    <div className='card-action'>
                        <a>Yes: {survey.yes}</a>
                        <a>No: {survey.no}</a>
                    </div>
                </div>
            );
        });
    };

    return <div>{RenderSurveys()}</div>;
};

const mapStateToProps = ({ surveys }) => ({
    surveys,
});

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
