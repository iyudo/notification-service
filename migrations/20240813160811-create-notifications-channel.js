module.exports = {
  async up(db, client) {
    await db.createCollection('notificationchannels');
  },

  async down(db, client) {
    await db.collection('notificationchannels').drop();
  }
};
