'use server'
import bcrypt from "bcrypt"

import dbConnect, { collectionName } from "../../../lib/dbConnect";

export const loginUser = async (payload) => {
    const { email, password } = payload;
    const usersCollection = dbConnect(collectionName.users);
    const user = await usersCollection.findOne({ email })
    if (!user) return null;
    // console.log(user.email);

    // Check password from DB
    const isPasswordOK = await bcrypt.compare(password, user.password);
    if (!isPasswordOK) return null;
    return user;
}