export const areaChartConfig: any = {
    series: [{
        data: []
    }],
    chart: {
        id: 'area-datetime',
        type: 'area',
        height: 350,
        zoom: {
            autoScaleYaxis: true
        }
    },
    annotations: {
        yaxis: [],
        xaxis: []
    },
    dataLabels: {
        enabled: false
    },
    markers: {
        size: 0,
        style: 'hollow',
    },
    xaxis: {
        type: 'datetime',
        min: new Date('01 Mar 2012').getTime(),
        tickAmount: 6,
    },
    tooltip: {
        x: {
            format: 'dd MMM yyyy'
        }
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100]
        }
    },
};