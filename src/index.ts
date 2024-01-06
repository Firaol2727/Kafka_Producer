import express,{Application, Request,Response} from 'express';
import { InitializeDatabase } from './helpers/database';
import bodyParser from 'body-parser';
import morganBody from 'morgan-body';
import morgan from "morgan";
import responseTime from "response-time";
import UserRouter from "./routes/user/User.router";
import Prometheus from "prom-client";
import passport from 'passport';
import { subscribeToKafka,publishToKafka,ConnectAndInstantiateProducerAndConsumer } from './helpers/Kafka.helper';
import session from 'express-session';
import UserDal from './dals/user/User.dal';
import { User,UserModel } from './models/user/User';
import cookieParser from 'cookie-parser';
import { AuthenticateUser, CheckAuthorization } from './helpers/security/security';


const app:Application = express();
const port = 3001;


/**
 * Passport Initialization
 */

app.use(session({secret:"THIS_IS_THE_SECERT_KEY",resave:false,saveUninitialized:false}))
// app.use(passport.initialize({compat:true}));
// app.use(passport.session());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));


// passport.use(PassportLocalStrategy);
// passport.use(PassportLocalStrategy);
// passport.use(PassportJWTStrategy);

// passport.serializeUser((error:any,user:any, done: Function) => {
//   console.log("Serializing User  -------------        ----------     ");
//   console.log("Err",error)
//   done(null, user);
// });

// passport.deserializeUser((id: string, done: Function) => {
//   console.log("Deserializing user ========         ============     = ")
//   UserDal.findOne({id:id},null,null)
//     .then((user: User) => done(null, user))
//     .catch((error: any) => done(error));
// });

app.use(morgan("combined"));

/**
 * Morgan Body Logger
 */
morganBody(app, { maxBodyLength: 1000000 });
/**
 * Tracking Response Time
 */
const PrometheusMetric = {
  requestCounter: new Prometheus.Counter({
    name: "throughput",
    help: "Number of requests served.",
  }),
  responseTimeSummary: new Prometheus.Summary({
    name: "response_time",
    help: "Latency in Percentiles.",
  }),
  responseTimeHistogram: new Prometheus.Histogram({
    name: "response_time_histogram",
    help: "Latency in Histogram.",
    buckets: [0.1, 0.25, 0.5, 1, 2.5, 5, 10],
  }),
};

/**
 * Request Counter
 */
app.use((request, response, next) => {
  PrometheusMetric.requestCounter.inc();
  next();
});
/**
 * Response Time
 */
app.use(
  responseTime((request, response, time) => {
    PrometheusMetric.responseTimeSummary.observe(time);
    PrometheusMetric.responseTimeHistogram.observe(time);
  })
);
InitializeDatabase();
ConnectAndInstantiateProducerAndConsumer();

app.use("/user",UserRouter);
app.get("/t",(req,res)=>{
  res.send("tttttt")
})
app.post('/checkjwt',
  CheckAuthorization,
 (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

app.use((error: any, request: Request, response: Response, next: Function) => {
  // logger.error(error);
  console.log(" Error",error)
  if (error  instanceof Error) {
      response.status(401).send(error);
  } 
  else if(error.statusCode){
    response.status(error.statusCode).send(error.payload);
  }
  else {
    response.status(500).json({
      timestamp: new Date(),
      errors: "Internal Server Error",
    });
  }
});
