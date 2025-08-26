import e from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
config();

const app = e();
const port = process.env.PORT || 3500;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGODB_URL = process.env.MONGODB_URL;

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cookieParser());
app.use(e.json());
app.use(e.urlencoded({ extended: true }));

app.use(e.static(path.join(__dirname, "box")));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://con-react-vallezehs-projects.vercel.app",
    ],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "box", "index.html"));
});

app.use("/user", userRoutes);
app.use("/product", productRoutes);

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});

// import e from "express";
// import mongoose from "mongoose";
// import path from "path";
// import { fileURLToPath } from "url";
// import userRoutes from "./routes/userRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// // import postRoutes from "./routes/postRoutes.js";
// // import comRoutes from "./routes/comRoutes.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import { config } from "dotenv";
// config();

// const app = e();
// const port = process.env.PORT || 3500;
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const MONGODB_URL = process.env.MONGODB_URL;

// mongoose
//   .connect(MONGODB_URL)
//   .then(() => console.log("MongoDB connected successfully"))
//   .catch((err) => console.error("MongoDB connection error:", err));
// app.use(cookieParser());

// app.use(e.json());
// app.use(e.urlencoded({ extended: true }));

// app.use(e.static("./box"));

// // app.use(
// //   cors({
// //     origin: [
// //       "http://localhost:5173",
// //       "https://con-react-vallezehs-projects.vercel.app",
// //     ],
// //     credentials: true,
// //   })
// // );

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "box", "index.html"));
// });

// app.use("/user", userRoutes);

// app.use("/product", productRoutes);

// // app.use("/comment", comRoutes);

// app.listen(port, () => {
//   console.log(`server is runninng on port : ${port}`);
//   // console.log("server is running on port " + port)
// });
