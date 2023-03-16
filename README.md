# Oeil Ouragan

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/username/repo.svg)](https://github.com/username/repo/issues)
[![GitHub stars](https://img.shields.io/github/stars/username/repo.svg)](https://github.com/username/repo/stargazers)

 The goal is to realize the software part of a weather station composed of sensors and a central. Each probe is connected to several sensors that give various information:

    Temperature
    Hygrometry
    Atmospheric pressure
    Rainfall
    Luminosity
    Wind speed and direction
    GPS position and time
    ...

A weather station can be subscribed to several probes and presents the data of these probes.

# Table of Contents

- [Project access](#projectaccess)
- [Installation](#installation)
- [SystemD](#systemd)
- [License](#license)
- [Useful links](#usefullinks)

## Project access

### URL: piensg028:3000/ 
(works only at our school)
    - go to this url (http://piensg028:3000) to test the app 

## Installation

### Front: 
    (there is a readme in the front folder)
    - clone: git clone https://gitlab.com/kingatsa/oeil-ouragan-project.git
    - npm install -g @vue/cli (install vue if not exist)
    - cd ../front-ouragan (go  to this folder in the terminal)
    - npm install (install dependancies)
    - npm run serve (run server)
    - in a browser, open localhost:8080

    // to use the mock server, run the mock server on localhost:3000
    // mock server has been deleted
#### Observation: 
   for comparaison bewteen servers api if one of the server api do not work properly, the comparaison won't work.

### SERVER
1- install expresss

2- install no demon 
install nodemon for restarting the node application when file changes i

```cmd
    npm install --save-dev nodemon
```
-   change node to nodemon in package.json

3 install mongo
    Install mongodb  using docker 
    docker run -d --name mongoOuragan -p 27017:27017 mongo

## SytemD

### Back server Daemon
The following command generates a daemon which goal is to run a server for retrieving data

```cmd
cat << 'EOF' | sudo tee /etc/systemd/system/ouragan.service
[Unit]
Description=weather fake data generator

[Service]
WorkingDirectory=/home/pi/projet/API/oeil-ouragan-project/serverOeilOuragan/expressServerOeilOuragan
#ExecStartPre=/usr/bin/npm install
ExecStart=/usr/bin/npm run dev

[Install]
WantedBy=multi-user.target
EOF
```

### Back server Load data
The following command generates a daemon which goal is load data to the database

```cmd
cat << 'EOF' | sudo tee /etc/systemd/system/load.service
[Unit]
Description=weather fake data generator

[Service]
WorkingDirectory=/home/pi/projet/API/oeil-ouragan-project/load
#ExecStartPre=/usr/bin/npm install
ExecStart=/usr/bin/npm run load

[Install]
WantedBy=multi-user.target
EOF
```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## Useful links
### Front
- Vue charts [link](https://vue-chartjs.org/)

- Vue charts examples [link](https://vue-chartjs.org/examples/)

- [link](https://vuestic.dev/fr/introduction/roadmap)

### Back

- How to Insert Data into MongoDB with Node.js and Mongoose [link](https://technoapple.com/blog/post/How-to-Insert-Data-into-MongoDB-with-Node.js-and-Mongoose)

- Getting Started with MongoDB & Mongoose [link](https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/)


