const express = require("express")
const Hobbits = require("./hobbits-model")

const router = express.Router()

router.get("/", async (req, res, next) => {
	try {
		res.json(await Hobbits.find())
	} catch(err) {
		next(err)
	}
})

router.get("/:id",async (req,res,next)=>{
	try {
		const hobbit= await Hobbits.findById(req.params.id)
		if(hobbit){
			res.status(200).json(hobbit)
		}else res.status(404).json({message: "hobbit id not found"})	
	} catch (err) {
		next(err)
	}
})

router.post("/",async (req,res,next)=>{
	try {
		const post=await Hobbits.create(req.body)
		 res.status(201).json(post) 
	} catch (err) {
		next(err)
	}
})
module.exports = router