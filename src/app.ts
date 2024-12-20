import express, { Application, ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import router from './routes'
const app : Application = express()

app.use(express.json())


app.use('/api', router)


app.get('/', (req: Request, res: Response) => {
    res.send({
      status: true,
      message: 'Welcome to the Blog Project API! ⚡',
    })
  })

// error handling middleware start

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Could not found ${req.url}`)
    res.status(404)
    res.json({
      status: false,
      message: error.message,
      stack: error.stack,
    })
    next(error)
  })
  
  app.use(
    (
      err: ErrorRequestHandler,
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      res.status(500).json({
        status: false,
        message: 'Internal Server Error',
      })
      next(err)
    }
  )
  // error handling middleware end

export default app