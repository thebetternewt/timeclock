const { Punch } = require('../../models');

module.exports = {
  Query: {
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

      const { userId, netId, departmentId, beginMsTime, endMsTime } = args;
      // const searchParams = {};
      let punchQuery = Punch.find();

      // Conditionally set search params
      if (!user.admin) {
        // If user isn't admin, restrict query to user's punches
        punchQuery = punchQuery.where('userId').equals(user.id);
      } else if (userId) {
        // Allow admin users to query punches by any userId
        punchQuery = punchQuery.where('userId').equals(userId);
      }

      if (netId) {
        punchQuery = punchQuery.where('netId').equals(netId);
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

      return await punchQuery.exec();
    }
  },

  Mutation: {
    clockIn: async (parent, { departmentId }, { user }) => {
      if (!user) {
        throw new Error('Please login');
      }

      // Check if user is already clocked in
      const clockedInPunch = await Punch.findOne({
        clockOutMsTime: null
      }).exec();

      // Throw error if clocked in
      if (clockedInPunch) {
        throw new Error(`Already clocked in`);
      }

      // Else clock user into selected department
      const msTime = new Date().getTime();

      const newPunch = new Punch({
        userId: user.id,
        departmentId,
        clockInMsTime: msTime
      });

      return await newPunch.save();
    },

    clockOut: async (parent, args, { user }) => {
      if (!user) {
        throw new Error('Please login');
      }

      // Check if user is clocked in
      const punch = await Punch.findOne({ clockOutMsTime: null }).exec();

      // Throw error if not clocked in
      if (!punch) {
        throw new Error(`Not clocked in`);
      }

      // Else clock user into selected department
      const msTime = new Date().getTime();
      console.log(msTime);

      punch.set({ clockOutMsTime: msTime });

      return await punch.save();
    },
    addPunch: async (parent, args, { user }) => {
      if (!user || !user.admin) {
        throw new Error('Not authorized');
      }

      const punch = new Punch(args);

      return await punch.save();
    },
    updatePunch: async (parent, args, { user }) => {
      if (!user || !user.admin) {
        throw new Error('Not authorized');
      }

      const { id, ...updatedProperties } = args;

      const updatedPunch = await Punch.findOneAndUpdate(
        { _id: id },
        {
          $set: { ...updatedProperties }
        },
        { new: true }
      ).exec();

      if (!updatedPunch) {
        throw new Error('Punch not found');
      }

      return updatedPunch;
    }
  }
};
