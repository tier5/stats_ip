import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const PlayerNewsItem = (props) => {
    return (
        <div className="Comp-StatRouteNewsItem item">
            <div className="imgwrap">
                <Link to={'/pages/' + props.news.slug}><img src={props.news.image} alt={props.news.title} title={props.news.title}/></Link>
            </div>
            <div className="textwrap">
                <h3><Link to={'/pages/' + props.news.slug}>{props.news.title}</Link></h3>
                <p>{props.news.perex}</p>
                <div className="news_infopruh">
                    {props.news.tags.map((tag, index) => {
                        return (
                            <span key={index}>{tag}</span>
                        );
                    })}
                    <span>{props.news.date}</span>
                </div>
            </div>
        </div>
    );
};

PlayerNewsItem.propTypes = {
    news: PropTypes.object.isRequired
};

export default PlayerNewsItem;
