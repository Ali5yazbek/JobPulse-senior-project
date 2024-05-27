import express, { Request, Response } from 'express';
import * as sql from 'mssql'
import routerUser from './controllers/userRoute';
import routerCompany from './controllers/companyRoute';
import routerJob from './controllers/jobRoute';
import routerSkills from './controllers/skillRoute';
import routerCategory from './controllers/categoryRoute';
import routerApp from './controllers/applicationRoute';

const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const cors = require('cors')


// const config = require('./config')
// config;
const app = express();
app.use(bodyParser.json())
const port = 3000;
app.use(cors())
app.use(express.json());
app.use('/users',routerUser);
app.use('/companies',routerCompany);
app.use('/jobs',routerJob);
app.use('/skill',routerSkills);
app.use('/category',routerCategory);
app.use('/application',routerApp);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const config: sql.config={
  user: 'sa',
  password: '123123123',
  server:'DESKTOP-VFPP5K8\\SQLEXPRESS',
  database:'jobTracker',
  port:1433,
 
 options: {
   
   connectTimeout: 3000,
   trustServerCertificate: true,
 }
 };
 
 const connection = new sql.ConnectionPool(config);
 connection.connect().then( ()=>{
 console.log('connected to sql server');
 }).catch( (err: any) =>{
   console.error('error connecting to SQL Server:', err)
 })


 const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "jobTracker19@gmail.com",
    pass: "jjnu teto qkac gjcz",
  },
});
 app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: 'jobTracker19@gmail.com',
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error:any, info:any) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});