const Router = require('../Router');
const { getUsers, createUser } = require('./user-controller');

const router = new Router();

router.get('/users', getUsers);

router.post('/users', createUser);

module.exports = router;
