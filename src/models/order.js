const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema( {
    userId: {
        type: ObjectId,
        ref : "UserDoc"
    },
    productId: {
            type: ObjectId,
            ref : "ProductDoc"
        },
    amount: Number,
    isfreeappuser: {
        type : Boolean,
        default : true
    },
    Date : String
}, { timestamps: true });

module.exports =  mongoose.model("Order", orderSchema)


