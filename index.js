import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import UsersRouter from "./router/UsersRouter.js";
import ProductsRouter from "./router/ProductsRouter.js";
import AuthRoute from "./router/AuthRoute.js";
import UserModels from "./models/UserModels.js";
import ProductModel from "./models/ProductModel.js";

dotenv.config();
const port = process.env.PORT || 4000;
const app = express();

// (async () => {
//     await db.sync();
// })();

try {
    await db.authenticate();
    console.log("Database Connected...");
    await UserModels.sync();
    await ProductModel.sync();
} catch (error) {
    console.error(error);
}

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
    origin: ["http://localhost:3000"]
    // origin: ['http://localhost:3000', 'https://safaaat.github.io']
}));
app.use(express.json());
app.use(express.urlencoded());

app.use(UsersRouter);
app.use(ProductsRouter);
app.use(AuthRoute);


app.listen(port, () => { console.log(`Server Run ${port}`) })