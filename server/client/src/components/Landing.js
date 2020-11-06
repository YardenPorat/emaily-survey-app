import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import AddButton from './surveys/AddButton';
const Landing = ({ auth }) => {
    return (
        <Fragment>
            <div className='center ' style={{ paddingBottom: '25px' }}>
                <h1>Emaily!</h1>
                Collect feedback from your users
            </div>
            {auth && <AddButton />}
        </Fragment>
    );
};

const mapStateToProps = ({ auth }) => ({
    auth,
});

export default connect(mapStateToProps)(Landing);
