import UserDal from '../../dals/user/User.dal'
import { User } from '../../models/user/User';

export class UserService{
    static createAdmin(query:any):Promise<User>{
        return new Promise((resolve,reject)=>{
            UserDal.create(query.fname,query.lname,query.email,query.picpath,"admin",query.password)
            .then((admin:User)=>{
                resolve(admin)
            })
            .catch((error:Error)=>{
                reject(error);
            })
        })
    }
    static createSeller(query:any):Promise<User>{
        return new Promise((resolve,reject)=>{
            UserDal.create(query.fname,query.lname,query.email,query.picpath,"seller",query.password)
            .then((admin:User)=>{
                resolve(admin)
            })
            .catch((error:Error)=>{
                reject(error);
            })
        })
    }
    static createBuyer(query:any):Promise<User>{
        return new Promise((resolve,reject)=>{
            UserDal.create(query.fname,query.lname,query.email,query.picpath,"buyer",query.password)
            .then((admin:User)=>{
                resolve(admin)
            })
            .catch((error:Error)=>{
                reject(error);
            })
        })
    }
    static findOne(query:any):Promise<User>{
        return new Promise((resolve,reject)=>{
            UserDal.findOne(query,null,null)
            .then((admin:User)=>{
                resolve(admin)
            })
            .catch((error:Error)=>{
                reject(error);
            })
        })
    }
    static findMany(query:any):Promise<User[]>{
        return new Promise((resolve,reject)=>{
            UserDal.findMany(query,null,null)
            .then((admin:User[])=>{
                resolve(admin)
            })
            .catch((error:Error)=>{
                reject(error);
            })
        })
    }
    static update(id:string,query:any):Promise<User>{
        return new Promise((resolve,reject)=>{
            UserDal.update(id,query)
            .then((admin:User)=>{
                resolve(admin)
            })
            .catch((error:Error)=>{
                reject(error);
            })
        })
    }
    static delete(id:string):Promise<User>{
        return new Promise((resolve,reject)=>{
            UserDal.delete(id)
            .then((admin:User)=>{
                resolve(admin)
            })
            .catch((error:Error)=>{
                reject(error);
            })
        })
    }
}