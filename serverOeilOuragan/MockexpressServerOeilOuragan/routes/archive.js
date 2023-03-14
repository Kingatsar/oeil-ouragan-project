var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:period/:feature', function (req, res, next) {
  let json = {
    "id": 1,
    "name": "best group ever",
    "location": {
      "lat": 0,
      "long": 0
    },
    "measurements": {
      "feature": {
        "name": "feature name",
        "values": [
          Math.random() * 20,
          Math.random() * 20,
          Math.random() * 20
        ],
        "times": [
          "2023-02-08T15:41:04.626Z",
          "2023-03-09T15:41:04.626Z",
          "2023-04-09T15:4104.626Z"
        ],
        "desc": "feature description",
        "unit": "feature unit"
      }
    }
  };
  res.json(json);
});

module.exports = router;
