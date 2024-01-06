
import mongoose,{Document} from 'mongoose';
import config from 'config';
export  const InitializeDatabase=async()=>{
    mongoose.connect(
        // "mongodb+srv://fraolgetachew2727:test@cluster0.beagzat.mongodb.net/?retryWrites=true&w=majority",
        "mongodb://127.0.0.1:27017/Products"
        ) 
    .then(()=>{
      console.log("Connection was successful ") 
       
    }).catch((error)=>{
        console.log("ERROR OCCUR WHILE CONNECTING TO THE DATABASE  "+error)
    })
}
