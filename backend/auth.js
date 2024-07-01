const users = require('./users');

function authenticate(username, password) {
  const user = users.find(u => u.username === username && u.password === password);
  return user ? user : null;
}

module.exports = {
  authenticate
};
