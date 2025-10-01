'use server'
import bcrypt from "bcrypt"
import dbConnect, { collectionName } from "../../../lib/dbConnect";

export const loginUser = async (payload) => {
    try {
        console.log("Login attempt started for email:", payload.email);
        
        const { email, password } = payload;
        
        // Validate input
        if (!email || !password) {
            console.error("Email or password missing");
            return { 
                success: false, 
                message: "Email and password are required" 
            };
        }

        console.log("Attempting database connection...");
        
        // Database connection - CORRECT THIS PART
        // Your current approach is wrong. dbConnect likely returns a promise
        const connection = await dbConnect();
        console.log("Connection object:", connection);
        
        // Adjust based on what dbConnect actually returns
        let usersCollection;
        if (connection.db) {
            // If it returns { db, client } object
            usersCollection = connection.db.collection(collectionName.users);
        } else if (connection.collection) {
            // If it returns collection directly
            usersCollection = connection;
        } else {
            // If it returns the database instance
            usersCollection = connection.collection(collectionName.users);
        }

        console.log("Looking for user with email:", email);
        
        // Find user
        const user = await usersCollection.findOne({ email });
        console.log("User found:", user ? "Yes" : "No");

        if (!user) {
            console.error("No user found with email:", email);
            return { 
                success: false, 
                message: "Invalid email or password" 
            };
        }

        console.log("User found, checking password...");
        
        // Check password
        const isPasswordOK = await bcrypt.compare(password, user.password);
        console.log("Password match:", isPasswordOK);

        if (!isPasswordOK) {
            console.error("Password incorrect for user:", email);
            return { 
                success: false, 
                message: "Invalid email or password" 
            };
        }

        console.log("Login successful for user:", email);
        
        // Return user data without password
        const { password: _, ...userWithoutPassword } = user;
        return {
            success: true,
            user: userWithoutPassword,
            message: "Login successful"
        };

    } catch (error) {
        console.error("Login error details:", {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        
        return {
            success: false,
            message: "Login failed. Please try again later."
        };
    }
}