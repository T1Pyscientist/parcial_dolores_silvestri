d3.dsv(",", "data/denuncias_por_mes.csv", d3.autoType).then(data => {

    // Reportes por canal total
    let plot1 = Plot.plot({
        marks: [
            Plot.barY(data, 
                Plot.groupX(
                    {y: 'sum'}, 
                    {x: 'Canal', y: 'Valor', sort: { x: 'y', reverse: true },}
                ),
            ),
        ],
        y: {
            tickFormat: d => d / 1000 + " mil",
            domain: [0, 300000],
        },
        inset: 20,
    })

    mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    // Reportes por canal por mes
    let plot2 = Plot.plot({
        marks: [
            Plot.line(
                data,
                {x: "Mes", y: "Valor", stroke: "Canal", curve: "monotone-x"}
            )
        ],
        color: {legend: true},
        x: {
            label: "Mes", 
            tickFormat: d => mes[d-1],
            ticks: 11
        },
        y: {
            label: "Cantidad de denuncias",
            tickFormat: d => d / 1000 + " mil",
        },


        inset: 20,

    })

    d3.select('#chart2').append(() => plot2)
    d3.select('#chart1').append(() => plot1)
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