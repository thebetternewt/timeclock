const moment = require('moment');
const { Punch, Department, User, PayPeriod } = require('../../models');

module.exports = {
  Punch: {
    user: async parent => User.findOne({ _id: parent.userId }).exec(),
    department: async parent => {
      const department = await Department.findOne({ _id: parent.departmentId });

      return {
        id: department.id,
        name: department.name,
      };
    },
    payPeriod: async parent => PayPeriod.findById(parent.payPeriod).exec(),
  },
  Query: {
    lastPunch: async (parent, args, { user }) => {
      if (!user) {
        throw new Error('Not authorized');
      }

      const punches = await Punch.find({ userId: user.id })
        .sort({ clockInMsTime: 'desc' })
        .limit(1)
        .exec();

      return punches[0];
    },
    punch: async (parent, { id }, { user }) => {
      if (!user) {
        throw new Error('Not authorized');
      }

      let punch;

      if (user.admin) {
        // Allow admin users to query from all punches
        punch = await Punch.findOne({ _id: id }).exec();
      } else {
        // Restrict non-admin users to only query their own punches
        punch = await Punch.findOne({ _id: id, userId: user.id }).exec();
      }

      return punch;
    },
    punches: async (parent, args, { user }) => {
      if (!user) {
        throw new Error('Not authorized');
      }

      const { userId, departmentId, beginMsTime, endMsTime } = args;

      let punchQuery = Punch.find().sort('-clockInMsTime');

      // Conditionally set search params
      if (!user.admin) {
        // If user isn't admin, restrict query to user's punches
        punchQuery = punchQuery.where('userId').equals(userId);
      } else if (userId) {
        // Allow admin users to query punches by any userId
        punchQuery = punchQuery.where('userId').equals(userId);
      }

      if (departmentId) {
        punchQuery = punchQuery.where('departmentId').equals(departmentId);
      }

      if (beginMsTime) {
        punchQuery = punchQuery
          .where('clockInMsTime')
          .gte(parseInt(beginMsTime, 10));
        if (endMsTime) {
          punchQuery = punchQuery
            .where('clockOutMsTime')
            .lte(parseInt(endMsTime, 10));
        }
      }

      return punchQuery.exec();
    },
  },

  Mutation: {
    clockIn: async (parent, { departmentId }, { user }) => {
      if (!user) {
        throw new Error('Please login');
      }

      // Check if user is already clocked in
      const clockedInPunch = await Punch.findOne({
        clockOutMsTime: null,
        userId: user.id,
      }).exec();

      console.log('[ClockedInPunch]:', clockedInPunch);
      // Throw error if clocked in
      if (clockedInPunch) {
        throw new Error('Already clocked in');
      }

      // Else clock user into selected department
      const msTime = new Date().getTime();

      // Get clock in date from msTime
      const clockInDate = moment(msTime, 'x').format('YYYY-MM-DD');
      console.log('clockInDate:', clockInDate);

      // Find pay period that contains clock in date.
      const payPeriod = await PayPeriod.findOne({
        $and: [
          { startDate: { $lte: clockInDate } },
          { endDate: { $gte: clockInDate } },
        ],
      }).exec();

      const newPunch = new Punch({
        userId: user.id,
        departmentId,
        clockInMsTime: msTime,
        payPeriod: payPeriod.id,
      });

      return newPunch.save();
    },

    clockOut: async (parent, args, { user }) => {
      if (!user) {
        throw new Error('Please login');
      }

      // Check if user is clocked in
      const punch = await Punch.findOne({
        clockOutMsTime: null,
        userId: user.id,
      }).exec();

      // Throw error if not clocked in
      if (!punch) {
        throw new Error('Not clocked in');
      }

      // Else clock user into selected department
      const msTime = new Date().getTime();

      punch.set({ clockOutMsTime: msTime });

      return punch.save();
    },
    addPunch: async (parent, args, { user }) => {
      if (!user || !user.admin) {
        throw new Error('Not authorized');
      }

      // Get clock in date from msTime
      const clockInDate = moment(args.clockInMsTime, 'x').format('YYYY-MM-DD');

      // Find pay period that contains clock-in date.
      const payPeriod = await PayPeriod.findOne({
        $and: [
          { startDate: { $lte: clockInDate } },
          { endDate: { $gte: clockInDate } },
        ],
      }).exec();

      const punch = new Punch({ ...args, payPeriod: payPeriod.id });

      return punch.save();
    },
    updatePunch: async (parent, args, { user }) => {
      if (!user || !user.admin) {
        throw new Error('Not authorized');
      }

      const { id, ...updatedProperties } = args;

      // Update pay period id if new clockInMsTime given
      if (updatedProperties.clockInMsTime) {
        // Get clock in date from msTime
        const clockInDate = moment(args.clockInMsTime, 'x').format(
          'YYYY-MM-DD'
        );

        // Find pay period that contains clock-in date.
        const payPeriod = await PayPeriod.findOne({
          $and: [
            { startDate: { $lte: clockInDate } },
            { endDate: { $gte: clockInDate } },
          ],
        }).exec();

        updatedProperties.payPeriod = payPeriod.id;
      }

      const updatedPunch = await Punch.findOneAndUpdate(
        { _id: id },
        {
          $set: { ...updatedProperties },
        },
        { new: true }
      ).exec();

      if (!updatedPunch) {
        throw new Error('Punch not found');
      }

      return updatedPunch;
    },
  },
};
