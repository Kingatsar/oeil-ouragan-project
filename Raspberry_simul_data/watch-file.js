
// https://kodewithkamran.medium.com/implementing-tail-f-in-node-js-edeb412eb587


const fs = require('fs');
require('log-timestamp');

const mySensors = '/dev/shm/sensors';

watchMyFile(mySensors);


// ---------------------------- Functions ---------------------------- //
function watchMyFile(filePath) {

    /* Watches a given file if it changed or not */

    console.log(`Watching for file changes on ${filePath}`);

    fs.watchFile(filePath, (curr, prev) => {

        if (curr.size.valueOf() === prev.size.valueOf()) {
            return;
        }

        console.log(`${filePath} file Changed`);

        fs.open(filePath, 'r', (err, filedata) => {
            if (err) {
                return console.error(err);
            }
            console.log("Read file");
            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) {
                    return console.error(err);
                }
                console.log(data);
                //close open file
                fs.close(filedata, (err) => {
                    if (err) {
                        return console.error(err);
                    }
                    console.log("File closed successfully");
                })

            })
        })
    });
}