var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
var adapter = new FileSync("db.json");

var db = low(adapter);

db.defaults({ 
  books: [], 
  users: [], 
  sessions: [], 
  transfers: [],
  transactions: [] 
}).write();

module.exports = db;