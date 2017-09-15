import React from 'react';
import DocumentTitle from 'react-document-title';

import sadComputer from '../../resources/basic/images/sad-computer.gif';

import './Error.css';

const Error = (props) => {
    return (
        <DocumentTitle title="Not found - StatRoute">
            <div className="Comp-Error article">
                <div className="container error-page">
                    <div className="error-page-container">
                        <header className="error-page__header">
                            <img className="error-page__header-image"
                                 src={sadComputer}
                                 alt="Sad computer"/>
                            <h1 className="error-page__title nolinks">Page
                                Not Found</h1>
                        </header>
                        <p className="error-page__message">The page you are looking for could not be found.</p>
                    </div>
                </div>
            </div>
        </DocumentTitle>
    );
};

export default Error;