const { Sequelize } = require('sequelize');
require('dotenv').config({ path: './src/.env' });

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'src/config/fastFoodOrderingSystem.sqlite', // Đường dẫn tới tệp SQLite của bạn
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

sequelize.sync() // Đặt `force: true` nếu muốn xóa và tạo lại bảng mỗi lần chạy
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((err) => {
    console.error('Unable to sync database:', err);
  });

module.exports = sequelize;