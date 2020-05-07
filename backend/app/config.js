// application configuration
// locates at Reciply_User_Auth/app/config.js

'use strict'

var config = module.exports

config.db = {
  user: 'admin',
  password: 'reciply',
  db_name: 'reciply_db'
}

config.db.details = {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
}

// It will be used to generate JSON Web Token
config.keys = {
  secret: '/jVdfUX+u/Kn3qPY4+ahjwQgyV5UhkM5cdh1i2xhozE='
}
