import express from 'express'
const app = express();

const port = process.env.PORT || 4100;
import 'dotenv/config'
import { router } from './src/routers/router.js';



app
   .set('view engine', '.ejs')
   .set('views', './views')
   .use(express.static('public'))
   .use(router)

   .listen(port, () => {
    console.log(`Server launched on ${port} 🚀`)
})


// wiki es 5 /6