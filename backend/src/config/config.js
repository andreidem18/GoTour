require('dotenv').config();

module.exports = {
  "development": {
    use_env_variable: "DATABASE_URL",
    dialect: "postgre",
    dialectOptions: {
      decimalNumbers: true,
    },
  },
  "test": {
    use_env_variable: "DATABASE_URL",
    dialect: "postgre",
    dialectOptions: {
      decimalNumbers: true,
    },
  },
  "production": {
    use_env_variable: "DATABASE_URL",
    dialect: "postgre",
    dialectOptions: {
      decimalNumbers: true,
    },
  }
}