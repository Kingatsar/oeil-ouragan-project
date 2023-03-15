# Project: "Oeil Ouragan"
 -The goal is to realize the software part of a weather station composed of sensors and a central. Each probe is connected to several sensors that give various information:

    Temperature
    Hygrometry
    Atmospheric pressure
    Rainfall
    Luminosity
    Wind speed and direction
    GPS position and time
    ...

A weather station can be subscribed to several probes and presents the data of these probes.

# URL: piensg028:3000/ 
(works only at our school)
    - go to this url (http://piensg028:3000) to test the app 
# dev documentation

## Front: 

### Installation:
    (there is a readme in the front folder)
    - clone: git clone https://gitlab.com/kingatsa/oeil-ouragan-project.git
    - npm install -g @vue/cli (install vue if not exist)
    - cd ../front-ouragan (go  to this folder in the terminal)
    - npm install (install dependancies)
    - npm run serve (run server)
    - in a browser, open localhost:8080

    // to use the mock server, run the mock server on localhost:3000
    // mock server has been deleted
### Observation: 
   for comparaison bewteen servers api if one of the server api do not work properly, the comparaison won't work.

## SERVER
1- install expresss

2- install no demon 
install nodemon for restarting the node application when file changes i

-   npm install --save-dev nodemon
-   change node to nodemon in package.json

3 install mongo
    Install mongodb  using docker 
    docker run -d --name mongoOuragan -p 27017:27017 mongo

## SytemD
```
[Unit]
Description=weather fake data generator

[Service]
WorkingDirectory=/home/pi/projet/API/oeil-ouragan-project/serverOeilOuragan/expressServerOeilOuragan
#ExecStartPre=/usr/bin/npm install
ExecStart=/usr/bin/npm run dev

[Install]
WantedBy=multi-user.target
```
## usefull link:
### Front
 https://vue-chartjs.org/

 https://vue-chartjs.org/examples/

 https://vuestic.dev/fr/introduction/roadmap


