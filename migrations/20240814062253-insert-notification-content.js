module.exports = {
  async up(db, client) {
    await db.collection('notificationcontents').insertMany([
      { 
        notificationType: 'happy-birthday',
        notificationChannel: 'ui', 
        notificationContent: {
          content: 'Happy Birthday {{firstName}}'
        } 
      },
      { 
        notificationType: 'happy-birthday',
        notificationChannel: 'email', 
        notificationContent: {
          subject: 'Happy Birthday {{firstName}}',
          content: '{{companyName}} is wishing you a happy birthday, etc.'
        } 
      },
      { 
        notificationType: 'leave-balance-reminder',
        notificationChannel: 'ui', 
        notificationContent: {
          content: 'Hi {{firstName}} you still have remaining leave balance'
        } 
      },
      { 
        notificationType: 'monthly-payslip',
        notificationChannel: 'email', 
        notificationContent: {
          subject: 'Monthly Payslip for {{firstName}}',
          content: 'You have received a monthly payslip from {{companyName}}'
        } 
      },
    ]);
  },

  async down(db, client) {
    await db.collection('notificationcontents').deleteMany({
      notificationType: { $in: ['happy-birthday'] },
    });
  }
};
