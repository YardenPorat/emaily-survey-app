import React from 'react';

const Footer = () => {
    return (
        <footer className='page-footer indigo' style={{ marginTop: '45px' }}>
            <div className='container '>
                <div className='row '>
                    <div className='col l6 s12'>
                        <h5 className='white-text'>Emaily</h5>
                        <p className='grey-text text-lighten-4'>
                            This site uses payments API with Stripe.com, OAuth
                            2.0 with Google, and email services API with
                            SendGrid.
                        </p>
                    </div>
                    <div className='col l4 offset-l2 s12'>
                        <h5 className='white-text'>Links</h5>
                        <ul>
                            <li>
                                <a
                                    className='grey-text text-lighten-3'
                                    href='https://www.linkedin.com/in/yarden-porat/'
                                >
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <a
                                    className='grey-text text-lighten-3'
                                    href='https://github.com/yardenporat/emailysurveyapp'
                                >
                                    GitHub Repo
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='footer-copyright indigo darken-3'>
                <div className='container '>
                    Yarden Porat
                    <a className='grey-text text-lighten-4 right' href='#!'>
                        {/* //more links */}
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
