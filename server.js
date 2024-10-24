import express from 'express';
import db from './config/connection.js';
import routes from './routes/index.js';
import User from './models/User.js';  // Importing models to test
import Thought from './models/Thought.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

db.once('open', async () => {
  console.log('Connected to MongoDB!');

  // Drop the users collection (this deletes all users)
  try {
    await db.dropCollection('users');
    console.log('Users collection dropped');
  } catch (error) {
    // Catch the error if the collection doesn't exist
    console.log('No users collection to drop or error dropping collection', error.message);
  }

  // Now create a new test user
  try {
    const userTest = await User.create({ username: 'testuser', email: 'testuser@email.com' });
    console.log('User created:', userTest);
  } catch (error) {
    console.log('Error creating user:', error.message);
  }

  // Start the API server
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
