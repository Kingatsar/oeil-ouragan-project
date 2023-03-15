'use strict';

// connect to raspberry-pi with ssh

const SSH = require('simple-ssh');

function run(sshConfig, script) {
    return new Promise((resolve, reject) => {
        let scriptOutput = '';
        const sshFtw = new SSH(sshConfig);
        sshFtw.exec(script,
            { out: console.log.bind(console) })
            .on('error', (err) => reject(err))
            .on('close', () => resolve(scriptOutput))
            .start();
    });
};


run({
    "host": "piensg028",
    "user": "pi",
    "pass": "pipo"
}, 'tail -f /dev/shm/sensors');