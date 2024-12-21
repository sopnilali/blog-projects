import express, { Application, Request, Response } from 'express'
import cookieParser from 'cookie-parser';
import router from './routes';

const app : Application = express()

app.use(express.json())
app.use(cookieParser())


// application routes
app.use('/api/', router);



// api route
app.get('/', (req: Request, res: Response) => {
    res.json({
        status: true,
        message: 'Welcome to Blog Project API',
    })
})


// app.use(globalErrorHandler);
//Not Found
// app.use(notFound)



export default app