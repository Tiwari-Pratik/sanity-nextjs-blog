import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://mohit:picachhoo@cluster0.pbdmdok.mongodb.net/auth?retryWrites=true&w=majority"
  );
  return client;
};
