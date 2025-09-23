const mongoose = require("mongoose")

const categorySchema= new mongoose.Schema({ // aplicamos el patron de diseno Composite
    name: {type: String, required: true},
    subcategories: [{type: mongoose.Schema.Types.ObjectId, ref: "Category"}]
})

module.exports = mongoose.model("Category", categorySchema)