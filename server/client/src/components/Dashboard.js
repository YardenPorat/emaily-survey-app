import React from 'react';
import SurveyList from './surveys/SurveyList';
import AddButton from './surveys/AddButton';

const Dashboard = () => {
    return (
        <div>
            <SurveyList />
            <AddButton />
        </div>
    );
};

export default Dashboard;
