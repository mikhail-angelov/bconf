'use strict'

const mongodb = require('mongodb')
const mongo = mongodb.MongoClient
const ObjectId = mongodb.ObjectId
let _db

module.exports = {
  init,
  findById,
  findOne,
  find,
  update,
  create,
  remove,
}

function init(opts) {
  const options = opts || {}
  const url = options.url || process.env.DB_URL || 'mongo://localhost:27017/test'
  console.log('mongo url:', url)
  return mongo
    .connect(url)
    .then(db => {
      _db = db
    })
    .catch(err => {
      console.log('connection', err)
      throw new Error('Failed DB connection')
    })
}

function getDb() {
  if (_db) {
    return _db
  } else {
    throw new Error('DB should be initiated first')
  }
}
function getCllection(collectionName) {
  return getDb().collection(collectionName)
}

function findById(collection, id) {
  const col = getCllection(collection)
  return col.findOne({ _id: ObjectId(id) })
}
function findOne(collection, query) {
  const col = getCllection(collection)
  return col.findOne(query)
}
function find(collection, query) {
  const col = getCllection(collection)
  return col.find(query).toArray()
}
function create(collection, entity) {
  const col = getCllection(collection)
  return col.insert(entity)
}
function update(collection, query, data) {
  const col = getCllection(collection)
  return col.update(query, data)
}
function remove(collection, query, id) {
  const col = getCllection(collection)
  return col.remove({ _id: ObjectId(id) })
}
