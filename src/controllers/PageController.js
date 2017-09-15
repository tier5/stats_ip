const fs = require('fs');
const path = require('path');
const moment = require('moment');

const errors = require('../utils/Errors');

const playerNews = [
    {
        slug: 'fantasy-impact-of-jay-ajayi-losing-his-bye-week',
        title: 'Fantasy Impact of Jay Ajayi Losing His Bye Week',
        perex: '',
        image: '/resources/images/pages/jay-ajayi-banner.jpg',
        tags: ['Jay Ajayi'],
        date: moment.unix("1504821600").fromNow()
    },
    {
        slug: 'saints-rbbc',
        title: 'Fantasy Outlook: The New Orleans Saints RBBC',
        perex: '',
        image: '/resources/images/pages/saints-rbbc.jpg',
        tags: ['The New Orleans Saints'],
        date: moment.unix("1504821600").fromNow()
    },
    {
        slug: 'sark',
        title: 'Fantasy Outlook: Atlanta Falcons and New Offensive Coordinator Steve Sarkisian',
        perex: '',
        image: '/resources/images/pages/sark-banner.jpg',
        tags: ['Atlanta Falcons', 'Steve Sarkisian'],
        date: moment.unix("1504821600").fromNow()
    }
];

const statRouteNews = [
    {
        slug: 'titans-defensive-coordinator-dick-lebeau-and-his-zone-blitz',
        title: 'Titans Defensive Coordinator Dick Lebeau and his Zone Blitz',
        perex: '',
        image: '/resources/images/pages/dick-lebeau-banner.jpg',
        tags: ['StatRoute', 'Dick Lebeau'],
        date: moment.unix("1504821600").fromNow()
    },
    {
        slug: 'statRoute-press-release',
        title: 'StatRoute Press Release',
        perex: '',
        image: '/resources/images/pages/statRoute-press-release-banner.png',
        tags: ['StatRoute', ''],
        date: moment.unix("1504821600").fromNow()
    },
    {
        slug: 'nfl-fantasy-football-is-back',
        title: 'NFL Fantasy Football is Back',
        perex: '',
        image: '/resources/images/pages/nfl-fantasy-banner.png',
        tags: ['StatRoute', ''],
        date: moment.unix("1504821600").fromNow()
    }
];

module.exports = {
    getPageBySlug: function (req, res, next) {
        let data = {};
        playerNews.forEach((news) => {
            if (news.slug === req.params.slug) {
                data = news;
            }
        });
        statRouteNews.forEach((news) => {
            if (news.slug === req.params.slug) {
                data = news;
            }
        });

        res.render('pages/' + req.params.slug, data);
    },
    getStatrouteNews: function (req, res, next) {
        res.status(200).json({
            status: 'success',
            data: statRouteNews
        });
    },
    getPlayerNews: function (req, res, next) {
        res.status(200).json({
            status: 'success',
            data: playerNews
        });
    },
};
