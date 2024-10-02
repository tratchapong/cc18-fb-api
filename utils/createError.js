module.exports = (statusCode, msg) => {
	const error = new Error(msg)
	error.statusCode = statusCode
	throw(error)
}