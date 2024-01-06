import express, { NextFunction, Router, request } from 'express';
import UserController from '../../controllers/user/User.controller';
import passport from 'passport';

import {Application, Request,Response} from 'express';
import { AuthenticateUser, CheckAuthorization, hasPermission } from '../../helpers/security/security';

let router: Router = express.Router();
router
    .post("/login",
    AuthenticateUser
    )
    .post("/create/admin",
        UserController.create)
    .post("/create/seller",
        CheckAuthorization,
        hasPermission(["admin"]),
            UserController.createSeller)
    .post("/create/buyer",

        UserController.createBuyer)
    .post("/create/product",
        CheckAuthorization,
        hasPermission(["seller"]),
        UserController.createProduct
    )
    .post("/findOne/:id",UserController.findOne)
    .post("/findMany",UserController.findMany)
    .post("/detail/:id",UserController.findOne)
    .post("/delete",UserController.delete)
    .put("/update",UserController.update);
export default router;