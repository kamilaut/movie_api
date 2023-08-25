/**
 * @fileoverview Defines Mongoose schemas and models for Movie and User entities.
 * @author Your Name
 * @requires mongoose
 * @requires bcrypt
 */
const mongoose = require('mongoose');
	const bcrypt = require('bcrypt');

/**
 * Schema for Movie entity.
 * @type {mongoose.Schema}
 */
		let movieSchema = mongoose.Schema({
		  Title: {type: String, required: true},
		  Description: {type: String, required: true},
		  Genre: {
		    Name: String,
		    Description: String
		  },
		  Director: {
		    Name: String,
		    Bio: String
		  },
		  Actors: [String],
		  ImagePath: String,
		  Featured: Boolean
		});

/**
 * Schema for User entity.
 * @type {mongoose.Schema}
 */
		//hashing
	  let userSchema = mongoose.Schema({
	  Username: {type: String, required: true},
	  Password: {type: String, required: true},
	  Email: {type: String, required: true},
	  Birthday: Date,
	  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
	});

/**
 * Hashes a password.
 * @param {string} password - The password to hash.
 * @returns {string} The hashed password.
 */
	userSchema.statics.hashPassword = (password) => {
	  return bcrypt.hashSync(password, 10);
	};

/**
 * Validates a password.
 * @param {string} password - The password to validate.
 * @returns {boolean} True if the password is valid, false otherwise.
 */
	userSchema.methods.validatePassword = function(password) {
	  return bcrypt.compareSync(password, this.Password);
	};

/**
 * Mongoose model for Movie entity.
 * @type {mongoose.Model}
 */
//Modals
		let Movie = mongoose.model('Movie', movieSchema);
		
/**
 * Mongoose model for User entity.
 * @type {mongoose.Model}
 */
		let User = mongoose.model('User', userSchema);

/**
 * Exports the Movie and User models.
 * @module models
 */
//Exporting modals
		module.exports.Movie = Movie;
		module.exports.User = User;