"use server";
import dbConnect, { collectionName } from "@/lib/dbConnect";
import bcrypt from 'bcrypt'

export const registerUser = async (payload) => {
    try {
        const { name, email, password } = payload;
        console.log(name, email, password);

        // Basic validation
        if (!name || !email || !password) {
            throw new Error("Name, email, and password are required.");
        }

        const usersCollection = dbConnect(collectionName.users);

        // Check if user already exists
        const existingUser = await usersCollection.findOne({ email });

        if (existingUser) {
            throw new Error("User with this email already exists.");
        }

        // Create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        payload.password = hashedPassword
        const result = await usersCollection.insertOne(payload);

        if (result.insertedId) {
            return {
                success: true,
                message: "User registered successfully.",
                userId: result.insertedId.toString()
            };
        } else {
            throw new Error("Failed to register user.");
        }
    } catch (error) {
        console.error("Error in registerUser:", error.message);

        return {
            success: false,
            message: error.message || "An error occurred while registering the user.",
        };
    }
};