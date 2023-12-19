require("dotenv").config();

export default {
    dbName: process.env.MONGO_DATABASE_NAME,
    dbPass: process.env.MONGO_PASSWORD,
    accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
    accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
};
