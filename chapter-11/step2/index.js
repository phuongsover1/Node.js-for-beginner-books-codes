import { app } from './server.js'
import mongoose from 'mongoose';

const PORT = process.env.PORT
try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MoongoDB')
  
  app.listen(PORT, () => {
    console.log(`Running in http://localhost:${PORT}`)
  })
} catch (error) {
  console.error(error);
  
}

