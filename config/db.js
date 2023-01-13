const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://carlosramos:c4m10n33@cluster1.ouqghz1.mongodb.net/?retryWrites=true&w=majority", {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })

        console.log(`MongoDB connected :${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1);
    }
}

export default connectDB