import { app } from './server.js'
import 'dotenv/config'

const port = 3000

app.listen(port, () => {
  console.log(`Running in http://localhost:${port}`)
  // console.log(process.env.MY_SECRET)
  console.log(process.env.MY_SECRET_VALUE)
})
