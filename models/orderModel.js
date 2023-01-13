const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderNumber: {
        type: Number,
        required: true,
    },
    statusOrder: {
        type: String,
        required: true,
        default: "Pending"
    },
    date: {
        type: Date
    },
    customer:{
        type:String,
        required: true
    },
    taxesAmount: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalTaxes: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalAmount: {
        type: Number,
        required: true,
        default: 0.0
    },
    items: [
        {
            qty: { type: Number, required: true },
            cost: { type: Number, required: true },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
        }
    ],
    status: {
        type: Boolean,
        default: true
    }

},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Order', orderSchema)
