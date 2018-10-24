const { PayPeriod, Punch } = require('../../models');

module.exports = {
  PayPeriod: {
    punches: async (
      parent,
      args,
      { user },
      { variableValues: { userId, departmentId } }
    ) => {
      const searchParams = { payPeriod: parent.id };

      if (user.admin) {
        console.log('admin');
        // return Punch.where({ userId, payPeriod: parent.id }).exec();
        searchParams.userId = userId;
      } else if (user.id !== userId) {
        console.log('user doesnt match');
        return [];
      } else {
        searchParams.userId = user.id;
        console.log('user  match');
      }

      console.log('searchParams:', searchParams);
      console.log('departmentId:', departmentId);

      if (departmentId) {
        searchParams.departmentId = departmentId;
      }

      return Punch.where(searchParams).exec();
    },
  },
  Query: {
    payPeriod: async (parent, { id, payPeriodId, fiscalYear }, { user }) => {
      if (!user) {
        throw new Error('Not authorized');
      }

      // Find PayPeriod based on id or by payPeriodId + fiscalYear
      return PayPeriod.findOne({
        $or: [{ _id: id }, { $and: [{ payPeriodId }, { fiscalYear }] }],
      }).exec();
    },
    payPeriods: async (parent, { fiscalYear }, { user }) => {
      if (!user) {
        throw new Error('Not authorized');
      }

      const searchParams = {};
      if (fiscalYear) {
        searchParams.fiscalYear = fiscalYear;
      }

      return PayPeriod.where(searchParams)
        .sort('startDate')
        .exec();
    },
  },

  Mutation: {
    addPayPeriod: async (parent, args, { user }) => {
      if (!user || !user.admin) {
        throw new Error('Not authorized');
      }

      const newPayPeriod = new PayPeriod({ ...args });

      return newPayPeriod.save();
    },

    updatePayPeriod: async (parent, args, { user }) => {
      if (!user.admin) {
        throw new Error('Not authorized');
      }

      const { id, admin, ...updatedProperties } = args;

      const updatedPayPeriod = await PayPeriod.findOneAndUpdate(
        { _id: id },
        {
          $set: { ...updatedProperties },
        },
        { new: true }
      ).exec();

      if (!updatedPayPeriod) {
        throw new Error('PayPeriod not found');
      }

      return updatedPayPeriod;
    },
    removePayPeriod: async (parent, { id }, { user }) => {
      if (!user.admin) {
        throw new Error('Not authorized');
      }
      const removedPayPeriod = await PayPeriod.findOneAndRemove({
        _id: id,
      }).exec();

      if (!removedPayPeriod) {
        throw new Error('PayPeriod not found');
      }

      return removedPayPeriod.id;
    },
  },
};
