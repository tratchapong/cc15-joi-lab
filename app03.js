// from chatGPT
// https://chat.openai.com/share/2be594d7-c183-4424-acc3-533402104c16

const Joi = require('joi');

const allSports = ['tennis', 'football', 'badminton', 'basketball', 'rugby'];

const schema = Joi.object({
  name: Joi.string(),
  playedSports: Joi.array().items(Joi.string().valid(...allSports)),
  favouriteSports: Joi.string()
    .valid(...allSports) // Ensure the favorite sport is one of the allowed sports
    .when('playedSports', {
      is: Joi.array().min(1).required(), // Check if playedSports is an array with at least one item
      then: Joi.valid(Joi.ref('playedSports')), // Favorite sport must be one of the played sports
      otherwise: Joi.any().forbidden(), // If playedSports is empty or not present, favoriteSports should be forbidden
    }),
});

const dataToValidate = {
  name: 'John Doe',
  playedSports: ['tennis', 'football', 'badminton'],
  favouriteSports: 'football', // This is valid because 'football' is in playedSports
};

const { error, value } = schema.validate(dataToValidate);

if (error) {
  console.error('Validation error:', error.details);
} else {
  console.log('Data is valid:', value);
}
