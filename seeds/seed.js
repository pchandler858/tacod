// dependencies
const sequelize = require('../config/connection');
const { User, BlogPost } = require('../models');

const userData = require('./userData.json');
const reviewData = require('./reviewData.json');

// Seeds the database
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const review of reviewData) {
    await BlogPost.create({
      ...review,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
