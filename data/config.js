const knex = require("knex")
const knexfile = require("../knexfile")
const { development } = require("../knexfile")

const env= process.env.NODE_ENV || "development";
//using [] helps look up a variable as the key name
module.exports = knex(knexfile[env])
