

module.exports.getAllPosts = (req, res) => {
	res.json('getAllPost')
}

module.exports.createPost = (req, res) => {
	res.json('createPost')
}

module.exports.editPost = (req, res) => {
	const { id } = req.params
	
	res.json('editPost')
}

module.exports.deletePost = (req, res) => {
	const { id } = req.params

	res.json('deletePost')
}


