const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'];

module.exports = {
    getWindDegrees: function (direction) {
        return (directions.indexOf(direction.toUpperCase()) * 22.5) % 360;
    },
    importAll: function (r) {
        var images = {};
        r.keys().forEach(function (item) {
            images[item.replace('./', '').replace(/\.(png|jpe?g|svg)$/, '')] = r(item);
        });
        return images;
    }
};
