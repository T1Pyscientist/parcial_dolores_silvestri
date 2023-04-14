d3.dsv(";", "enero.csv", d3.autoType).then(data => {

    data = data.filter(d => d.categoria !== null)

    // Categorias por canal
    let plot1 = Plot.plot({
        marks: [
            Plot.barY(data,
                Plot.groupX({ y: 'count' }, { x: 'canal', y: 'count', fill: 'categoria' },

                ),
            )
        ],

        y: { domain: [0, 10000] },
        color: { legend: true },

    })

    d3.select('#chart1').append(() => plot1)
});

d3.dsv(";", "junio.csv", d3.autoType).then(data => {

    data = data.filter(d => d.categoria !== null)

    // Categorias por canal
    let plot1 = Plot.plot({
        marks: [
            Plot.barY(data,
                Plot.groupX({ y: 'count' }, { x: 'canal', y: 'count', fill: 'categoria' }),
            )
        ],
        y: { domain: [0, 10000] }

    })

    d3.select('#chart2').append(() => plot1)
});

d3.dsv(";", "agosto.csv", d3.autoType).then(data => {

    data = data.filter(d => d.categoria !== null)

    // Categorias por canal
    let plot1 = Plot.plot({
        marks: [
            Plot.barY(data,
                Plot.groupX({ y: 'count' }, { x: 'canal', y: 'count', fill: 'categoria' }),
            )
        ],
        y: { domain: [0, 10000] }

    })

    d3.select('#chart3').append(() => plot1)

});