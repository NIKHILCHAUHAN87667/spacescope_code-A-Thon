import express from 'express';
import { ENV } from "./lib/env.js";
import dotenv from 'dotenv';


import cors from 'cors';
import { connectDB } from "./lib/db.js";
import missionRoutes from './routes/mission.routes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('SpaceScope Backend Running');
});

app.use('/api/missions', missionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
