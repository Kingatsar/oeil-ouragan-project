
const generateJSONLive = function (data) {
    /* Generates JSON format for live */
    let result;
    let dataParse = JSON.parse(data);
    let dataJSON = dataParse[0];
    let dataJSONLoc = dataParse[1];
    let dataJSONRain = dataParse[2];
    console.log(' ---------- generateJSONLive ---------- ');
    console.log(dataJSONRain.lentgh);
    result = {
        id: 28,
        name: "Oeil d'Ouragan",
        location: {
            lat: dataJSONLoc[0].lat,
            long: dataJSONLoc[0].long
        },
        time: dataJSON.time,
        status: true,
        measurements: {
            lum: {
                name: "Lum",
                value: dataJSON[0].lum,
                unit: "Lux",
                desc: "Luminosity"
            },
            hum: {
                name: "Humidity",
                value: dataJSON[0].hum,
                unit: "%",
                desc: "Humidity"
            },
            temp: {
                name: "Temperature",
                value: dataJSON[0].temp,
                unit: "C",
                desc: "Temperature"
            },
            pre: {
                name: "Pressure",
                value: dataJSON[0].pre,
                unit: "hPa",
                desc: "Atm Pressure"
            },
            rain: {
                name: "Rainfall",
                value: computeRainFall(dataJSONRain),
                unit: "mm/m²/h",
                desc: "Rainfall"
            },
            wind_speed: {
                name: "Wind Speed",
                value: dataJSON[0].wind_speed,
                unit: "Kts",
                desc: "Wind speed in knots"
            },
            wind_dir: {
                name: "Wind Direction",
                value: dataJSON[0].wind_dir,
                unit: "°",
                desc: "Wind direction in °, as in 360°"
            }
        }
    };

    return result;
};

const generateJSONFeature = function (data, feature) {
    /*  feature String */
    console.log(" ----------- generateJSONFeature ----------- ")
    let result;
    liveJSON = generateJSONLive(data);
    if (feature.includes("lum")) {
        result = {
            id: liveJSON.id,
            name: liveJSON.name,
            location: liveJSON.location,
            time: liveJSON.time,
            status: liveJSON.status,
            measurements: {
                lum: liveJSON.measurements.lum
            }
        }
    } else if (feature.includes("temp")) {
        result = {
            id: liveJSON.id,
            name: liveJSON.name,
            location: liveJSON.location,
            time: liveJSON.time,
            status: liveJSON.status,
            measurements: {
                temp: liveJSON.measurements.temp
            }
        }
    } else if (feature.includes("hum")) {
        result = {
            id: liveJSON.id,
            name: liveJSON.name,
            location: liveJSON.location,
            time: liveJSON.time,
            status: liveJSON.status,
            measurements: {
                hum: liveJSON.measurements.hum
            }
        }
    } else if (feature.includes("pre")) {
        result = {
            id: liveJSON.id,
            name: liveJSON.name,
            location: liveJSON.location,
            time: liveJSON.time,
            status: liveJSON.status,
            measurements: {
                pre: liveJSON.measurements.pre
            }
        }
    } else if (feature.includes("rain")) {
        result = {
            id: liveJSON.id,
            name: liveJSON.name,
            location: liveJSON.location,
            time: liveJSON.time,
            status: liveJSON.status,
            measurements: {
                rain: liveJSON.measurements.rain
            }
        }
    } else if (feature.includes("wind_speed")) {
        result = {
            id: liveJSON.id,
            name: liveJSON.name,
            location: liveJSON.location,
            time: liveJSON.time,
            status: liveJSON.status,
            measurements: {
                wind_speed: liveJSON.measurements.wind_speed
            }
        }
    } else if (feature.includes("wind_dir")) {
        result = {
            id: liveJSON.id,
            name: liveJSON.name,
            location: liveJSON.location,
            time: liveJSON.time,
            status: liveJSON.status,
            measurements: {
                wind_dir: liveJSON.measurements.wind_dir
            }
        }
    } else if (feature.includes("gps")) {
        result = {
            id: liveJSON.id,
            name: liveJSON.name,
            location: liveJSON.location,
            time: liveJSON.time,
            status: liveJSON.status
        }
    }

    return result;

};

function computeRainFall(dataJSONRain) {
    let count = 0;
    dataJSONRain.forEach(element => {
        count++;
    });
    return count * 0.3274;
}

module.exports = { generateJSONLive, generateJSONFeature };