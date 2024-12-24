const users = [
  { id: 1, name: 'John', email: 'john@example.com' },
  { id: 2, name: 'Kate', email: 'kate@example.com' },
];

const getUsers = (req, res) => {
  if (req.params.id) {
    return res.send(users.find(({ id }) => id == req.params.id));
  }
  res.send(users);
};

const createUser = (req, res) => {
  const user = req.body;
  users.push(user);
  res.send(user);
};

module.exports = {
  getUsers,
  createUser
}
