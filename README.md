# Project Overview

TravelBizz is an app for creating trips. Users can select a start and end point on the map, while seeing their points of interest in between the route through well updated maps and can add the journey in a wishlist while analyzing realtime weather analysis and prediction of weather for desired locations upto 5 days.Our goal is to help a person manage his journeys and list them according to his deadlines and make a wishlist of probable journeys by analyzing realtime weather of the destinations their routes involved, through updated and defined maps. Further for the safety of driver inside the vehicle we propose a hardware tool which through a  trained ML model analyzes the facial patterns of person driving for drowsiness detection and alerts with a beep so that driver is cautioned leading to prevention of accident. Also, we think that for future perspective the hardware can also slow down the vehicle and if needed can shut it down for the safety of the driver.

---

## Visualize Navigation Proccess

<div align="center">
    <img width=80% src="https://media.giphy.com/media/JSXscMwmXXbuBrpdeK/giphy.gif">
</div>

<br>

---

## Features

- User authentication (signup, login, logout)
- Create, update and delete trip plan.
- Display points of interest within a start and end point, filtered by category.

---

## Languages/tech

- Database: MongoDB
- Web framework: Express
- Front-end framework: React
- Server: Node.js
- Language: HTML, CSS, JavaScript
- State management: Redux
- APIs: [MapQuest](https://developer.mapquest.com/)

---

## Creating the Trips Backend Routes with Express and Mongoose

<div align="center">
    <img width=80% src="https://media.giphy.com/media/gLF1aPzcNJ2tzx92IH/giphy.gif">
</div>

<br>

```javascript
const express = require("express");
const router = express.Router();
const passport = require("passport");
const tripsController = require("../../controllers/trips_controller");

router.get("/", tripsController.getAllTrips);
router.get("/:userId/:tripId", tripsController.getUserTrips);
router.get("/:tripId", tripsController.getTrip);
router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  tripsController.createTrip
);
router.patch("/:tripId", tripsController.updateTrip);
router.delete("/:tripId", tripsController.deleteTrip);
```


---

## Drawing the Map

```javascript
fetchMapData(boundingBoxParam) {
    // fetch POI
    const proxy_url = "https://cors-anywhere.herokuapp.com/";

    axios
      .get(`${proxy_url}https://www.mapquestapi.com/search/v2/rectangle`, {
        params: {
          key: this.props.apiKey,
          boundingBox: boundingBoxParam,
          maxMatches: 500
        },
        paramsSerializer: params => {
          return qs.stringify(params);
        }
      })
      .then(result => {
        this.pointsOfInterest = result.data.searchResults;
      })
      .catch(error => {
        this.setState({
          error
        });
      });
    }

    drawRoute(routeProps) {
        let directions = window.L.mapquest.directions();

        directions.setLayerOptions({
          startMarker: {
            draggable: false
                },
          endMarker: {
            draggable: false
                },
          routeRibbon: {
            draggable: false
                }
    });

    directions.route({
      start: routeProps.routeStart,
      end: routeProps.routeEnd,
      options: {
        routeType: "pedestrian"
      }
    });
}
```

---

##

| File                                                                                          | Description                                                                                                                                                                                          |
| --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [components](https://github.com/alfredosumosav/routeplan/tree/master/frontend/src/components) | Container and presentational components                                                                                                                                                              |
| [actions](https://github.com/alfredosumosav/routeplan/tree/master/frontend/src/actions)       | These actions can be dispatched to trigger a Redux state change. They return POJOs that tell the reducer what the state should look like. The state is a collection of data used throughout the app. |
| [reducers](https://github.com/alfredosumosav/routeplan/tree/master/frontend/src/reducers)     | Reducers specify how the state changes in response to dispatched actions.                                                                                                                            |
| [util](https://github.com/alfredosumosav/routeplan/tree/master/frontend/src/util)             | Defines functions that make API calls to the backend - login, logout, signup, CRUD actions for trips.                                                                                                |
| [controllers](https://github.com/alfredosumosav/routeplan/tree/master/controllers)            | The API controllers define what happens given a requested route.                                                                                                                                     |
| [models](https://github.com/alfredosumosav/routeplan/tree/master/models)                      | Defines the schema for users, trips, and points of interest                                                                                                                                          |
| [routes](https://github.com/alfredosumosav/routeplan/tree/master/routes/api)                  | Declares URIs for the backend. These are the endpoints hit by the util functions.                                                                                                                    |

<<<<<<< HEAD

### How to build/run the code

1. Fork and clone the repository.
2. Install all dependencies by running `npm install` from root directory and frontend folder in the terminal.
3. Update the MapBox API key by create config/keys_dev.js and write this code:

```
module.exports = {
  MAP_KEY: <YOUR_MAPBOX_API_KEY_HERE>
};
```

4. Run the node.js server and front end by running `npm run dev` in terminal

### Architecture

The architecture of this application is based on a typical 3-tier MVC model.

<div align="center">
    <img width=80% src="https://2.bp.blogspot.com/-cJrZfbVrH-0/WtT7O9CyTEI/AAAAAAAAGZw/znD9Yxlf5VYjRAGvoQjRizN_EXsMREKeQCLcBGAs/s640/mern%2Bstack%2Bdevelopment.png">
</div>

<br>

<div align="center"><em>(image source: Top Zenith)</em></div>

##### View

The Client tier (View) is written in JavaScript, HTML and CSS using ReactJS as the framework. This level of the architecture is what the user will interact with to access the features of the application. This application using Redux for state management.

##### Controller

The Business Logic Tier (Controller) will be written using NodeJS and ExpressJS, and this tier represents the Application Server that will act as a bridge of communication for the Client Tier and Database Tier. This tier will serve HTML pages to the user’s device and accept HTTP requests from the user and follow with the appropriate response. NodeJS

##### Model

The Database Tier (Model) is hosted using MongoDB. This is where all of the crucial data of the application are stored.

### Challenge

1.  **Draw Map and Trip Route**<br>
    The main challenge for this project is try to understand how to build map using MapBox, draw route based on start and end point of user input and collect the POIs along and near the route.

        Draw Map

```javascript
initializeMap() {
    window.L.mapquest.key = this.props.apiKey;

    this.map = window.L.mapquest.map("map", {
        center: this.props.center,
        layers: window.L.mapquest.tileLayer(this.props.baseLayer),
        zoom: this.props.zoom
    });
}
```

    Draw Route

```javascript
drawRoute(routeProps) {
    let directions = window.L.mapquest.directions();

    directions.setLayerOptions({
      startMarker: {
        draggable: false
            },
      endMarker: {
        draggable: false
            },
      routeRibbon: {
        draggable: false
            }
    });

    directions.route({
      start: routeProps.routeStart,
      end: routeProps.routeEnd,
      options: {
        routeType: "pedestrian"
      }
    });

  }
```


# Hardware device to help driver in drowsiness state

- we propose a hardware tool which through a trained ML model analyzes the facial patterns of person driving in real time video of camera  of user for drowsiness detection and alerts with a beep so that driver is cautioned leading to prevention of accident.


## Languages/tech

- Numerical Computation : Numpy
- Data wrangling: pandas
- Framesorks : Tensorflow, pytorch
- Liberies :  Scikit Learn , OpenCv
- Visulaztion : Matplotlib,Seaborn

---


### Basic Pipeline of device 

<div align="center">
    <img width=80% src="https://github.com/github2python/hackfest_2k23/blob/main/1.png">
    <img width=80% src="https://github.com/github2python/hackfest_2k23/blob/main/2.png">
</div>


### Pipeline of trained Model

<div align="center">
    <img width=80% src="https://github.com/github2python/hackfest_2k23/blob/main/drowsiness_detector.model%20(1).png">
</div>




## Team

- [Divyanshu Tyagi]
- [Lavkesh Kumar]
- [Brij Mohan Singh]
- [Priyam]
