import express from 'express';
import cors from 'cors';
import apiRoutes from './api';

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

app.use(apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});