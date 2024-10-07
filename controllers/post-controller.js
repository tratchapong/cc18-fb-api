const path = require('path')
const fs = require('fs/promises')
const tryCatch = require("../utils/tryCatch")
const prisma = require('../models')
const cloudinary = require('../config/cloudinary')
const createError = require('../utils/createError')

// explain regex + match
// https://chatgpt.com/c/66f4e56e-6c14-800a-8292-79211e4c2fc8

function getPublicId(url) {
	const pattern = /\/v\d+\/(.+)\.[a-z]+$/
	const match = url.match(pattern)
	console.log(match)
	return match[1]
}

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
	// console.log(req.file)
	const haveFile = !!req.file
	let uploadResult = {}
	if(haveFile){
		uploadResult = await cloudinary.uploader.upload(req.file.path, {
			overwrite : true,
			public_id : path.parse(req.file.path).name,
		})
		fs.unlink(req.file.path)
	}
	// console.log(uploadResult)
	const data = {
		message : message,
		image : uploadResult.secure_url || '',
		userId : req.user.id
	}
	const rs = await prisma.post.create({ data : data})
	res.json(rs)
})

module.exports.deletePost = tryCatch( async (req, res) => {
	const { id } = req.params
	const postData = await prisma.post.findUnique({where : {id : +id} })
	if(!postData || !(postData.userId === +req.user.id) ) {
		createError(401, "Cannot delete")
	}
	const rs = await prisma.post.delete({
		where : { id : +id}
	})
	res.json(rs)
})

module.exports.editPost = tryCatch( async (req, res) => {
	const { id } = req.params
	const { message }= req.body

	const postData = await prisma.post.findUnique({where : {id : +id} })
	if(!postData || !(postData.userId === +req.user.id) ) {
		createError(401, "Cannot update")
	}
	const haveFile = !!req.file
	let uploadResult = {}
	if(haveFile){
		uploadResult = await cloudinary.uploader.upload(req.file.path, {
			public_id : path.parse(req.file.path).name,
		})
		fs.unlink(req.file.path)
		// console.log('***',postData.image)
		// console.log('***',getPublicId(postData.image))
		if(postData.image) {
			cloudinary.uploader.destroy(getPublicId(postData.image))
		}
	}	
	console.log(uploadResult)
	const data = haveFile 
	 ? { message, image: uploadResult.secure_url, userId: req.user.id	}
	 : { message, userId: req.user.id }
	const rs = await prisma.post.update({
		where : { id : +id },
		data : data
	})
	res.json(rs)
})


