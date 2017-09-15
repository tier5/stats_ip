import React from 'react';
import PropTypes from 'prop-types';

const Page = (props) => {
    return (
        <div className="Comp-Page">
            <section className="article">
                <div className="container" dangerouslySetInnerHTML={{__html: props.data}}/>
            </section>
        </div>
    );
};

Page.propTypes ={
    data: PropTypes.string.isRequired
};

export default Page;