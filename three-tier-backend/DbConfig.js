module.exports = {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PWD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_NAME
};

console.log("🔍 DB CONFIG =>", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  db: process.env.DB_NAME
});
