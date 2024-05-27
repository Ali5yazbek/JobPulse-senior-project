"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sql = __importStar(require("mssql"));
const userRoute_1 = __importDefault(require("./controllers/userRoute"));
const companyRoute_1 = __importDefault(require("./controllers/companyRoute"));
const jobRoute_1 = __importDefault(require("./controllers/jobRoute"));
const skillRoute_1 = __importDefault(require("./controllers/skillRoute"));
const categoryRoute_1 = __importDefault(require("./controllers/categoryRoute"));
const applicationRoute_1 = __importDefault(require("./controllers/applicationRoute"));
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
// const config = require('./config')
// config;
const app = (0, express_1.default)();
app.use(bodyParser.json());
const port = 3000;
app.use(cors());
app.use(express_1.default.json());
app.use('/users', userRoute_1.default);
app.use('/companies', companyRoute_1.default);
app.use('/jobs', jobRoute_1.default);
app.use('/skill', skillRoute_1.default);
app.use('/category', categoryRoute_1.default);
app.use('/application', applicationRoute_1.default);
app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
const config = {
    user: 'sa',
    password: '123123123',
    server: 'DESKTOP-VFPP5K8\\SQLEXPRESS',
    database: 'jobTracker',
    port: 1433,
    options: {
        connectTimeout: 3000,
        trustServerCertificate: true,
    }
};
const connection = new sql.ConnectionPool(config);
connection.connect().then(() => {
    console.log('connected to sql server');
}).catch((err) => {
    console.error('error connecting to SQL Server:', err);
});
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
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});
