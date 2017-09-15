import WeatherUtils from '../../../utils/WeatherUtils';

const weatherNight = WeatherUtils.importAll(require.context('../../../resources/basic/images/weather/night', false, /\.(png|jpe?g|svg)$/));
const weatherDay = WeatherUtils.importAll(require.context('../../../resources/basic/images/weather/day', false, /\.(png|jpe?g|svg)$/));
const windImages = WeatherUtils.importAll(require.context('../../../resources/basic/images/wind/new', false, /\.(png|jpe?g|svg)$/));

// prepare icons for rendering
const icons_arrows = {};
['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'].forEach((val) => {
    const image = new Image();
    image.src = windImages['wind-' + val];
    icons_arrows[val] = image;
});


const icons_conditions = {'night': [], 'day': []};
Object.keys(weatherNight).forEach((imageSrcKey) => {
    const image = new Image();
    image.src = weatherNight[imageSrcKey];
    icons_conditions['night'][imageSrcKey + '.png'] = image;
});
Object.keys(weatherDay).forEach((imageSrcKey) => {
    const image = new Image();
    image.src = weatherDay[imageSrcKey];
    icons_conditions['day'][imageSrcKey + '.png'] = image;
});

// plugin for column background rendering
// draws a semitransparent rectangle behind every even column
const highlightColumnsPlugin = {
    beforeDatasetsDraw:
        function (chart, options) {
            const area = chart.chartArea;
            const numberOfColumns = chart.data.datasets[0].data.length - 1;
            const step = (area.right - area.left) / numberOfColumns;

            let iterator = 0;
            let currentStep = area.left;
            while (currentStep < area.right) {
                if (iterator % 2 === 0) {
                    chart.ctx.beginPath();
                    chart.ctx.rect(currentStep, area.top, step, (area.bottom - area.top));
                    chart.ctx.fillStyle = 'rgba(0,0,255, 0.05)';
                    chart.ctx.fill();
                }
                currentStep += step;
                iterator++;
            }
        }
};

const tickMaxSize = -8;

/* TEMPERATURE */
const temperatureConfig = (timeLabels, temperatures, nightordays, graphics) => {
    return {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [{
                label: 'Temperature',
                backgroundColor: '#d75257',
                borderColor: '#d75257',
                borderRadius: 5,
                pointRadius: 0,
                data: temperatures,
                fill: false,
            }]
        },
        options: {
            legend: {// do not show individual legend
                display: false
            },
            tooltips: {
                intersect: false,
                callbacks: {//append F after label
                    label: function (tooltipItem, data) {
                        tooltipItem.yLabel = tooltipItem.yLabel + '° F';
                        return data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel;
                    }
                }
            },
            scales: {
                xAxes: [{
                    position: 'top'
                }],
                yAxes: [{
                    ticks: {
                        //append F after label
                        callback: function (value, index, values) {
                            return ('               ' +value + '° F').slice(tickMaxSize - 2);
                        },
                        maxTicksLimit: 6,
                        suggestedMin: Math.max(0, (Math.min.apply(null, temperatures) - 5)),
                        suggestedMax: (Math.max.apply(null, temperatures) + 5),
                        stepSize: 5,
                        padding: 10,
                    },
                    gridLines: {
                        tickMarkLength: 20
                    },
                    offset: false,
                }]
            }
        },
        plugins: [
            highlightColumnsPlugin,
            {
                // show weather icons at top of the columns
                afterDatasetsDraw: function (chart, options) {
                    const iconSize = 25;
                    const axis = chart.scales['x-axis-0'];
                    const area = chart.chartArea;
                    const numberOfColumns = chart.data.datasets[0].data.length - 1;
                    const step = (area.right - area.left) / numberOfColumns;

                    let iterator = 0;
                    let currentStep = area.left;
                    while (currentStep < area.right) {
                        const time = nightordays[iterator];
                        const filename = graphics[iterator];
                        chart.ctx.drawImage(icons_conditions[time][filename], Math.round(currentStep + ((step - iconSize) / 2)), (axis.height - iconSize) / 3, iconSize, iconSize);
                        iterator++;
                        currentStep += step;
                    }
                }
            }
        ]
    };
};


/* CHANCE OF PERCIPITATION */
const chanceofpercipitationConfig = (timeLabels, chanceofpercipitations) => {
    return {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [{
                label: 'Chance of percipitation',
                backgroundColor: '#a3cdf8',
                borderColor: '#8ab4df',
                steppedLine: 'before',
                borderWidth: 1,
                pointRadius: 0,
                data: chanceofpercipitations,
                fill: true,
            }]
        },
        options: {
            legend: {
                // do not show individual legend
                display: false
            },
            tooltips: {
                intersect: false,
                callbacks: {// append % after label
                    label: function (tooltipItem, data) {
                        tooltipItem.yLabel = tooltipItem.yLabel + '%';
                        return data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel;
                    }
                }
            },
            scales: {
                xAxes: [{
                    // do not show time
                    ticks: {
                        fontColor: '#ffffff'
                    },
                    gridLines: {
                        drawTicks: false
                    },
                    // make the bars full width of the column
                    barPercentage: 1.0,
                    categoryPercentage: 1.0
                }],
                yAxes: [{
                    ticks: {
                        // appen % after label
                        callback: function (value, index, values) {
                            return ('               ' +value + '%').slice(tickMaxSize);
                        },
                        min: 0,
                        max: 100,
                        stepSize: 25,
                        padding: 10,
                    },
                    gridLines: {
                        tickMarkLength: 20
                    },
                    offset: false,
                }]
            }
        },
        plugins: [
            highlightColumnsPlugin
        ]
    };
};


/* WIND */
const windConfig = (timeLabels, windspeeds, winddirections) => {
    return {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [{
                label: 'Wind',
                backgroundColor: '#407eb9',
                borderColor: '#407eb9',
                borderWidth: 5,
                pointStyle: winddirections.map(function (value) {
                    return icons_arrows[value];
                }),
                data: windspeeds,
                fill: false,
            }]
        },
        options: {
            legend: {// do not show individual legend
                display: false
            },
            tooltips: {
                intersect: false,
                callbacks: {//append "mph" and direction to wind speed
                    label: function (tooltipItem, data) {
                        tooltipItem.yLabel = tooltipItem.yLabel + ' mph ' + winddirections[tooltipItem.index];
                        return data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel;
                    }
                }
            },
            scales: {
                xAxes: [{
                    // do not show time
                    display: true,
                    ticks: {
                        fontColor: '#ffffff'
                    },
                    gridLines: {
                        drawTicks: false
                    }
                }],
                yAxes: [{
                    ticks: {
                        // append "mph" to wind speed
                        callback: function (value, index, values) {
                            return ('               ' +value + ' mph').slice(tickMaxSize);
                        },
                        maxTicksLimit: 4,
                        suggestedMin: Math.max(0, (Math.min.apply(null, windspeeds) - 5)),
                        suggestedMax: (Math.max.apply(null, windspeeds) + 5),
                        padding: 10,
                    },
                    gridLines: {
                        tickMarkLength: 20
                    },
                    offset: false,
                }]
            }
        },
        plugins: [
            highlightColumnsPlugin
        ]
    };
};


export {
    temperatureConfig,
    chanceofpercipitationConfig,
    windConfig
};