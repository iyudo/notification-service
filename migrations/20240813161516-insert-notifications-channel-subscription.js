module.exports = {
  async up(db, client) {
    await db.collection('notificationchannelsubscriptions').insertMany([
      { entityID: 'user-a', entityType: 'user', notificationChannel: ['ui'] },
      { entityID: 'user-b', entityType: 'user', notificationChannel: ['email'] },
      { entityID: 'user-c', entityType: 'user', notificationChannel: ['ui', 'email'] },
      { entityID: 'company-a', entityType: 'company', notificationChannel: ['ui'] },
      { entityID: 'company-b', entityType: 'company', notificationChannel: ['ui'] },
      { entityID: 'company-c', entityType: 'company', notificationChannel: [] },
    ]);
  },

  async down(db, client) {
    await db.collection('notificationchannelsubscriptions').deleteMany({
      name: { $in: ['user-a', 'user-b', 'user-c', 'company-a', 'company-b', 'company-c'] },
    });
  }
};
