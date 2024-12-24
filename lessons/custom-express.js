const dotenv = require('dotenv');
const Application = require('./framework/Application');
const userRouter = require('./framework/src/user-router');
const jsonParser = require('./framework/parse-json');
const urlParser = require('./framework/parse-url');
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = new Application();

app.use(jsonParser);
app.use(urlParser('http://localhost:' + PORT));
app.addRouter(userRouter);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
