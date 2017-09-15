import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const NewsCarouselItem = (props) => {
    return (
        <div className="item">
            <Link to={'/pages/' + props.news.slug}><div className="slider-news-wrap">
                <div className="image"><img src={props.news.image} alt={props.news.title} title={props.news.title} />
                </div>
                <div className="text">
                    <p>{props.news.title}</p>
                </div>
            </div></Link>
        </div>
    );
};


class NewsCarousel extends React.Component {

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

    componentDidMount() {
        window.$('body').addClass('website');
    }

    componentDidUpdate() {
        if(this.state.news.length > 0) {
            setTimeout(() => window.$('#owl-demo').owlCarousel({
                items : 3,
                itemsDesktop : [1199,3],
                itemsDesktopSmall : [979,2],
                itemsTablet: [700,1],
                itemsTabletSmall: false,
                itemsMobile : false
            }), 0);
        }
    }

    _loadNews() {
        (new Promise((resolve) => {
            axios.get('/api/pages/statroute-news').then((res) => {
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
            <div className="Comp-NewsCarousel news_slider">

                <div id="owl-demo">

                    {this.state.news.map((news, index) => {
                        return (
                            <NewsCarouselItem key={index} news={news}/>
                        );
                    })}

                </div>

            </div>
        );
    }
}

export default NewsCarousel;