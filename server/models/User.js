const mongoose = require("mongoose");
const { Schema, model } = mongoose; // Destructure Schema and model from mongoose
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    balance: {
      type: Schema.Types.Decimal128,
      default: 0.0,
    },
    lastDailyCollected: {
      type: Date,
    },
    cardCollection: [
      {
        type: Schema.Types.ObjectId,
        ref: "Card", // Referencing the Card collection for favorited cards
      },
    ],
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Card", // Referencing the Card collection for favorited cards
      },
    ],
    coverCard: {
      type: Schema.Types.ObjectId,
      ref: "Card"
    },
    collectionWorth: {
      type: Schema.Types.Decimal128,
      default: 0.0,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("cardCount").get(function () {
  return this.cardCollection.length;
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
