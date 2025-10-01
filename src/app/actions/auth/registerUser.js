"use server";
import dbConnect, { collectionName } from "@/lib/dbConnect";
import bcrypt from 'bcrypt';

export const registerUser = async (payload) => {
    try {
        const { name, email, password } = payload;
        console.log("Registration attempt:", { name, email });

        // Basic validation
        if (!name || !email || !password) {
            return {
                success: false,
                message: "Name, email, and password are required."
            };
        }

        // Database connection - corrected approach
       
        const db = await dbConnect();
        const usersCollection = db.collection(collectionName.users);

        // Check if user already exists
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return {
                success: false,
                message: "User with this email already exists."
            };
        }

        // Create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const userData = {
            name,
            email,
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await usersCollection.insertOne(userData);

        if (result.insertedId) {
            return {
                success: true,
                message: "User registered successfully.",
                userId: result.insertedId.toString()
            };
        } else {
            return {
                success: false,
                message: "Failed to register user."
            };
        }
    } catch (error) {
        console.error("Error in registerUser:", error.message);
        return {
            success: false,
            message: error.message || "An error occurred while registering the user.",
        };
    }
};