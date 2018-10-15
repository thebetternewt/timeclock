const { Department } = require('../../models');

module.exports = {
  Query: {
    department: async (parent, { id }, { user }) => {
      if (!user) {
        throw new Error('Not authorized');
      }
      return Department.findOne({ _id: id }).exec();
    },
    departments: async (parent, args, { user }) => {
      if (!user) {
        throw new Error('Not authorized');
      }

      return Department.find()
        .sort('name')
        .exec();
    },
  },

  Mutation: {
    addDepartment: async (parent, args, { user }) => {
      if (!user || !user.admin) {
        throw new Error('Not authorized');
      }

      const newDepartment = new Department({ ...args });

      return newDepartment.save();
    },

    updateDepartment: async (parent, args, { user }) => {
      if (!user.admin) {
        throw new Error('Not authorized');
      }

      const { id, admin, ...updatedProperties } = args;

      const updatedDepartment = await Department.findOneAndUpdate(
        { _id: id },
        {
          $set: { ...updatedProperties },
        },
        { new: true }
      ).exec();

      if (!updatedDepartment) {
        throw new Error('Department not found');
      }

      return updatedDepartment;
    },
    removeDepartment: async (parent, { id }, { user }) => {
      if (!user.admin) {
        throw new Error('Not authorized');
      }
      const removedDepartment = await Department.findOneAndRemove({
        _id: id,
      }).exec();

      if (!removedDepartment) {
        throw new Error('Department not found');
      }

      return removedDepartment.id;
    },
  },
};
