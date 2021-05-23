const functions = require("firebase-functions");
const cors = require('cors')({ origin: true })
const fs = require('fs')
const uuid = require('uuid-v4')
const { Storage } = require('@google-cloud/storage')
const storage = new Storage({
    projectId: 'lambe-a423c',
    keyFilename: 'lambe-a423c.json'
})

exports.uploadImage = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

    })
});
