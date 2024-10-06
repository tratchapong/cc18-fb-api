const fs = require('fs/promises')
const path = require('path')
const tryCatch = require("../utils/tryCatch")
const prisma = require('../models')
const cloudinary = require("../config/cloudinary")


module.exports.getAllPosts = tryCatch( async (req,res) => {
	const rs = await prisma.post.findMany({
		orderBy : {createdAt : 'desc'},
		include : {
			user : { 
				select : {
					firstName : true, lastName : true, profileImage : true
				}
			},
		}	
	})
	res.json({posts : rs})
})

module.exports.createPost = tryCatch( async (req, res) => {
	const {message } = req.body
	const haveFile = !!req.file 
	console.log(req.file)
	let uploadResult = {}
	if(haveFile) {
		uploadResult = await cloudinary.uploader.upload(req.file.path, {
			public_id : path.parse(req.file.path).name
		})
		fs.unlink(req.file.path)
	}
	const data = {
		message,
		image : uploadResult.secure_url || '',
		userId : req.user.id
	}
	const rs = await prisma.post.create({data})
	res.json(rs)
})

module.exports.editPost = (req, res) => {

	res.json('editPost')
}

module.exports.deletePost = tryCatch(async (req, res) => {
	const { id } = req.params
	const rs = await prisma.post.delete(
		{where : { id : +id}}
	)
	res.json(rs)
})


