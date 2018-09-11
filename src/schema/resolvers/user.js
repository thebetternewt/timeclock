const { User, Department, Punch } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  User: {
    departments: async (parent, args, { user }) => {
      if (!user) {
        throw new Error('You are not authenticated!');
      }

      const parentUser = await User.findOne({ _id: parent.id }).exec();

      // user is authenticated
      return await Department.where('_id')
        .in(parentUser.departments)
        .exec();
    },
    punches: async (parent, args, { user }) => {
      if (!user) {
        throw new AuthenticationError('You are not authenticated!');
      }

      // user is authenticated
      return await Punch.where('userId')
        .equals(user.id)
        .exec();
    }
  },
  Query: {
    me: async (parent, args, { user }) => {
      if (!user) {
        throw new AuthenticationError('You are not authenticated!');
      }

      // user is authenticated
      return await User.findOne({ _id: user.id }).exec();
    },
    user: async (parent, { id }, { user }) => {
      if (!user.id === id && !user.admin) {
        throw new Error('Not authorized');
      }
      return await User.findOne({ _id: id }).exec();
    },
    users: async (parent, args, { user }) => {
      if (!user.admin) {
        throw new Error('Not authorized');
      }
      return await User.find().exec();
    }
  },

  Mutation: {
    addUser: async (parent, { password, admin, ...rest }, { user }) => {
      // Users can only be added internally. There is no external facing
      // signup page for the Timeclock application.

      if (!user || !user.admin) {
        throw new AuthenticationError('Not authorized');
      }

      const userProperties = { ...rest };

      // Only allow admin=true if logged in user is admin.
      if (user.admin !== undefined) {
        userProperties.admin = admin;
      }

      // Hash password
      const hashedPass = await bcrypt.hash(password, 10);
      userProperties.password = hashedPass;

      const newUser = new User({ ...userProperties });

      return await newUser.save();
    },
    login: async (parent, { netId, password }) => {
      const user = await User.findOne({ netId }).exec();

      if (!user) {
        throw new Error("User doesn't exist");
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        throw new Error('Invalid credentials');
      }

      return jwt.sign(
        { id: user.id, netId: user.netId, admin: user.admin },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
    },
    updateUser: async (parent, args, { user }) => {
      const { id, admin, departments, password, ...updatedProperties } = args;

      // Only allow update of a user if the user is the currently logged in user
      // or if the currently logged in user is an admin.
      if (!user || (!(user.id === id) && !user.admin)) {
        throw new Error('Not authorized');
      }

      // Only allow update of admin if current user is admin and
      // only update admin if specified args
      if (user.admin && admin !== undefined) {
        updatedProperties.admin = admin;
      }

      if (password) {
        // Hash new password
        const hashedPass = await bcrypt.hash(password, 10);
        updatedProperties.password = hashedPass;
      }

      // Split departments string into array of department IDs
      if (departments) {
        const departmentArray = departments.split(',').map(dept => dept.trim());
        updatedProperties.departments = departmentArray;
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        {
          $set: { ...updatedProperties }
        },
        { new: true }
      ).exec();

      if (!updatedUser) {
        throw new Error('User not found');
      }

      return updatedUser;
    },
    removeUser: async (parent, { id }, { user }) => {
      if (!user.id === id && !user.admin) {
        throw new Error('Not authorized');
      }
      const removedUser = await User.findOneAndRemove({ _id: id }).exec();

      if (!removedUser) {
        throw new Error('User not found');
      }

      return removedUser._id;
    }
  }
};
