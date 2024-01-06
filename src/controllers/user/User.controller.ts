import express, { Router ,Request,Response} from "express";
import { UserService } from "../../services/user/User.service";
import { User } from "../../models/user/User";
import passport from "passport";
import UserDal from "../../dals/user/User.dal";
import { generateAccessToken } from "../../helpers/security/security";
import { InternalServerError, UnauthorizedError } from "../../error/error";
import { publishToKafka } from "../../helpers/Kafka.helper";

export default class AdminController{
    static login(request:Request,response:Response,next:Function){
        console.log("request body ",request.body)
        const data=request.body;
        if (data) {
            console.log("THERE IS DATA   --          -----------------              -----------")
            // passport.authenticate("local",{session:false}),
            //     (req:Request, res:Response) => {
            //     response.send('Hello World!');
            //     }
        } else {
            next("invalid input")
        }
            
    }
    static create(request:Request,response:Response,next:Function){
        console.log("request body ",request.body)
        const data=request.body;
        if (request.body) {
            console.log("There is data ")
            UserService.createAdmin(request.body)
            .then((data:User)=>{
                console.log(data);
                response.json(data)
            })
            .catch((error:any)=>{
                next(error)
            })
          } else {
            next("Invalid input");
          }
            
    }
    static createBuyer(request:Request,response:Response,next:Function){
        console.log("request body ",request.body)
        const data=request.body;
        if (request.body) {
            console.log("There is data ")
            UserService.createBuyer(request.body)
            .then((data:User)=>{
                console.log(data);
                response.json(data)
            })
            .catch((error:any)=>{
                next(error)
            })
          } else {
            next("Invalid input");
          }
            
    }
    static createSeller(request:Request,response:Response,next:Function){
        console.log("request body ",request.body)
        const data=request.body;
        if (request.body) {
            console.log("There is data ")
            UserService.createSeller(request.body)
            .then((data:User)=>{
                console.log(data);
                response.json(data)
            })
            .catch((error:any)=>{
                next(error)
            })
          } else {
            next("Invalid input");
          }
            
    }
    static async createProduct(request:Request,response:Response,next:Function){
        let user:any=request.user;
        const product={
            id:"",
            name:request.body.name,
            price:request.body.price,
            category:request.body.category,
            seller_id:user.id
        }
        await publishToKafka("product-topic",JSON.stringify({
            casse:"product",
            body:product
        }))
        response.send(200);
    }
    static findOne(request:Request,response:Response,next:Function){
        console.log("request body ",request.body)
        const data=request.body;
        if (data) {

            UserService.findOne(request.body)
            .then((data:User)=>{
                console.log(data);
                response.json(data)
            })
            .catch((error:any)=>{
                next(error)
            })
        } else {
            next("invalid input")
        }
            
    }
    static findMany(request:Request,response:Response,next:Function){
        UserService.findMany(request.body)
        .then((data:User[])=>{
            console.log(data);
            response.json(data)
        })
        .catch((error:any)=>{
            next(error)
        })
    }
    static update(request:Request,response:Response,next:Function){
        console.log("Request Body ",request.body);
        const data=request.body;
        if (data) {
            UserService.update(request.params.id,data)
            .then((data)=>{
                response.json(data);
            })
            .catch((err)=>{
                next(err);
            })
        }
        else{
            next("Invalid input");
        }
    }
    static delete(request:Request,response:Response,next:Function){
        console.log("Request Body ",request.body);
        const data=request.body.id;
        if (data) {
            UserService.delete(request.body.id)
            .then((data)=>{
                response.json(data);
            })
            .catch((err)=>{
                next(err);
            })
        }
        else{
            next("Invalid input");
        }
    }
}