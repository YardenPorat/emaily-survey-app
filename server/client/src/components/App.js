import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

const App = ({ fetchUser }) => {
    fetchUser();
    return (
        <div className='container'>
            <BrowserRouter>
                <Header />
                <Route path='/' exact component={Landing} />
                <Route path='/surveys' exact component={Dashboard} />
                <Route path='/surveys/new' component={SurveyNew} />
            </BrowserRouter>
        </div>
    );
};

export default connect(null, { fetchUser })(App);
