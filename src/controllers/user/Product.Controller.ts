import express, { Router ,Request,Response} from "express";
import { UserService } from "../../services/user/User.service";
import { User } from "../../models/user/User";
import passport from "passport";
import UserDal from "../../dals/user/User.dal";
import { generateAccessToken } from "../../helpers/security/security";
import { InternalServerError, UnauthorizedError } from "../../error/error";
import { publishToKafka } from "../../helpers/Kafka.helper";

export default class ProductController{
    static async create(request:Request,response:Response,next:Function){
        console.log("request body ",request.body)
        const data=request.body;
        if (request.body) {
            console.log("There is data ")
            await publishToKafka("product",request.body)
            response.send(200);
          } else {
            next("Invalid input");
          }
            
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