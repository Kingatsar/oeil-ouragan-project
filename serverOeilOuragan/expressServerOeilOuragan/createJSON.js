
// missing rain and location

function generateJSON(dataJSON) {
    /* Generates JSON format for live */
    let result;
    result = {
        id: 28,
        name: "Oeil d'Ouragan",
        location: {
            lat: 0,
            long: 0
        },
        time: dataJSON.time,
        status: true,
        measurements: {
            lum: {
                name: "Lum",
                value: dataJSON.lum,
                unit: "Lux",
                desc: "Luminosity"
            },
            hum: {
                name: "Humidity",
                value: dataJSON.hum,
                unit: "%",
                desc: "Humidity"
            },
            temp: {
                name: "Temperature",
                value: dataJSON.temp,
                unit: "C",
                desc: "Temperature"
            },
            pre: {
                name: "Pressure",
                value: dataJSON.pre,
                unit: "hPa",
                desc: "Atm Pressure"
            },
            rain: {
                name: "Rainfall",
                value: 0,
                unit: "mm/m²/h",
                desc: "Rainfall"
            },
            wind_speed: {
                name: "Wind Speed",
                value: dataJSON.wind_speed,
                unit: "Kts",
                desc: "Wind speed in knots"
            },
            wind_dir: {
                name: "Wind Direction",
                value: dataJSON.wind_dir,
                unit: "°",
                desc: "Wind direction in °, as in 360°"
            }
        }
    };

    return result;

}

