var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:feature?', function (req, res, next) {
    console.log("dqfqfsqfdsqfffffffffffffffff")
    console.log(req.params)
    if (req.params.feature == undefined) {
        let json = {
            "id": 1,
            "name": "best group ever",
            "location": {
                "lat": 0,
                "long": 0
            },
            "time": "2023-02-08T15:41:04.626Z",
            "status": true,
            "measurements": {
                "lum": {
                    "name": "Lum",
                    "value": 2,
                    "unit": "Lux",
                    "desc": "Luminosity"
                },
                "hum": {
                    "name": "Humidity",
                    "value": 45,
                    "unit": "%",
                    "desc": "Humidity"
                },
                "temp": {
                    "name": "Temperature",
                    "value": 25,
                    "unit": "C",
                    "desc": "Temperature"
                },
                "pre": {
                    "name": "Pressure",
                    "value": 0.5,
                    "unit": "hPa",
                    "desc": "Atm Pressure"
                },
                "rain": {
                    "name": "Rainfall",
                    "value": 20,
                    "unit": "mm/m²/h",
                    "desc": "Rainfall"
                },
                "wind_speed": {
                    "name": "Wind Speed",
                    "value": 20,
                    "unit": "Kts",
                    "desc": "Wind speed in knots"
                },
                "wind_dir": {
                    "name": "Wind Direction",
                    "value": 120,
                    "unit": "°",
                    "desc": "Wind direction in °, as in 360°"
                }
            }
        };
        res.json(json);
    }

    else if (req.params.feature == "temp") {
        let json = {
            "id": 1,
            "name": "best group ever",
            "location": {
                "lat": 0,
                "long": 0
            },
            "time": "2023-02-08T15:41:04.626Z",
            "status": true,
            "measurements": {
                "temp": {
                    "name": "Temperature",
                    "value": Math.floor(Math.random() * 20),
                    "unit": "C",
                    "desc": "Temperature"
                }
            }
        }

        res.json(json);
    }

    else if (req.params.feature == "lum") {
        let json = {
            "id": 1,
            "name": "best group ever",
            "location": {
                "lat": 0,
                "long": 0
            },
            "time": "2023-02-08T15:41:04.626Z",
            "status": true,
            "measurements": {
                "temp": {
                    "name": "Temperature",
                    "value": Math.floor(Math.random() * 20),
                    "unit": "C",
                    "desc": "Temperature"
                }
            }
        }

        res.json(json);
    }

    else if (req.params.feature == "hum") {
        let json = {
            "id": 1,
            "name": "best group ever",
            "location": {
                "lat": 0,
                "long": 0
            },
            "time": "2023-02-08T15:41:04.626Z",
            "status": true,
            "measurements": {
                "temp": {
                    "name": "Temperature",
                    "value": Math.floor(Math.random() * 20),
                    "unit": "C",
                    "desc": "Temperature"
                }
            }
        }

        res.json(json);
    }

    else if (req.params.feature == "hum") {
        let json = {
            "id": 1,
            "name": "best group ever",
            "location": {
                "lat": 0,
                "long": 0
            },
            "time": "2023-02-08T15:41:04.626Z",
            "status": true,
            "measurements": {
                "temp": {
                    "name": "Temperature",
                    "value": Math.floor(Math.random() * 20),
                    "unit": "C",
                    "desc": "Temperature"
                }
            }
        }

        res.json(json);
    }

    else if (req.params.feature == "pre") {
        let json = {
            "id": 1,
            "name": "best group ever",
            "location": {
                "lat": 0,
                "long": 0
            },
            "time": "2023-02-08T15:41:04.626Z",
            "status": true,
            "measurements": {
                "temp": {
                    "name": "Temperature",
                    "value": Math.floor(Math.random() * 20),
                    "unit": "C",
                    "desc": "Temperature"
                }
            }
        }

        res.json(json);
    }

    else if (req.params.feature == "rain") {
        let json = {
            "id": 1,
            "name": "best group ever",
            "location": {
                "lat": 0,
                "long": 0
            },
            "time": "2023-02-08T15:41:04.626Z",
            "status": true,
            "measurements": {
                "temp": {
                    "name": "Temperature",
                    "value": Math.floor(Math.random() * 20),
                    "unit": "C",
                    "desc": "Temperature"
                }
            }
        }

        res.json(json);
    }

    else if (req.params.feature == "wind_speed") {
        let json = {
            "id": 1,
            "name": "best group ever",
            "location": {
                "lat": 0,
                "long": 0
            },
            "time": "2023-02-08T15:41:04.626Z",
            "status": true,
            "measurements": {
                "temp": {
                    "name": "Temperature",
                    "value": Math.floor(Math.random() * 20),
                    "unit": "C",
                    "desc": "Temperature"
                }
            }
        }

        res.json(json);
    }


    else if (req.params.feature == "wind_dir") {
        let json = {
            "id": 1,
            "name": "best group ever",
            "location": {
                "lat": 0,
                "long": 0
            },
            "time": "2023-02-08T15:41:04.626Z",
            "status": true,
            "measurements": {
                "temp": {
                    "name": "Temperature",
                    "value": Math.floor(Math.random() * 20),
                    "unit": "C",
                    "desc": "Temperature"
                }
            }
        }

        res.json(json);
    }


});

module.exports = router;
