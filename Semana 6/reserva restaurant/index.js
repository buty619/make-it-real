const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/restaurantApp', { useNewUrlParser: true });
mongoose.connection.on("error", function(e) { console.error(e); });

var restaurant = mongoose.Schema({
    _Id: String,
    restaurantName: String,
    direction: String,
    categories: [String],
    pictures: [String],
    reserve:[String]
});

var reserve = mongoose.Schema({
    _Id: String,
    date: Date,
    state: String,
    Nperson: Number,
    clientInfo:[String],
    comments:[String]
});

var client = mongoose.Schema({
    _Id: String,
    eMail: String,
    password: String,
});

var comments = mongoose.Schema({
    _Id: String,
    comments: String,
    ranking: Number,
});

const RestaurantApp = mongoose.model("RestaurantApp",restaurant);
