const orderSaving = require('./orderSaving');

const myJSON = '{"email": "1@gmail.com", "address": "200 Ray Street, Burwood NSW 2122", "items": [{"name": "lettuce", "price": 9.95, "amount": 2}, {"name": "bread", "price": 3.55, "amount": 1}], "instructions": "I need have it by today, please."}';
// const obj = JSON.parse(myJSON);
// console.log(obj);

orderSaving.saveOrder(myJSON);
