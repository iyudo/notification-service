module.exports = {
  async up(db, client) {
    await db.collection('notificationchannels').insertMany([
      { notificationType: 'leave-balance-reminder', notificationChannel: ['ui'] },
      { notificationType: 'monthly-payslip', notificationChannel: ['email'] },
      { notificationType: 'happy-birthday', notificationChannel: ['ui', 'email'] },
    ]);
  },

  async down(db, client) {
    await db.collection('notificationchannels').deleteMany({
      name: { $in: ['leave-balance-reminder', 'monthly-payslip', 'happy-birthday'] },
    });
  }
};
