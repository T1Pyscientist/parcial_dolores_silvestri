d3.dsv(",", "data/denuncias_por_mes.csv", d3.autoType).then(data => {

    // Reportes por canal total
    let plot1 = Plot.plot({
        marks: [
            Plot.barY(data,
                Plot.groupX({ y: 'sum' }, { x: 'Canal', y: 'Valor', sort: { x: 'y', reverse: true }, }),
            ),
        ],
        y: {
            tickFormat: d => d / 1000 + " mil",
            domain: [0, 300000],
        },
        inset: 20,
        marginLeft: 50,

    })

    mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
        // Reportes por canal por mes
    let plot2 = Plot.plot({
        marks: [
            Plot.line(
                data, { x: "Mes", y: "Valor", stroke: "Canal", curve: "monotone-x" }
            )
        ],
        color: { legend: true },
        x: {
            label: "Mes",
            tickFormat: d => mes[d - 1],
            ticks: 11
        },
        y: {
            label: "Cantidad de denuncias",
            tickFormat: d => d / 1000 + " mil",
        },


        inset: 20,
        width: 800,
    })

    d3.select('#chart1').append(() => plot1)
    d3.select('#chart2').append(() => plot2)

});


const mapaFetch = d3.json('data/barrios-caba.geojson')
const dataFetch = d3.dsv(',', 'data/denuncias_por_barrio1.csv', d3.autoType)

Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {

    let chartMap = Plot.plot({

        projection: {
            type: 'mercator',
            domain: barrios,
        },
        color: {
            type: 'quantize',
            n: 5,
            scheme: 'ylorbr',
            label: 'Cantidad de denuncias',
            legend: true,
        },
        marks: [
            Plot.geo(barrios, {
                fill: d => {
                    let nombreBarrio = d.properties.BARRIO
                    let denunciasBarrio = data.filter(d => d.Barrio == nombreBarrio)[0]
                    let cantReclamos = denunciasBarrio.Agosto - denunciasBarrio.Julio
                    return cantReclamos
                },
                stroke: '#777777',
            }),
        ],
        width: 350

    })


    /* Agregamos al DOM la visualización chartMap */
    d3.select('#mapa1').append(() => chartMap)

})