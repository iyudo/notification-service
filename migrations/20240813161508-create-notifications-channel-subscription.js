module.exports = {
  async up(db, client) {
    await db.createCollection('notificationchannelsubscriptions');
  },

  async down(db, client) {
    await db.collection('notificationchannelsubscriptions').drop();
  }
};
