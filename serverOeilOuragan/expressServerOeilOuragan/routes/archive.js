var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/lum', function (req, res, next) {
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
          2,
          5,
          98
        ],
        "times": [
          "2023-02-08T15:41:04.626Z",
          "2023-02-09T15:41:04.626Z"
        ],
        "desc": "feature description",
        "unit": "feature unit"
      }
    }
  };
  res.json(json);
});

module.exports = router;
