const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config({ path: "./config.env" });

const app = express();
mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('DB CONNECTED')).catch(err => console.log("DB CONNECTION ERROR", err));

app.use(morgan("dev"));
app.use(cors({origin:true, credentials: true}));


const port = process.env.PORT || 5001;

const server = app.listen(port, () => console.log(`Server is running on port ${port}`));

const tindaModel = require('./models/tindamodel');

//const apiUrl = 'https://api.spoonacular.com/recipes/complexSearch';
//const apiKey = '5ac7c49190084f06ab089274e7c286ac';
//const apiID = '8bbd57b4';

const importToMongoDB = async () => {
    try {
       // const response = await axios.get('https://api.spoonacular.com/recipes/716429/information?apiKey=5ac7c49190084f06ab089274e7c286ac&includeNutrition=true');
        const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch',{
            params:{
                apiKey: '5ac7c49190084f06ab089274e7c286ac',
                number: 1
            }
        });
        const data = response.data.results;
        console.log('Data:', data);
        //console.log('Number of recipes fetched:', data.length);
        totalRecipes = response.data.totalResults;
        console.log('Number of recipes:', totalRecipes);
    
        await tindaModel.insertMany(data);

        offset = 1;
        while (offset < totalRecipes) {
            const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
                params: {
                    apiKey: '5ac7c49190084f06ab089274e7c286ac',
                    offset: offset,
                    number: 100
                }
            });
            
            const recipes = response.data.results;

            await tindaModel.insertMany(recipes);
            offset += 100;
        }
        
        console.log('Data inserted into MongoDB successfully');
    } catch (error) {
        console.error('Error fetching data from API or inserting into MongoDB:', error);
    }
};


importToMongoDB();