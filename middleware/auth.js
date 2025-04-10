const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const userModel = require('../models/userModel');
const adminModel = require('../models/AdminModel');
require('dotenv').config();

const verifyUser = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== "undefined"){
        const bearer = bearerHeader.split(" ")[1];
        req.token = bearer
        jwt.verify(bearer, process.env.SECRET_KEY, async (error, authData) =>{
            if(error){
                console.log("Invalid Token:", error);
                return res.status(403).json({msg: "Invalid Token"});
            } else {
                let id = authData.id;
                let userData = await userModel.findById(id).select("-password");
                req.user = userData;
                next();
            }
        });
    } else {
        return res.status(403).json({msg: "Taken Not Found!"});
    };
    
};

const verifyAdmin = async (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader !== "undefined"){
        const bearer = bearerHeader.split(" ")[1];
        req.token = bearer;
        jwt.verify(bearer, process.env.SECRET_KEY, async (error, authData) => {
            if(error){
                console.log("Invalid Token: ", error);
                return res.status(403).json({ msg: " Invalid Token!"});S
            } else {
                let id = authData.id;
                let adminData = await adminModel.findById(id).select("-password");
                req.admin = adminData;
                next();
            }
        })
    } else {
        return res.status(403).json({msg: "Token Not Found!"});
    };
};

const adminStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/admin");
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now()+ "-"+ file.originalname);
    }
});

const UploadAdmin = multer({storage: adminStorage});

const businessStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/businessProfile");
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now()+ "-"+ file.originalname);
    }
});

const UploadBusiness = multer({storage: businessStorage});

const employeeStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/employee");
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now()+ "-"+ file.originalname);
    }
});

const UploadEmployee = multer({storage: employeeStorage});

const serviceStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/service");
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now()+ "-"+ file.originalname);
    }
});

const UploadService = multer({storage: serviceStorage});

const subServiceStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/subService");
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now()+ "-"+ file.originalname);
    }
});

const UploadSubService = multer({storage: subServiceStorage});


module.exports = {
    verifyUser,
    verifyAdmin,
    UploadAdmin,
    UploadBusiness,
    UploadEmployee,
    UploadService,
    UploadSubService
};