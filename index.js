import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import router from './config/router.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// ! Middleware
// helper for fetching the body of requests
const app = express()

//Middleware
app.use(express.json())

// incoming request logger
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`)
  next()
})

// Endpoints 
app.use('/api', router)

app.use(express.static(path.join(__dirname, 'client', 'dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

// Start servers
async function startServer(){
  try {
    await mongoose.connect(process.env.CONNECTION_STRING)
    console.log(' ✅ Database connection established')
    app.listen(process.env.PORT, () => console.log(` 🚀 Server up and running on port ${process.env.PORT}`))
  } catch (error) {
    console.log('Error establishing connection')
    console.log(error)
  }
}
startServer()