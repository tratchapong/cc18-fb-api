require('dotenv').config()
const prisma = require('../models')

async function run() {
	try{
		await prisma.$executeRawUnsafe('DROP DATABASE cc18_fakebook_2')
		await prisma.$executeRawUnsafe('CREATE DATABASE cc18_fakebook_2')
	}catch(err){
		console.log(err)
	}
}

console.log('Reset DB...')
run()
