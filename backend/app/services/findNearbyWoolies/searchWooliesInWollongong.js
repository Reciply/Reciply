/**
 * This file is the whitelist of Woolworths supermarkets in Wollongong area,
 * which is retieved from Google Maps using Google Maps APIs.
 * This file is derived from the file 'googleMapsSearch.js'
 */

'use strict';

const wooliesList = [
  {
    zipcode: 2500,
    formatted_address: '63 Burelli St, Wollongong NSW 2500, Australia',
    name: 'Woolworths Wollongong',
    place_id: 'ChIJdeiUZa8ZE2sRLBJ4s8KNdsw'
  },
  {
    zipcode: 2525,
    formatted_address: '19 Princes Hwy, Figtree NSW 2525, Australia',
    name: 'Woolworths Figtree',
    place_id: 'ChIJo5fs6fUZE2sRg26DreiZZoE'
  },
  {
    zipcode: 2519,
    formatted_address: '66 Princes Hwy, Fairy Meadow NSW 2519, Australia',
    name: 'Woolworths Fairy Meadow',
    place_id: 'ChIJS3KX_ToZE2sRdH1FOMngNeM'
  },
  {
    zipcode: 2526,
    formatted_address: '4-8 Tannery St, Unanderra NSW 2526, Australia',
    name: 'Woolworths Unanderra',
    place_id: 'ChIJ_XsdY6MQE2sRFhDBz47-yGw'
  },
  {
    zipcode: 2518,
    formatted_address: 'Stockland Shopping Centre, 270 Princes Hwy, Corrimal NSW 2518, Australia',
    name: 'Woolworths Corrimal',
    place_id: 'ChIJE5sp7dEeE2sRn0GIF7sP5dE'
  },
  {
    zipcode: 2530,
    formatted_address: '75-87 Princes Hwy, Dapto NSW 2530, Australia',
    name: 'Woolworths',
    place_id: 'ChIJA0Wf7c4RE2sRTNRHh-SC70k'
  },
  {
    zipcode: 2516,
    formatted_address: '5-9 Molloy St, Bulli NSW 2516, Australia',
    name: 'Woolworths Bulli',
    place_id: 'ChIJY8dnJqwfE2sRJy4AHAVzXwY'
  },
  {
    zipcode: 2528,
    formatted_address: 'Grove Shopping Centre, 29-30 Shellharbour Rd, Warilla NSW 2528, Australia',
    name: 'Woolworths Warilla',
    place_id: 'ChIJF0y0qQkUE2sRHHg1gz50Pdo'
  },
  {
    zipcode: 2529,
    formatted_address: 'Stoney Range Centre, New Lake Entrance Rd, Shellharbour NSW 2529, Australia',
    name: 'Woolworths',
    place_id: 'ChIJFRXQwwkTE2sRiCA5OnQjDQ4'
  },
  {
    zipcode: 2529,
    formatted_address: '211 Lake Entrance Rd, Shellharbour NSW 2529, Australia',
    name: 'Woolworths Shellharbour',
    place_id: 'ChIJ73L61aETE2sRXVewF0YvFQA'
  },
  {
    zipcode: 2527,
    formatted_address: '2527/1 Russell St, Albion Park NSW 2527, Australia',
    name: 'Woolworths Albion Park',
    place_id: 'ChIJB9-PJKISE2sRReHBqUZqv5o'
  },
  {
    zipcode: 2529,
    formatted_address: '100 Cove Blvd, Shell Cove NSW 2529, Australia',
    name: 'Woolworths Shell Cove',
    place_id: 'ChIJkS4Qk1QVE2sREi8FZf8vVLM'
  },
  {
    zipcode: 2573,
    formatted_address: '117 Remembrance Driveway, Tahmoor NSW 2573, Australia',
    name: 'Woolworths Tahmoor',
    place_id: 'ChIJIaBgzeX_EmsRIRLOoxtj6oM'
  }
];

const search = {};

/**
 * To search all available Woolworths supermarkets within Wollongong under a given zipcode.
 * @param {object} req req.bodythe postcode provided by a customer
 * @param {object} res return result of search
 * @return {undefined}
 */
search.searchWoolies = function(req, res) {
  console.log('[DEBUG]: searchWoolies');

  if (!req.body.postcode) {
    console.log(new Error('The input postcode is empty!'));
  } else {
    const result = []; // array
    let woolies;
    let i = 0;
    for (woolies of wooliesList) {
      if (woolies.zipcode == req.body.postcode) {
        const found = {};
        found.name = woolies.name;
        found.address = woolies.formatted_address;
        result.push(found);
        i = i + 1;
      }
    }
    if (i == 0) {
      res.status(404).json('There is no available Woolworths found!');
    } else {
      res.status(202).send(result);
    }
  }
};

/*
search.searchWoolies = function(zipcode) {
  const result = []; // array
  let woolies;
  for (woolies of wooliesList) {
    if (woolies.zipcode == zipcode) {
      const found = {};
      found.name = woolies.name;
      found.address = woolies.formatted_address;
      result.push(found);
    }
  }
  return result;
};
*/

module.exports = search;
