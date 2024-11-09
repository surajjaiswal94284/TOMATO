const fs=require("fs");
const foodModel=require('../models/foodModel');


//Add the food item
const addFood=async(req,res)=>{
    //console.log(req.file);
    //console.log(req.body);
    const image_file = req.file ? req.file.filename : null;
    //const image_file=`${req.file.filename}`

    if (!image_file) {
        return res.status(400).send("Image file is required.");
    }

        const data= new foodModel({
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            category:req.body.category,
            image:image_file,
        })
        await data.save()
        .then(()=>res.send("Data has been added"))
        .catch((err)=>res.send(`Error occurred:${err.message}`));
};


//List all food
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

//Delete food item
const removeFood = async (req, res) => {
    try {

        //Deletes from upload folder
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => { })

        //Deletes from Database
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Food Removed" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}


module.exports = {
    addFood,
    listFood,
    removeFood,
};

