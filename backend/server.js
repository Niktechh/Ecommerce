import expres from 'express'
import cors from "cors"
import "dotenv/config"
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRouter.js'
import productRouter from './routes/productRouter.js'
import cartRouter from './routes/cartRouter.js'
import orderRouter from './routes/orderRoute.js'

//App config
const app = expres()
const port = process.env.PORT || 4000
const allowedOrigins = [
  "https://ecommerce-six-gold-57.vercel.app",
  "https://dukkan-admin.vercel.app",
  "http://localhost:3000",
  "http://localhost:3001"
]
connectDB()
connectCloudinary()



//middleware
app.use(expres.json())
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

//api endpoints
app.use("/api/user", userRouter)
app.use("/api/product", productRouter)
app.use("/api/cart" , cartRouter)
app.use("/api/order" , orderRouter)

app.get("/", (req,res)=>{
    res.send("api working")
})

app.listen(port , ()=>console.log("app running in port "+ port))