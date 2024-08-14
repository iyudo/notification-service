module.exports = {
  async up(db, client) {
    await db.createCollection('notifications');
  },

  async down(db, client) {
    await db.collection('notifications').drop();
  }
};
