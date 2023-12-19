require("dotenv").config();

export default {
    port: 8000,
    accesTokenExpiresIn: 15,
    origin: "http://localhost:3000",
    mongoUrl: process.env.MONGO_URL,
    dbName: process.env.MONGO_DATABASE_NAME,
    dbPass: process.env.MONGO_PASSWORD,
    accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
    accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
};
