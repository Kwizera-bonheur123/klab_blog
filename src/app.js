import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import bodyPaser from "body-parser";
import bodyParser from "body-parser";
import morgan from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";


// Routes

import blogRoutes from "./routes/blogRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();
dotenv.config()

// options

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API Documentation',
      version: '1.0.0',
      description: 'Documentation for your Node.js API using Swagger',
    },
    servers:[{
        url:"https://blog-6hj4.onrender.com/"
    }],
    security: [
      {
        BearerAuth: [],
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/Docs/*.js'], // Specify the path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

// swager configuration

// const options = {
//     swaggerDefinition: {
//       openapi: "3.0.1",
//       info: {
//         title: "Eagle Spirit Academy Documentation",
//         version: "1.0.0",
//         description: "Welcome to the Eagle Spirit Academy API",
//       },
//       components: {
//         securitySchemes: {
//           bearerAuth: {
//             type: "http",
//             scheme: "bearer",
//             name: "Authorization",
//             in: "header",
//             bearerFormat: "JWT",
//           },
//         },
//       },
//       security: [
//         {
//           bearerAuth: [],
//         },
//       ],
//       servers: [
//         {
//           url: "http://localhost:4500",
//         },
//       ],
//     },
//     apis: ["./src/docs/*.js"],
//   };
  
//   const specs = swaggerJSDoc(options);
  
  // configuration

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use("/Docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec))
app.use(express.json());


app.use("/api/blog", blogRoutes)
app.use("/api/user", userRoutes)

app.use("/", (req,res)=>{
    res.status(200).json({
        status: "Success",
        author: "k.dot",
        message: "hello you are welcomed "
    })

})



export default app