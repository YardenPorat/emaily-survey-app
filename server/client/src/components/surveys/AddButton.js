import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AddButton = () => {
    const [btnPulse, togglePulse] = useState(false);

    return (
        <div
            onMouseEnter={() => togglePulse(!btnPulse)}
            onMouseLeave={() => togglePulse(!btnPulse)}
            className='fixed-action-btn'
        >
            <Link
                to='/surveys/new'
                className={`btn-floating btn-large waves-effect waves-light indigo darken-1 
                ${btnPulse ? 'pulse' : ''}`}
            >
                <i className='material-icons'>add</i>
            </Link>
        </div>
    );
};

export default AddButton;
