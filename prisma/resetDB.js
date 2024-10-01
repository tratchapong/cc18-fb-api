require('dotenv').config()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function run() {
	await prisma.$executeRawUnsafe('DROP DATABASE cc18_fakebook')
	await prisma.$executeRawUnsafe('CREATE DATABASE cc18_fakebook')
}

console.log('Reset DB...')
run()
