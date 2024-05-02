import mongoose from "mongoose"

const connectionString = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@linked-in-v1.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000`

if (!connectionString){
    throw new Error("Please Provide a valid connection string ")
}

const connectDB = async() => {
    if (mongoose.connection?.readyState >= 1){
        return;
    }
    try {
        await mongoose.connect(connectionString);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        // Optionally rethrow the error or handle it as needed
        throw error;
    }
}


