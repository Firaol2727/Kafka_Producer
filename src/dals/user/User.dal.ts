import { PageAdapter } from "../../helpers/PageAdapter";
import { UserModel,User } from "../../models/user/User";
import { Document } from "mongoose";
export default class UserDal{
    /**
     * 
     * @param product_id 
     * @param user_id 
     * @returns 
     */
    static create(
        fname:string,
        lname:string,
        email:string,
        picpath:string,
        role:string,
        password:string
        ):Promise<User>{
        return new Promise((resolve,reject)=>{
            UserModel.create({
                id:"",
                fname:fname,
                lname:lname,
                email:email,
                role:role,
                picpath:picpath,
                password:password
            })
          .then((data:Document)=>{  
            const  user=new User(
                data.get("id"),data.get("fname"),
                data.get("lname"),data.get("email"),data.get("type"),
                data.get("picpath")
            )
            resolve(user);
          })
          .catch((error:Error)=>{
            reject(error);
          }) 
        })
          
    };
    /**
     * 
     * @param query 
     * @param includes 
     * @param order 
     * @returns 
     */
    static findOne(query:any,includes:any,order:any):Promise<User>{
        return new Promise((resolve,reject) =>{
            UserModel.findOne(query)
            .exec()
            .then(data=>{
                resolve(data as User)
            })
            .catch((err)=>{
                reject(err)
            })
        } );
    };
    /**
     * 
     * @param query 
     * @param includes 
     * @param order 
     * @returns 
     */
    static findMany(query: any, includes: any, order: any): Promise<User[]> {
        return new Promise((resolve,reject) =>{
            UserModel.find(query)
            .exec()
            .then(data=>{
                resolve(data as User[])
            })
            .catch((err)=>{
                reject(err)
            })
        } );
    }
    /**
     * 
     * @param query 
     * @param page 
     * @param limit 
     * @param includes 
     * @param order 
     * @returns 
     */
    static findManyPaginate(query: any, page: number, limit: number, includes: any, order: any): Promise<PageAdapter> {
        const skip = (page - 1) * limit;
        return new Promise((resolve,reject) =>{
            UserModel.find(query)
            .skip(skip)
            .limit(limit)
            .exec()
            .then(data=>{
                resolve({
                    page:page,
                    limit:limit,
                    data:data as User[]
                })
            })
            .catch((err)=>{
                reject(err)
            })
        } );
    }
    /**
     * 
     * @param query 
     * @returns 
     */
    static count(query: any): Promise<number> {
        return new Promise((resolve,reject) =>{
            UserModel.countDocuments(query)
            .exec()
            .then((data)=>{
                resolve(data)
            })
            .catch((err)=>{
                reject(err)
            })
        } );
    }
    /**
     * 
     * @param query 
     * @param includes 
     * @param order 
     * @returns 
     */
    static update(id:String,query: any): Promise<any> {
        return new Promise((resolve,reject) =>{
            UserModel.findOneAndUpdate({id:id},query,{new:true})
            .exec()
            .then(data=>{
                resolve(data)
            })
            .catch((err)=>{
                reject(err)
            })
        } );
    }
    /**
     * 
     * @param query 
     * @param includes 
     * @param order 
     */
    static delete(id:string): Promise<any> {
        return new Promise((resolve,reject)=>{
            UserModel.findByIdAndDelete(id)
            .then((data)=>{
                resolve(1);
            })
            .catch((err)=>{
                reject(err);
            })
        })
    }
    
}