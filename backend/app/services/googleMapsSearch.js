const axios = require('axios');

axios.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyD7c-GcRp2B21XlUh288lC658JGObX2X_0')
    .then((response) => {
      console.log(response);
      console.log(response.data);
    }).catch((error) => {
      console.log(error);
    });
