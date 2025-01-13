import mongoose from "mongoose";
import { MONGO_URI } from "./config";

/**
 * Connect to the database
 * @returns Promise<void>
 * @description Connect to the MongoDB database
 * @type Function
 */
export const db = async () =>
    // Connect to the database
    await mongoose.connect(MONGO_URI).then(() => {
        console.log('Connected to the database');
    }).catch((error) => {
        console.error('Error connecting to the database: ', error);
    });