d3.dsv(";", "data/enero.csv", d3.autoType).then(data => {

    data = data.filter(d =>  d.categoria !== null);
    data = data.map(d => {
        if (d.canal === "App Denuncia Vial"){
            d.canal = "App BA 147"
        }
        if (d.canal !== "App BA 147" && d.canal !== "GCS Web") {
            d.canal = "Otros"
        } 
        return d;
    })

    // Categorias por canal
    let plot1 = Plot.plot({
        marks: [
            Plot.barY(data, 
                Plot.groupX(
                    {y: 'count'}, 
                    {x: 'canal', y: 'count', fill: 'categoria'}
                ),
            ),
        ],

        y: { domain: [0, 10000] },
        color: { legend: true },

    })

    d3.select('#chart1').append(() => plot1)
});

d3.dsv(";", "data/junio.csv", d3.autoType).then(data => {

    data = data.filter(d =>  d.categoria !== null)

    data = data.filter(d =>  d.categoria !== null);
    data = data.map(d => {
        if (d.canal === "App Denuncia Vial"){
            d.canal = "App BA 147"
        }
        if (d.canal !== "App BA 147" && d.canal !== "GCS Web") {
            d.canal = "Otros"
        } 
        return d;
    })

    // Categorias por canal
    let plot1 = Plot.plot({
        marks: [
            Plot.axisX({label: 'Canales', lineWidth: 10}),
            Plot.barY(data,
                Plot.groupX({ y: 'count' }, { x: 'canal', y: 'count' }),
            ),
        ],
        y: {domain: [0, 10000]}

    })

    d3.select('#chart2').append(() => plot1)
});

d3.dsv(";", "data/agosto.csv", d3.autoType).then(data => {

    data = data.filter(d => d.categoria !== null);
    data = data.map(d => {
        if (d.canal === "App Denuncia Vial"){
            d.canal = "App BA 147"
        }
        if (d.canal !== "App BA 147" && d.canal !== "GCS Web") {
            d.canal = "Otros"
        } 
        return d;
    })

    // Categorias por canal
    let plot1 = Plot.plot({
        marks: [
            Plot.axisX({label: 'Canales', lineWidth: 10}),
            Plot.barY(data,
                Plot.groupX({ y: 'count' }, { x: 'canal', y: 'count' }),
            ),
        ],
        y: {domain: [0, 10000]}

    })

    d3.select('#chart3').append(() => plot1)

});

const mapaFetch = d3.json('data/barrios-caba.geojson')
const dataFetch = d3.dsv(';', 'data/enero.csv', d3.autoType)

Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {
  
    data = data.map(d => {
        if (d.canal === "App Denuncia Vial"){
            d.canal = "App BA 147"
        }
        if (d.canal !== "App BA 147" && d.canal !== "GCS Web") {
            d.canal = "Otros"
        } 
        return d;
    });

    data = data.filter(d =>  d.canal === "App BA 147")

    const reclamosPorBarrio = d3.group(data, d => d.domicilio_barrio) // crea un Map
    console.log(reclamosPorBarrio)

  let chartMap = Plot.plot({
    // https://github.com/observablehq/plot#projection-options
    projection: {
      type: 'mercator',
      domain: barrios, // Objeto GeoJson a encuadrar
    },
    color: {
        // Quantize continuo (cant. denuncias) -> discreto (cant. colores)
        type: 'quantize', 
        n: 10,
        scheme: 'ylorbr',
        label: 'Cantidad de denuncias',
        legend: true,
      },
    marks: [
      Plot.geo(barrios, {
        fill: d => {
            let nombreBarrio = d.properties.BARRIO
            let cantReclamos = reclamosPorBarrio.get(nombreBarrio).length
            return cantReclamos
          },
        stroke: '#777777',
        title: d => `${d.properties.BARRIO}\n${d.properties.DENUNCIAS} denuncias`,
      }),
    ],
    
  })

  /* Agregamos al DOM la visualización chartMap */
  d3.select('#mapa').append(() => chartMap)
})

Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {
  
    data = data.map(d => {
        if (d.canal === "App Denuncia Vial"){
            d.canal = "App BA 147"
        }
        if (d.canal !== "App BA 147" && d.canal !== "GCS Web") {
            d.canal = "Otros"
        } 
        return d;
    });

    data = data.filter(d =>  d.canal === "GCS Web")

    const reclamosPorBarrio = d3.group(data, d => d.domicilio_barrio) // crea un Map
    console.log(reclamosPorBarrio)

  let chartMap = Plot.plot({
    // https://github.com/observablehq/plot#projection-options
    projection: {
      type: 'mercator',
      domain: barrios, // Objeto GeoJson a encuadrar
    },
    color: {
        // Quantize continuo (cant. denuncias) -> discreto (cant. colores)
        type: 'quantize', 
        n: 10,
        scheme: 'ylorbr',
        label: 'Cantidad de denuncias',
        legend: true,
      },
    marks: [
      Plot.geo(barrios, {
        fill: d => {
            let nombreBarrio = d.properties.BARRIO
            let cantReclamos = reclamosPorBarrio.get(nombreBarrio).length
            return cantReclamos
          },
        stroke: '#777777',
        title: d => `${d.properties.BARRIO}\n${d.properties.DENUNCIAS} denuncias`,
      }),
    ],
    
  })

  /* Agregamos al DOM la visualización chartMap */
  d3.select('#mapa').append(() => chartMap)
})


d3.dsv(";", "data/enero.csv", d3.autoType).then(data => {
    
    data = data.filter(d =>  d.categoria !== null);
    data = data.map(d => {
        if (d.canal === "App Denuncia Vial"){
            d.canal = "App BA 147"
        }
        if (d.canal !== "App BA 147" && d.canal !== "GCS Web") {
            d.canal = "Otros"
        } 
        return d;
    })

    // Categorias por canal
    let plot1 = Plot.plot({
        marks: [
            Plot.axisX({label: 'Canales', lineWidth: 10}),
            Plot.barY(data, 
                Plot.groupX(
                    {y: 'count'}, 
                    {x: 'canal', y: 'count', fill: d => d.categoria === "TRÁNSITO" } 
                ),
            ),
        ],

        y: {domain: [0, 10000]},
        color: {legend: true},

    })

    d3.select('#chart1').append(() => plot1)
});