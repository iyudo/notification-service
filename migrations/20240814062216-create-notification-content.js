module.exports = {
  async up(db, client) {
    await db.createCollection('notificationcontents');
  },

  async down(db, client) {
    await db.collection('notificationcontents').drop();
  }
};
