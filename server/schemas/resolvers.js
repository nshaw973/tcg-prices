const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { User, Card } = require("./../models/index");
const mongoose = require("mongoose");

const resolvers = {
  Query: {
    users: async () => {
      // Populate cardCollection directly from User model
      return User.find();
    },
    user: async (parent, { userId }) => {
      const user = await User.findOne({ userId }).populate("cardCollection"); // Populating cardCollection directly from User
      if (user) {
        // Ensure balance is a native JavaScript number, convert Decimal128
        if (user.balance) {
          user.balance =
            user.balance instanceof mongoose.Types.Decimal128
              ? parseFloat(user.balance.toString()) // Convert Decimal128 to Float
              : user.balance;
        }
        return user;
      }
      throw new Error("User not found");
    },
    card: async (parent, { cardId }) => {
      return Card.findOne({ cardId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id });
        return user;
      }
      throw new AuthenticationError("Not logged in");
    },
  },

  Mutation: {
    login: async (parent, { userId, password }) => {
      const user = await User.findOne({ userId });

      if (!user) {
        throw new AuthenticationError("No user found with this User Id!!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    createUser: async (
      parent,
      {
        userId,
        username,
        password,
        balance,
        avatar,
        lastDailyCollected,
        collectionWorth,
      }
    ) => {
      const user = await User.create({
        userId,
        username,
        password,
        balance,
        avatar,
        lastDailyCollected,
        collectionWorth,
      });
      return user;
    },
    removeCardAndUpdateBalance: async (parent, { userId, cardId, price }) => {
      // Validate price
      if (isNaN(parseFloat(price))) {
        throw new Error("Invalid price value");
      }

      // Update the user document in one go
      const updatedUser = await User.findOneAndUpdate(
        { userId }, // Find the user by userId
        {
          $pull: { cardCollection: cardId}, // Remove the card's ObjectId
          $inc: {
            collectionWorth: -parseFloat(price), // Decrease collectionWorth
            balance: parseFloat(price), // Increase balance
          },
        },
        { new: true } // Return the updated document
      );

      if (!updatedUser) {
        throw new Error("User not found");
      }

      // Ensure balance and collectionWorth are valid floats (if using Decimal128)
      if (updatedUser.collectionWorth instanceof mongoose.Types.Decimal128) {
        updatedUser.collectionWorth = parseFloat(
          updatedUser.collectionWorth.toString()
        );
      }
      if (updatedUser.balance instanceof mongoose.Types.Decimal128) {
        updatedUser.balance = parseFloat(updatedUser.balance.toString());
      }

      return updatedUser;
    },
  },
};

module.exports = resolvers;
