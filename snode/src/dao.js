const mongodb = require('mongodb')
const mongo = mongodb.MongoClient
const ObjectId = mongodb.ObjectId

module.exports = function init(opts) {
    const options = opts || {}
    const url = options.url || process.env.DB_URL || 'mongo://localhost:27017/test'
    console.log('mongo url:', url)
    return mongo.connect(url)
        .then(db => {

            function findById(collection, id) {
                const col = db.collection(collection)
                return col.findOne({_id:ObjectId(id)})
            }
            function findOne(collection, query) {
                const col = db.collection(collection)
                return col.findOne(query)
            }
            function find(collection, query) {
                const col = db.collection(collection)
                return col.find(query).toArray()
            }
            function create(collection, entity) {
                const col = db.collection(collection)
                return col.insert(entity)
            }
            function update(collection, query, data) {
                const col = db.collection(collection)
                return col.update(query, data)
            }

            return {
                findById,
                findOne,
                find,
                update,
                create
            }
        })
}

