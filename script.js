d3.dsv(":", "enero.csv", d3.autoType).then(data => {

    console.log(data)

    // Categorias por canal
    let plot1 = Plot.plot({
        marks: [
            Plot.barY(data, 
                Plot.groupX(
                    {y: 'count'}, 
                    {x: 'canal', y: 'count', fill: 'canal'}
                ),
            )
        ],

    })

    d3.select('#chart').append(() => plot1)
});