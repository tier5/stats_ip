import React from 'react';
import Promise from 'promise';
import axios from 'axios';

import PlayerNewsItem from "./PlayerNewsItem";

class PlayerNews extends React.Component {

    constructor() {
        super();

        this.States = {
            LOADING: 0,
            LOADED: 1
        };

        this.state = {
            news: [],
            state: this.States.LOADING
        };

        this._loadNews();
    }

    _loadNews() {
        (new Promise((resolve) => {
            axios.get('/api/pages/player-news').then((res) => {
                resolve(res.data.data);
            }, () => {
                resolve([]);
            });
        })).then((data) => {
            this.setState({
                state: this.States.LOADED,
                news: data
            });
        });
    }

    render() {
        return (
            <div className="Comp-StatRouteNews">
                <div className="news_list">
                    <span className="h3style">TEAM & PLAYER NEWS</span>

                    {this.state.news === this.States.LOADING && <p>Loading...</p>}
                    {this.state.news.map((news, index) => {
                        return (
                            <PlayerNewsItem key={index} news={news}/>
                        );
                    })}

                </div>
            </div>
        );
    }
}

export default PlayerNews;
