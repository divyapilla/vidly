const Joi = require('joi');

module.exports = {
    genre: (genre) => {
      const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),    
      }); return schema.validate(genre);
    },
    customer: (customer) => {
        const schema = Joi.object({
           isGold: Joi.boolean(),
           phone: Joi.string().min(5).max(15).required(),
           name: Joi.string().min(5).max(50).required()
        }); return schema.validate(customer);
    },
    movie: (movie) => {
    const schema = Joi.object({
        title: Joi.string().required().min(5).max(50),
      genreId: Joi.string().required(),
      numberInStock: Joi.number().min(0).required(),
      dailyRentalRate: Joi.number().min(0).required(),
    }); return schema.validate(movie);
    },
    rental: (rental) => {
    const schema = Joi.object({
      customerId: Joi.string().required(),
      movieId: Joi.string().required()       
    }); return schema.validate(rental);
    },
    user: (user) => {
        const schema = Joi.object({
            name: Joi.string().min(5).max(50).required(),
            email: Joi.string().required(),
            password: Joi.string().required().min(8).max(1024),
            isAdmin:Boolean
        }); return schema.validate(user);
    },
    auth: (auth) => {
        const schema = Joi.object({
            email: Joi.string().required().email(),
            password: Joi.string().required().min(8).max(1024)
        }); return schema.validate(auth);
    }
}