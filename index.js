const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Function to handle user login
async function loginUser(username, password) {
    await client.connect();
    const database = client.db('smogus');
    const users = database.collection('users');

    const user = await users.findOne({ username: username });
    if (user && user.password === password) {
        return { success: true, message: "Login successful" };
    }
    return { success: false, message: "Invalid credentials" };
}

// Function to handle user signup
async function signupUser(username, password) {
    await client.connect();
    const database = client.db('smogus');
    const users = database.collection('users');

    const existingUser = await users.findOne({ username: username });
    if (existingUser) {
        return { success: false, message: "User already exists" };
    }

    await users.insertOne({ username: username, password: password });
    return { success: true, message: "Signup successful" };
}

// Function to estimate CO2 emissions by city
async function estimateCO2ByCity(city) {
    const response = await axios.get(`https://api.opendata.group/co2/${city}`);
    if (response.data) {
        return { success: true, data: response.data };
    }
    return { success: false, message: "Data not found" };
}


