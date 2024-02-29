import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLength: [3, "Name must contain at least three characters"],
        maxLength: [32, "Name must be at most 32 characters"]
    },
    phone:{
        type: String,
        required: true,
    },
    avatar:{
        public_id:{
            type: String,
            required: true,
        },
        url:{
            type: String,
            required: true,
        },
    },
    email:{
        type: String,
        required: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    education:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
        enum: ['Reader', 'Author']
    },
    password:{
        type: String,
        required: true,
        minLength: [8, "Password must contain at least 8 characters"],
        maxLength: [32, "Password must be at most 32 characters"],
        select: false,
    },
    createdOn:{
        type: Date,
        default: Date.now,
    }
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getJWTToken = function () {
    const expiresIn = process.env.JWT_EXPIRES; // Ensure JWT_EXPIRES is correctly retrieved
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: expiresIn, // Pass expiresIn to jwt.sign
    });
};

export const User = mongoose.model('User', userSchema);
