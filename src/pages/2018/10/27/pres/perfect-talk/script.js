var chartStyle = {
    title: {
        fontSize: '24px',
    },
    pie: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    column: {
        type: 'column'
    },
    labelStyle: {
        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
        fontSize: '14px',
        fontWeight: '400',
    },
}

var contentTypeChart = Highcharts.chart('vadim-makeev-chart', {
    chart: chartStyle.pie,
    title: null,
    tooltip: {
        pointFormat: '<b>{point.y}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false,
                format: '<b>{point.name}</b> ({point.percentage:.0f}%)',
                style: chartStyle.labelStyle
            }
        }
    },
    series: [{
        colorByPoint: true,
        data: [
            { name: "Подать заявку", y: 33 },
            { name: "Умолять организаторов взять тебя спикером", y: 33 },
            { name: "Получить приглашение от организаторов", y: 33 },
            { name: "Вы организатор", y: 1 },
        ],
    }]
});
