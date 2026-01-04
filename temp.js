import crypto from 'crypto'
const rand = crypto.randomBytes(10).toString('hex')
console.log(rand)
