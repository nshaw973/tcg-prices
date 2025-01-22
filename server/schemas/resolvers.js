const { AuthenticationError } = require('apollo-server-express');
const {
  User
} = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  },

  Mutation: {
    addUser: async (
      parent,
      { firstName, lastName, username, email, password, recruiter }
    ) => {
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        password
      });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    /* addToFavorites: async (parent, { jobId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Must be logged in to perform this action');
      }
      try {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { favorites: jobId } },
          { new: true }
        );
    
        return user;
      } catch (error) {
        throw new Error('Failed to update favorites');
      }
    }, */
    // createPost: async (parent, { title, description, salary }, context) => {
    //   const job = await Job.create({
    //     title,
    //     description,
    //     salary,
    //   });
    //   return job;
    // },
  },
};

module.exports = resolvers;