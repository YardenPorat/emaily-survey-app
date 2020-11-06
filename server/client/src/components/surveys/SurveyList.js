import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchSurveys, deleteSurvey } from '../../actions';
import M from 'materialize-css/dist/js/materialize.min.js';
import sortArrayOfObjects from '../../utils/sortArrayOfObjects';

const SurveyList = ({ deleteSurvey, surveys }) => {
    const [sortType, setSortType] = useState('up');

    const dispatch = useDispatch(); //ref to redux dispatch function
    useEffect(() => {
        //dispatch on first load & on update
        dispatch(fetchSurveys());
    }, [dispatch]);

    useEffect(() => {
        // dropdown sort init
        M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), {
            alignment: 'left',
            constrainWidth: false,
            coverTrigger: false,
        });
    }, []);

    const RenderSurveys = () => {
        sortArrayOfObjects(surveys, 'dateSent', sortType);

        return surveys.map(survey => {
            return (
                <div className='card hoverable' key={survey._id}>
                    <div className='card-content'>
                        <span className='card-title'>{survey.title}</span>
                        <p>{survey.body}</p>
                        <p className='right'>
                            Sent On:{' '}
                            {new Date(survey.dateSent).toLocaleDateString(
                                'en-GB'
                            )}
                        </p>
                        {survey.lastResponded && (
                            <p
                                className='right'
                                style={{ marginRight: '15px' }}
                            >
                                Last Response:{' '}
                                {new Date(
                                    survey.lastResponded
                                ).toLocaleDateString('en-GB')}
                            </p>
                        )}
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

    const RenderSortOptions = () => {
        return (
            <div>
                <a
                    className='dropdown-trigger btn waves-effect waves-light indigo darken-1 '
                    href='#!'
                    data-target='dropdown1'
                    style={{ margin: '.5rem 0 0 1rem' }}
                >
                    Sort by
                </a>

                <ul id='dropdown1' className='dropdown-content'>
                    <li
                        onClick={() => {
                            sortArrayOfObjects(surveys, 'dateSent', 'up');
                            setSortType('up');
                        }}
                    >
                        <a href='#!'>Recent first</a>
                    </li>
                    <li className='divider' tabIndex='-1'></li>
                    <li
                        onClick={() => {
                            sortArrayOfObjects(surveys, 'dateSent', 'down');
                            setSortType('down');
                        }}
                    >
                        <a href='#!'>Oldest first</a>
                    </li>
                    <li className='divider' tabIndex='-1'></li>
                </ul>
            </div>
        );
    };

    return (
        <div>
            {RenderSortOptions()}
            {RenderSurveys()}
        </div>
    );
};

const mapStateToProps = ({ surveys }) => ({
    surveys,
});

export default connect(mapStateToProps, { deleteSurvey })(SurveyList);
