const Joi = require('joi')

console.clear()

const schema = Joi.object ({
  pw : Joi.string().min(5),
  pwcf : Joi.ref('pw')
})

let data = {
  pw : '123456',
  pwcf : '12345' //not valid due to not the same
}
  
console.log(schema.validate(data))


