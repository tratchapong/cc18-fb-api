const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const hashedPassword = bcrypt.hashSync('123456', 10)

const userData = [
	{
		firstName: 'Andy', lastName: 'Codecamp', password: hashedPassword, email: 'andy@ggg.mail',
		profileImage: 'https://www.svgrepo.com/show/420364/avatar-male-man.svg'
	},
	{
		firstName: 'Bobby', lastName: 'Codecamp', password: hashedPassword, email: 'bobby@ggg.mail',
		profileImage: 'https://www.svgrepo.com/show/420319/actor-chaplin-comedy.svg'
	},
	{
		firstName: 'Candy', lastName: 'Codecamp', password: hashedPassword, mobile: '1111111111',
		profileImage: 'https://www.svgrepo.com/show/420327/avatar-child-girl.svg'
	},
	{
		firstName: 'Danny', lastName: 'Codecamp', password: hashedPassword, mobile: '2222222222',
		profileImage: 'https://www.svgrepo.com/show/420314/builder-helmet-worker.svg'
	},
]

console.log('DB seed...')

async function run() {
	await prisma.user.createMany({ data: userData })
}

run()
