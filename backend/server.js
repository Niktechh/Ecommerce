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
connectDB()
connectCloudinary()



//middleware
app.use(expres.json())
app.use(cors({
  origin: process.env.FRONTEND_URL
}));

//api endpoints
app.use("/api/user", userRouter)
app.use("/api/product", productRouter)
app.use("/api/cart" , cartRouter)
app.use("/api/order" , orderRouter)

app.get("/", (req,res)=>{
    res.send("api working")
})

app.listen(port , ()=>console.log("app running in port "+ port))