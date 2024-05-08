module.exports = {
  HOST: "invsys.chc3apgjzra1.us-east-1.rds.amazonaws.com",
  USER: "admin",
  PASSWORD: "adminadmin",
  DB: "invsys",
  dialect: "mysql",
  pool: {
    max: 8,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
