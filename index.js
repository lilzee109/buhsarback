import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import UsersRouter from "./router/UsersRouter.js";
import ProductsRouter from "./router/ProductsRouter.js";
import AuthRoute from "./router/AuthRoute.js";

dotenv.config();
const port = process.env.PORT || 4000;
const app = express();

(async () => {
    await db.sync();
})();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: "auto",
        httpOnly: true
    }
}))
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'https://safaaat.github.io']
}));
app.use(express.json());
app.use(UsersRouter);
app.use(ProductsRouter);
app.use(AuthRoute);


app.listen(port, () => { console.log(`Server Run ${port}`) })