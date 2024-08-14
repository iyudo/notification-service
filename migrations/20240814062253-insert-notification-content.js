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
    ]);
  },

  async down(db, client) {
    await db.collection('notificationcontents').deleteMany({
      notificationType: { $in: ['happy-birthday'] },
    });
  }
};
