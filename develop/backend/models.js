import mongoose from 'mongoose';

// define the User model schema
const GamesSchema = new mongoose.Schema({
    title: String,
    cover: String
});
export default mongoose.model( 'Games', GamesSchema );