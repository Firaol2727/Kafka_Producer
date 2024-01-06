import bcrypt from 'bcrypt';
import config from 'config';
import jsonwebtoken from 'jsonwebtoken';
import { InternalServerError, NotFoundError, UnauthorizedError } from '../../error/error';
import { NextFunction, RequestParamHandler } from 'express';
import { Request,Response } from 'express';
import UserDal from '../../dals/user/User.dal';
import { User } from '../../models/user/User';
/**
 * Hash Password
 * 
 * @param {string} password
 * @param {string} saltRound
 */
export const hash = (password: string, saltRound: string) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRound, (error, hash) => {
            if (error) {
                reject(error.message);
            }
            else {
                resolve(hash);
            }
        });
    });
};

/**
 * Compare Password
 * 
 * @param {string} candidatePassword
 * @param {string} password
 */
export const comparePassword = (candidatePassword: string, password: string) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, password, (error, isMatch) => {
            if (error) {
                reject(error.message);
            }
            else {
                resolve(isMatch);
            }
        });
    });
};

/**
 * Generate JWT Access Token
 * 
 * @param {User}   user
 */
export const generateAccessToken = (id:string,role:string) => {
    return jsonwebtoken.sign({
        id:id,
        role:role
    },"HIDDEN_KEY", { 
        expiresIn: 60
    });    
};
/**
 * 
 */
export const hasPermission= (roles:string[])=>{
    return async (request:Request,response:Response,next:NextFunction)=>{
        console.log("Request User ",request.user);
       if(request.user){
            let user: any = request.user;
            if (roles && roles.length > 0 && roles.includes(user.role)) {
                next();
            }
            else if(!roles){
                next();
            }
            else {
                next(new UnauthorizedError("Permission Denied !"))
            }
       }else{
           next(new InternalServerError("Some thing went wrong "));
       }
    }
}

/**
 * 
 */
export const AuthenticateUser=(request:Request,response:Response,next:Function)=>{
        let data=request.body;
        let {username,password}=request.body;
        console.log("FNAME " +username +" passs  "+password)
        if(!username || !password){
            response.sendStatus(404).send("Username and Password required")
        }
        UserDal.findOne({fname:username,password:password},null,null)
            .then((user: User) => {
                if (user) {
                    const token = generateAccessToken(user.id,user.role);
                    const decoded = jsonwebtoken.verify(token,'HIDDEN_KEY');
                    console.log("decoded ",decoded)
                let userr ={
                    user:user,
                    token:token
                }
                    response.status(200).send(userr);       
                }
                else {
                    console.log("No user ")
                    next(new NotFoundError("USERNAME OR PASSWORD ERROR"))
                }
            })
            .catch((error: any) => {
                next(error)
            });
}
export const CheckAuthorization=(request:Request,response:Response,next:Function)=>{
    console.log("Header",request.headers)
    let token:string =request.headers.authorization || "" ;
   
    if (!token) {
        return response.status(401).json({ message: 'No token provided' });
      }
      try {
        // Verify the token using the secret or public key
        token=token.split(" ")[1];
        console.log("token = ",token)
        const decoded = jsonwebtoken.verify(token,'HIDDEN_KEY');
        console.log("decoded ",decoded)
        // Attach the decoded payload to the request for further use
        request.user = decoded;
    
        // Proceed to the next middleware or route handler
        next();
      } catch (error) {
        // If the token is invalid or expired, return an error
        response.status(401).json({ message: 'Invalid token', error:error });
      }
}