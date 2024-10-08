const tryCatch = require("../utils/tryCatch");
const prisma = require('../models')


module.exports.createComment = tryCatch(async (req,res) => {
	const {message, postId} = req.body
	const userId = req.user.id
	// validation
	const postData = await prisma.post.findUnique({where : {id : postId} })
	if(!postData) {
		createError(401, "Cannot delete")
	}
	const rs = await prisma.comment.create({
		data : {message, postId, userId}
	})

	res.json(rs)
} )