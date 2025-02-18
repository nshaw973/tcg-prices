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
        const user = await User.findOne({ _id: context.user._id }).populate(
          "cardCollection"
        ); // Populating cardCollection directly from User model
        if (user && user.balance) {
          // Ensure balance is a native JavaScript number, convert Decimal128
          user.balance =
            user.balance instanceof mongoose.Types.Decimal128
              ? parseFloat(user.balance.toString()) // Convert Decimal128 to Float
              : user.balance;
        }
        return user;
      }
      throw new AuthenticationError("Not logged in");
    },
  },

  Mutation: {
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new Error("No user found with this username");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new Error("Incorrect password");
      }

      const token = signToken(user);
      return { token, user };
    },

    updateBalance: async (parent, { userId, balance }) => {
      if (balance < 0) {
        throw new Error("Balance cannot be negative");
      }

      const updatedUser = await User.findOneAndUpdate(
        { userId },
        { $set: { balance } },
        { new: true }
      );

      // Ensure balance is a valid float
      if (updatedUser.balance instanceof mongoose.Types.Decimal128) {
        updatedUser.balance = parseFloat(updatedUser.balance.toString());
      }

      return updatedUser;
    },

    addCardToCollection: async (parent, { userId, cardId }) => {
      const user = await User.findOne({ userId });

      if (!user) {
        throw new Error("User not found");
      }

      // Add the card to the collection (cardCollection is now part of User model)
      if (!user.cardCollection.includes(cardId)) {
        user.cardCollection.push(cardId);
        await user.save();
      }

      return user;
    },

    removeCardFromCollection: async (parent, { userId, cardId }) => {
      const user = await User.findOne({ userId });

      if (!user) {
        throw new Error("User not found");
      }

      // Remove the card from the collection (cardCollection is now part of User model)
      user.cardCollection = user.cardCollection.filter(id => id !== cardId);
      await user.save();

      return user;
    },
  },
};

module.exports = resolvers;
