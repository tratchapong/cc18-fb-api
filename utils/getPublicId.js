module.exports = (url) => {
	// https://res.cloudinary.com/tratchapong/image/upload/v1728284534/3_1728284528226.png
	const pattern = /\/v\d+\/(.+)\.[a-z]+$/ 
	const match = url.match(pattern)
	console.log(match)
	return match[1]
}