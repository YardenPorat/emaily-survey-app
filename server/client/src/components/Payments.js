import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { handleToken } from '../actions';

const Payments = ({ handleToken }) => {
    return (
        <StripeCheckout
            amount={500}
            token={token => handleToken(token)} //callback after successful payment
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
            name='Emaily'
            description='5$ for 5 email credit'
        >
            <button className='btn waves-effect waves-light indigo darken-1'>
                Add Credits
            </button>
        </StripeCheckout>
    );
};

export default connect(null, { handleToken })(Payments);
