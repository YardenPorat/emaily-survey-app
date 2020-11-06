import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

import Header from './Header';
import Footer from './Footer';
import Landing from './Landing';
import Dashboard from './Dashboard';
import ThankYou from './ThankYou';
import SurveyNew from './surveys/SurveyNew';

const App = ({ fetchUser }) => {
    fetchUser();
    return (
        <div className='indigo lighten-4' style={{ minHeight: '100vh' }}>
            <div className='container '>
                <BrowserRouter>
                    <Header />
                    <Route path='/' exact component={Landing} />
                    <Route path='/surveys' exact component={Dashboard} />
                    <Route path='/surveys/new' exact component={SurveyNew} />
                    <Route path='/thankyou' component={ThankYou} />
                    <Route
                        path='/api/surveys/:surveyId/:choice'
                        component={ThankYou}
                    />
                    <Footer />
                </BrowserRouter>
            </div>
        </div>
    );
};

export default connect(null, { fetchUser })(App);
