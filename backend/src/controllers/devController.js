const axios = require('axios');
const Dev = require('../models/dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {

    async index(request,response){
        const dev = await Dev.find();

        return response.json(dev);
    },

    async store(request,response) 
    {
        const { github_username, techs, latitude, longitude } = request.body;
        
        let dev = await Dev.findOne({ github_username });
        if (!dev) {

            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, avatar_url, bio } = apiResponse.data; // se name for nulo, recebe o valor de login(obrigatório)
        
            const location = {
                type: 'Point',
                coordinates: [longitude,latitude]
            };

            const techsArray = parseStringAsArray(techs);
            dev = await Dev.create(
            {
               github_username,
               name,
               avatar_url,
               bio,
               techs: techsArray,
               location
            })
         }
        return response.json(dev);
    }
}