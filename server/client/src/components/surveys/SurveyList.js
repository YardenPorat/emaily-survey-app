import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchSurveys, deleteSurvey } from '../../actions';

const SurveyList = ({ deleteSurvey, surveys }) => {
    const dispatch = useDispatch(); //ref to redux dispatch function

    useEffect(() => {
        //dispatch on first load & on update
        dispatch(fetchSurveys());
    }, [dispatch]);

    const RenderSurveys = () => {
        return surveys.reverse().map(survey => {
            return (
                <div className='card' key={survey._id}>
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
                    <div className='card-action' style={{ height: '54px' }}>
                        <span className='badge blue lighten-2 left white-text'>
                            YES: {survey.yes}
                        </span>
                        <span className='badge red lighten-2 left white-text'>
                            NO: {survey.no}
                        </span>
                        <div
                            style={{
                                cursor: 'pointer',
                            }}
                        >
                            <span
                                className='badge grey lighten-4 right'
                                id={survey._id}
                                onClick={e => deleteSurvey(e.target.id)}
                            >
                                Delete Survey
                            </span>
                        </div>
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

export default connect(mapStateToProps, { deleteSurvey })(SurveyList);
// export default connect(mapStateToProps, { fetchSurveys, deleteSurvey })(
//     SurveyList
// );
