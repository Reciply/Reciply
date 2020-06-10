'use strict';

const axios = require('axios');

/**
 * Google Maps API key = 'AIzaSyD7c-GcRp2B21XlUh288lC658JGObX2X_0'
 */

const input = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=woolworths+postcode+2500&key=AIzaSyD7c-GcRp2B21XlUh288lC658JGObX2X_0';

axios.get(input)
    .then((response) => {
      // console.log(response);
      console.log(response.data);
    }).catch((error) => {
      console.log(error);
    });
