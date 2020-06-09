// test the API key of Google Maps Services

const {Client, Status} = require('@googlemaps/google-maps-services-js');

const client = new Client({});

client
    .elevation({
      params: {
        locations: [{lat: 45, lng: -110}],
        key: 'AIzaSyD7c-GcRp2B21XlUh288lC658JGObX2X_0'
      },
      timeout: 1000 // milliseconds
    })
    .then((r) => {
      console.log(r.data.results[0].elevation);
    })
    .catch((e) => {
      console.log(e.response.data.error_message);
    });
