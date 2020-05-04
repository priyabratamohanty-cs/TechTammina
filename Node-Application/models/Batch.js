let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let batchSchema = new Schema({
    batchName: { type: String, unique: true },
    startBatch: { type: Date },
    endBatch: { type: Date },
    candidateDetails: { type: Array }
});

module.exports = mongoose.model('batch', batchSchema, 'batch');