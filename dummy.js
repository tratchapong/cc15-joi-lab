const Joi = require('joi');

const allSports = ['tennis', 'football', 'badminton', 'basketball', 'rugby'];

const schema = Joi.object({
  name: Joi.string(),
  playedSports: Joi.array().items(Joi.string().valid(...allSports)),
  favouriteSports: Joi.array()
    .items(Joi.string().valid(...allSports)) // Ensure all favorite sports are valid
    .when('playedSports', {
      is: Joi.array().min(1).required(), // Check if playedSports is an array with at least one item
      then: Joi.array().items(Joi.valid(...allSports)).unique(), // Ensure favorite sports are unique and valid
      otherwise: Joi.array().forbidden(), // If playedSports is empty or not present, favoriteSports should be forbidden
    }),
});

const dataToValidate = {
  name: 'John Doe',
  playedSports: ['tennis', 'football', 'badminton'],
  favouriteSports: ['football', 'tennis'], // These are valid because they are in playedSports
};

const { error, value } = schema.validate(dataToValidate);

if (error) {
  console.error('Validation error:', error.details);
} else {
  console.log('Data is valid:', value);
}
