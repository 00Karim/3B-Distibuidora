const ProductServices = require("../services/productServices")

class LocalProductController {
    handleGetAllProducts = async (req, res) => {
        try {
            const filters = { ...req.query };

            if (filters.glutenFree === "true") filters.glutenFree = true;
            else if (filters.glutenFree === "false") filters.glutenFree = false;

            const products = await ProductServices.getAll(filters);
            return res.status(200).json(products);
        } catch (e) {
            console.error(e);
            return res.status(500).json("Error interno del servidor");
        }
    };

    handelGetProductById = async(req, res) => {
        try{
            const product = await ProductServices.getById(req.params.id)
            return res.status(200).json(product)
        }catch(e){
            if(e.message.includes("encontrado")) return res.status(404).json({error: e.message})
            return res.status(500).json("Error interno del servidor")
        }
    }   

    handleCreateProduct = async(req, res) => {
        try{
            const product = await ProductServices.create(req.body)
            return res.status(201).json(product)
        }catch(e){
            if(e.message.includes("obligatorio")) return res.status(400).json({error: e.message})
            return res.status(500).json("Error interno del servidor")
        }
    }

    handleUpdateProduct = async(req, res) => {
        try{
            const product = await ProductServices.update(req.params.id, req.body)
            return res.status(200).json(product)
        }catch(e){
            if(e.message.includes("id es obligatorio")) return res.status(404).json({error: e.message})
            if(e.message.includes("precio")) return res.status(400).json({error: e.message})
            if(e.message.includes("stock")) return res.status(400).json({error: e.message})
            return res.status(500).json("Error interno del servidor")
        }
    }

    handleDeleteProduct = async(req, res) => {
        try{
            const product = await ProductServices.delete(req.params.id)
            return res.status(200).json(product)
        }catch(e){
            return res.status(500).json("Error interno del servidor")
        }
    }
}

module.exports = new LocalProductController()