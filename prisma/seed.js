const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const hashedPassword = bcrypt.hashSync('123456', 10)

const userData = [
	{firstName : 'Andy', lastName: 'Codecamp', password: hashedPassword ,email: 'andy@ggg.mail'},
	{firstName : 'Bobby', lastName: 'Codecamp', password: hashedPassword ,email: 'bobby@ggg.mail'},
	{firstName : 'Candy', lastName: 'Codecamp', password: hashedPassword ,mobile: '1111111111'},
	{firstName : 'Danny', lastName: 'Codecamp', password: hashedPassword ,mobile: '2222222222'},
]

console.log('DB seed...')

async function run() {
	await prisma.user.createMany({data: userData})
}

run()
