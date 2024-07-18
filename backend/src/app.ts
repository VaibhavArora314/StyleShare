import express, { NextFunction, Request, Response } from "express";
import rootRouter from "./routes";
import bodyParser from "body-parser";
import cors from "cors";
import path from 'path';
import { config } from "dotenv";
config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.redirect('/app');
});

app.use('/app', express.static(path.join(__dirname, '../../frontend/dist'), {maxAge: 0}));
app.get('/app/*', (req: Request, res: Response) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
});

app.get('/config', (req: Request, res: Response) => {
  res.json({
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
    measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
  });
});


app.use('/admin', express.static(path.join(__dirname, '../../admin/dist'), {maxAge: 0}));
app.get('/admin/*', (req: Request, res: Response) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.sendFile(path.join(__dirname, '../../admin/dist', 'index.html'));
});

app.use("/api/v1", rootRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

export default app;