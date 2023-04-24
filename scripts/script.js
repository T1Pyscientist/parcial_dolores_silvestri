d3.dsv(",", "data/denuncias_por_mes.csv", d3.autoType).then(data => {

    // Reportes por canal total
    let plot1 = Plot.plot({
        marks: [
            Plot.barY(data,
                Plot.groupX(
                    { y: 'sum' }, 
                    { 
                        x: 'Canal', 
                        y: 'Valor', 
                        sort: { x: 'y', reverse: true }, 
                        fill: (d) => (d.Canal == "App" ? "#fdd306" : "#cfcfcf") 
                    }
                ),
            ),
        ],
        y: {
            tickFormat: d => d / 1000 + " mil",
            ticks: 10,
            domain: [0, 290000],
            grid: true
        },

        inset: 20,
        marginLeft: 50,
        height: 450,

    })

    d3.select('#chart1').append(() => plot1)
});

d3.dsv(",", "data/denuncias_por_categoria.csv", d3.autoType).then(data => {


    data_proc = [];

    for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 30; j++) {
            data_proc.push({x: i, y: j, Categoria: Math.floor(j/25)});
        }
    }

    data.sort((a, b) => b.Reportes - a.Reportes);

    // data.forEach(d => {
    //     let cat = d.Categoria;
    //     let valor = d.Reportes;
    //     if (valor > 6000) {

    //         for (let i = 0; i < Math.floor(valor/1000); i++) {
    //             data_proc.push({ Categoria: cat });
    //         }
    //     }
    // });

    // Reportes por canal total
    let plot2 = Plot.plot({
        marks: [
            // Plot.cell(
            //     data_proc,
            //     Plot.stackX({
            //       y: (_, i) => i % 12,
            //       fill: d => {
            //         if (d.Categoria == "TRÁNSITO") {
            //             return "Tránsito"
            //         } else if (d.Categoria == "LIMPIEZA Y RECOLECCIÓN") {
            //             return "Limpieza"
            //         } else {
            //             return "Otros"
            //         }
            //       }
            //     })
            // ),
            Plot.dot(data_proc, {
                x: 'x',
                y: 'y',
                fill: d => d.Categoria
            })

        ],
        x: { axis: null },
        y: { axis: null },

        inset: 20,
        width: 450,
        height: 450,
        color: {
            range: ["#8b8589","#fdd306",  "#d0cecf"],
            // scheme: 'pastel1',
            legend: true,
            reverse: true,
        },
    })

    d3.select('#chart2').append(() => plot2)

});

const mapaFetch = d3.json('data/barrios-caba.geojson')
const dataFetch = d3.dsv(',', 'data/denuncias_por_barrio.csv', d3.autoType)

Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {

    let chartMap = Plot.plot({

        projection: {
            type: 'mercator',
            domain: barrios,
        },
        color: {
            type: 'quantize',
            n: 5,
            label: 'Cantidad de denuncias',
            legend: true,
            // scheme: 'redgrey',
            range: ["#f3f2f3", "#d0cecf", "#a29da0", "#8b8589", "#fdd306"],
            interpolate: "hcl"
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