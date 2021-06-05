const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places, descriptors} = require('./seedhelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {useNewUrlParser: true,useCreateIndex:true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are connected!");
});

const sample = array=>array[Math.floor(Math.random()*array.length)];

const seedDb = async ()=>{
    await Campground.deleteMany({});
    for(let i=0;i<300;i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*100);
        const camp = new Campground({
            author:'60b329dec33ef73ac4b66d61',
            location:`${cities[random1000].city},${cities[random1000].state}`,
            title :`${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type:'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            image : [
                {
                    url: 'https://res.cloudinary.com/viveksingh/image/upload/v1622602871/YelpCamp/kusjh1ywqekpilgxz6vh.jpg',
                    filename: 'YelpCamp/kusjh1ywqekpilgxz6vh'
                },
                {
                    url: 'https://res.cloudinary.com/viveksingh/image/upload/v1622602873/YelpCamp/rrmjfjdciaj3df23irlm.jpg',
                    filename: 'YelpCamp/rrmjfjdciaj3df23irlm'
                }
            ],
            price: price,
            description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima necessitatibus eligendi possimus illum mollitia nam numquam? Non velit, in doloribus nulla quidem alias omnis a veniam ratione iusto vero. Ex.'
        })
        await camp.save();
    }
    
}
seedDb().then(()=>{
    mongoose.connection.close();
})