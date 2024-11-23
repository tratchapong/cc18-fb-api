require('dotenv').config()
const prisma = require('../models')

async function run() {
	try{
		await prisma.$executeRawUnsafe('DROP DATABASE the_fakebook')
		await prisma.$executeRawUnsafe('CREATE DATABASE the_fakebook')
	}catch(err){
		console.log(err)
	}
}

console.log('Reset DB...')
run()
