
const getPeriod = function (endDate, strPeriod) {

    /* 
        Get the dates for the designated period given
    */

    // Date variables
    let beginDate = new Date(endDate);
    let days;

    // Number of days to remove
    if (strPeriod.includes('day')) {
        days = 1;
    }
    else if (strPeriod.includes('week')) {
        days = 7;
    }
    else if (strPeriod.includes('month')) {
        days = 30;
    }

    beginDate.setDate(beginDate.getDate() - days);
    return beginDate.toISOString();
}

const generateJSONArchive = function (data, feature, period) {

    /* 
        Change Data to JSON format
    */

    // Variables
    let values = [];
    let times = [];
    let dataParse = JSON.parse(data);
    let dataJSON = dataParse[0];
    let dataJSONLoc = dataParse[1];
    let dataJSONRain = dataParse[2];
    let filtered;
    let result = {
        id: 28,
        name: "Oeil d'Ouragan",
        location: {
            lat: dataJSONLoc[0].lat,
            long: dataJSONLoc[0].long
        },
        status: true,
    };

    // Push values for the wanted feature
    dataJSON.forEach(element => {
        if (feature.includes("lum")) {
            values.push(element.lum);
        } else if (feature.includes("temp")) {
            values.push(element.temp);
        } else if (feature.includes("hum")) {
            values.push(element.hum);
        } else if (feature.includes("pre")) {
            values.push(element.pre);
        } else if (feature.includes("rain")) {
            values.push(element.rain);
        } else if (feature.includes("wind_speed")) {
            values.push(element.wind_speed);
        } else if (feature.includes("wind_dir")) {
            values.push(element.wind_dir);
        } else if (feature.includes("gps")) {
            values.push(element.gps);
        }
        times.push(element.time);
    });

    // Filtering the values depending on the period
    filtered = filterValues(values, times, period);
    values = filtered[0];
    times = filtered[1];

    // Rain data generation
    let rainValtime = computeRainArchive(dataJSONRain, period);
    let rainVal = rainValtime[0];
    let rainTime = rainValtime[1];

    // Complete JSON
    if (feature.includes("lum")) {
        result["measurements"] = {
            lum: {
                name: "Lum",
                values: values,
                times: times,
                unit: "Lux",
                desc: "Luminosity"
            }
        }
    } else if (feature.includes("temp")) {
        result["measurements"] = {
            temp: {
                name: "Temperature",
                values: values,
                times: times,
                unit: "C",
                desc: "Temperature"
            }
        }
    } else if (feature.includes("hum")) {
        result["measurements"] = {
            hum: {
                name: "Humidity",
                values: values,
                times: times,
                unit: "%",
                desc: "Humidity"
            }
        }
    } else if (feature.includes("pre")) {
        result["measurements"] = {
            pre: {
                name: "Pressure",
                values: values,
                times: times,
                unit: "hPa",
                desc: "Atm Pressure"
            }
        }
    } else if (feature.includes("rain")) {
        result["measurements"] = {
            rain: {
                name: "Rainfall",
                values: rainVal,
                times: rainTime,
                unit: "mm/m²/h",
                desc: "Rainfall"
            }
        }
    } else if (feature.includes("wind_speed")) {
        result["measurements"] = {
            wind_speed: {
                name: "Wind Speed",
                values: values,
                times: times,
                unit: "Kts",
                desc: "Wind speed in knots"
            }
        }
    } else if (feature.includes("wind_dir")) {
        result["measurements"] = {
            wind_dir: {
                name: "Wind Direction",
                values: values,
                times: times,
                unit: "°",
                desc: "Wind direction in °, as in 360°"
            }
        }
    }

    return result;
}

function computeRainArchive(dataJSONRain, period) {

    /* 
        Compute Rain values
    */

    // Variables
    let myVal = [];
    let resultVal = [];
    let resultTimes = [];
    let myValSliced;
    let idxValInterval;
    let midIdx;

    dataJSONRain.forEach(element => {
        myVal.push(element.time);
    })

    // Get values for every hour
    myValSliced = sliceTime(myVal, 13);
    idxValInterval = getIdxInterval(myValSliced);
    for (let i = 0; i < idxValInterval.length - 1; i++) {
        resultVal.push((idxValInterval[i + 1] - idxValInterval[i]) * 0.3274);
    }

    if (period.includes("day")) {
        idxValInterval.pop();
        idxValInterval.forEach(element => {
            resultTimes.push(myVal[element] + ":00:00.000Z");
        })
    } else if (period.includes("week")) {
        // get values for every half day
        let valueWeek = [];
        let timesWeek = [];
        let sliceWeek = sliceTime(myValSliced, 10);
        let idxIntervalWeek = getIdxInterval(sliceWeek);
        for (let i = 0; i < idxIntervalWeek.length - 1; i++) {
            midIdx = (idxIntervalWeek[i] + idxIntervalWeek[i + 1]) / 2;
            slicedList1 = sliceList(resultVal, idxIntervalWeek[i], midIdx);
            slicedList2 = sliceList(resultVal, midIdx, idxIntervalWeek[i + 1]);

            valueWeek.push(meanArray(slicedList1));
            valueWeek.push(meanArray(slicedList2));
        }
        idxIntervalWeek.pop()
        idxIntervalWeek.forEach(element => {
            timesWeek.push(myVal[element] + "T00:00:00.000Z");
            timesWeek.push(myVal[element] + "T13:00:00.000Z");
        })
        resultTimes = timesWeek;
        resultVal = valueWeek;
    } else if (period.includes("month")) {
        // get value for every day
        let sliceMonth = sliceTime(myValSliced, 10);
        let idxIntervalMonth = getIdxInterval(sliceMonth);
        let slicedList;
        let valueMonth = [];
        let timesMonth = [];
        for (let i = 0; i < (idxIntervalMonth.length - 1); i++) {
            slicedList = sliceList(resultVal, idxIntervalMonth[i], idxIntervalMonth[i + 1]);
            valueMonth.push(meanArray(slicedList));
        }
        idxIntervalMonth.pop()
        idxIntervalMonth.forEach(element => {
            timesMonth.push(myVal[element] + "T00:00:00.000Z");
        })

        resultVal = valueMonth;
        resultTimes = timesMonth;
    }

    return [resultVal, resultTimes];
}

function sliceTime(listTimes, idx) {

    /* 
        Slicing time original format YYYY-MM-DDTHH:MM:SS.SSSZ
            idx = 13 for hours YYYY-MM-DDTHH
            idx = 10 for days YYYY-MM-DD
    */

    listTimes.forEach((element, index) => {
        listTimes[index] = element.slice(0, idx);
    })
    return listTimes;
}

function getIdxInterval(listOfDuplicated) {

    /* 
        Get list of indices of first duplicated value and last index
    */

    let value = listOfDuplicated[0];
    let listIndices = [0];

    for (let i = 1; i < listOfDuplicated.length; i++) {
        if (!listOfDuplicated[i].includes(value)) {
            value = listOfDuplicated[i];
            listIndices.push(i);
        }
    }

    listIndices.push(listOfDuplicated.length - 1);

    return listIndices;
}

function sliceList(myList, startIdx, endIdx) {

    /* 
        Slicing a list
    */

    let listSlice = myList.slice(startIdx, endIdx);

    return listSlice;
}

function meanArray(myList) {

    /* 
        Compute mean of values in array
    */

    let myMean = 0;

    myList.forEach(element => {
        myMean += Number(element);
    });

    return myMean / myList.length;
}



function filterValues(listValues, listTimes, period) {

    /* 
        Filtered values for every period 
            For one day: result for every hour
            For one week: result for every half day
            For one month: result for every day
    */

    let filteredValue = [];
    let filteredTimes = [];
    let slicedList;
    let slicedList1;
    let slicedList2;
    let listIndices;
    let midIdx;

    // Filtered values
    if (period.includes('day')) {
        listIndices = getIdxInterval(sliceTime(listTimes, 13));
    } else if (period.includes('week') || period.includes('month')) {
        listIndices = getIdxInterval(sliceTime(listTimes, 10));
    }

    for (let i = 0; i < (listIndices.length - 1); i++) {
        slicedList = sliceList(listValues, listIndices[i], listIndices[i + 1]);
        if (period.includes('day') || period.includes('month')) {
            filteredValue.push(meanArray(slicedList));
        } else if (period.includes('week')) {
            midIdx = (listIndices[i] + listIndices[i + 1]) / 2;
            slicedList1 = sliceList(slicedList, listIndices[i], midIdx);
            slicedList2 = sliceList(slicedList, midIdx, listIndices[i + 1]);

            filteredValue.push(meanArray(slicedList1));
            filteredValue.push(meanArray(slicedList2));
        }
    }

    // Filtered times
    listIndices.pop();
    listIndices.forEach(element => {
        if (period.includes('day')) {
            filteredTimes.push(listTimes[element] + ":00:00.000Z");
        } else if (period.includes('week')) {
            filteredTimes.push(listTimes[element] + "T00:00:00.000Z");
            filteredTimes.push(listTimes[element] + "T13:00:00.000Z");
        } else if (period.includes('month')) {
            filteredTimes.push(listTimes[element] + "T00:00:00.000Z");
        }
    })


    return [filteredValue, filteredTimes];
}


module.exports = { getPeriod, generateJSONArchive };