import React from 'react';
import axios from 'axios';

import Page from './Page';
import Error from '../Error/Error';

import './Pages.css';

class Pages extends React.Component {

    constructor(props) {
        super(props);

        this.States = {
            LOADING: 1,
            ERROR: 2,
            LOADED: 3
        };

        this.state = {
            state: this.States.LOADING,
            data: ''
        };

        this._loadPageData(props.match.params.slug);
    }

    componentDidMount() {
        window.$('body').addClass('website');
    }

    componentWillUnmount() {
        window.$('body').removeClass('website');
    }

    _loadPageData(slug) {
        axios.get('/api/pages/' + slug).then((res) => {
            this.setState({
                state: this.States.LOADED,
                data: res.data
            });
        }, () => {
            this.setState({
                state: this.States.ERROR
            });
        });
    }


    render() {
        return (
            <div className="Comp-Pages">
                {this.state.state === this.States.LOADING && <div>Loading...</div>}
                {this.state.state === this.States.LOADED && <Page data={this.state.data}/>}
                {this.state.state === this.States.ERROR && <Error/>}
            </div>
        );
    }
}

export default Pages;