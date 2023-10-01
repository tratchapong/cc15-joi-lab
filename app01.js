const Joi = require('joi')

const schema = Joi.number().max(40)

let x = 34
let y = 41
let rsx = schema.validate(x)
let rsy = schema.validate(y)

console.log(rsx)
console.log(rsy)