import React, { Fragment } from 'react';
import AddButton from './surveys/AddButton';

const Landing = () => {
    return (
        <Fragment>
            <div style={{ textAlign: 'center' }}>
                <h1>Thank you for your vote</h1>
                <h3> we got it!</h3>
                <h5>Emaily.</h5>
            </div>
            <AddButton />
        </Fragment>
    );
};

export default Landing;
