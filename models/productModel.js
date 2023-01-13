const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        active: {
            type: Boolean,
            default: true
        },
        status: {
            type: Boolean,
            default: true
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Product', productSchema)


