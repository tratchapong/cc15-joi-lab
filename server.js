const Joi = require('joi');

console.clear()

const allSports = ['tennis', 'football', 'badminton', 'basketball', 'rugby'];

const schema = Joi.object({
	firstName: Joi.string().trim().required(),
	lastName: Joi.string().trim().required(),
  emailOrMobile: 
    [Joi.string().email(), 
     Joi.string().regex(/^[0-9]{10}$/)],
  	
  password: Joi.string().trim().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
  confirmPassword: Joi.string().trim().valid(Joi.ref('password')).required().strip(),
  mobile: Joi.forbidden().when('emailOrMobile', {
    is: Joi.string().regex(/^[0-9]{10}$/),
		then: Joi.any().default(Joi.ref('emailOrMobile'))
  }),
  email: Joi.forbidden().when('emailOrMobile', {
		is: Joi.string().email(),
  	then: Joi.any().default(Joi.ref('emailOrMobile'))
	})
})

const dataToValidate ={ 
  firstName: "andy",
  lastName: "codecamp",
  emailOrMobile: '0123456789',
  password: "password   ",
  confirmPassword: "   password",
 }
 

const { error, value } = schema.validate(dataToValidate);

if (error) {
  console.error('Validation error:', error.details);
} else {
  console.log('Data is valid:', value);
}
