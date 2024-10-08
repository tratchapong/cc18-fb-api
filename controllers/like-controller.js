const tryCatch = require("../utils/tryCatch");
const prisma = require('../models');
const createError = require("../utils/createError");

module.exports.createLike = tryCatch( async (req,res) => {
	const {postId} = req.body
	const postData = await prisma.post.findUnique({where : {id : postId} })
	if(!postData) {
		createError(401, "Cannot like this post")
	}
	const rs = await prisma.like.create({
		data: {userId: req.user.id, postId: postId}
	})
	res.json(rs)
})

module.exports.deleteLike = tryCatch( async (req,res) => {

	res.json('deleteLike')
})

