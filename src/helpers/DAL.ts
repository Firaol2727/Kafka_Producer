// export  abstract class DAL {
//     /**
//      * 
//      * @param query 
//      * @param includes 
//      * @param order 
//      * @returns 
//      */
//     static create(query:any,includes:any,order:any):Promise<any>{
//         return new Promise((resolve) => resolve([]));
//     };
//     /**
//      * 
//      * @param query 
//      * @param includes 
//      * @param order 
//      * @returns 
//      */
//     findOne(query:any,includes:any,order:any):Promise<any>{
//         return new Promise((resolve) => resolve([]));
//     };
//     /**
//      * 
//      * @param query 
//      * @param includes 
//      * @param order 
//      * @returns 
//      */
//     findMany(query:any,includes:any,order:any):Promise<any[]>{
//         return new Promise((resolve) => resolve([]));
//     };
//     /**
//      * 
//      * @param query 
//      * @param page 
//      * @param limit 
//      * @param includes 
//      * @param order 
//      * @returns 
//      */
//     findManyPaginate(query:any,page:number,limit:number,includes:any,order:any):Promise<any[]>{
//         return new Promise((resolve) => resolve([]));
//     };
//     /**
//      * 
//      * @param query 
//      * @returns 
//      */
//     count(query: any): Promise<number> {
//         return new Promise((resolve) => resolve(0));
//     }
//     /**
//      * 
//      * @param query 
//      * @param includes 
//      * @param order 
//      * @returns 
//      */
//     update(query:any,includes:any,order:any):Promise<any>{
//         return new Promise((resolve) => resolve([]));
//     };
//     /**
//      * 
//      * @param query 
//      * @param includes 
//      * @param order 
//      * @returns 
//      */
//     delete(query:any,includes:any,order:any):Promise<any>{
//         return new Promise((resolve) => resolve([]));
//     };
// } 