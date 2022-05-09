const mongoose = require('mongoose');


const levelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'level cant be empty']
    },
    school: {
        type: mongoose.Schema.ObjectId,
        ref: 'School',
        required: [true, 'school is required']
    }
});

levelSchema.pre(/^find/, function () {
    this.populate({
        path: 'school',
        select: 'name'

    })
})

module.exports = mongoose.model('Level', levelSchema);