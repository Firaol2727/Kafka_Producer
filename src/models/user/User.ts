import {Schema,model,connect} from "mongoose";
import { v4 as uuidv4 } from 'uuid';
export class User{
    id:string;
    fname:string;
    lname:string;
    email:string;
    role:string;
    picpath:string;
    password?:string;
    
    constructor(id:string,fname:string,lname:string,email:string,role:string,
        picpath:string,password?:string){
        this.id=id;
        this.fname=fname;
        this.lname=lname;
        this.email=email;
        this.role=role;
        this.picpath=picpath;
        this.password=password;
    }
}
const UserSchema=new Schema<User>({
    id:{
        type:String,
        unique:true,
        set:function () {
            return uuidv4();
        },
        primary: true,
    },
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:false
    },
    role:{
        type:String,
        required:false
    },
    picpath:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:true
    }

})
export const UserModel =model<User>("User",UserSchema);
