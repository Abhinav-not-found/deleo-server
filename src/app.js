import express from "express";
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

import ENV from './lib/env.js'
import authRoute from './routes/user.route.js'

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors({
  origin: ENV.CLIENT_URL,
  credentials: true
}));

app.get("/check", (req, res) => {
  res.send("API running");
});

app.use('/api/auth/', authRoute)

app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error"
  })
})


export default app;
