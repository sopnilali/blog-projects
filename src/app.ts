import express, { Application, Request, Response } from 'express'
import router from './routes'
const app : Application = express()

app.use(express.json())


app.use('/api', router)


app.get('/', (req: Request, res: Response) => {
    res.json({
        status: true,
        message: 'Welcome to Blog Project API',
    })
})

export default app