const { default: Axios } = require('axios');
const express = require('express');
const router = express.Router();
const myFirestore = require('../index').myFirestore
const axios = require('axios');

router.get('/restaurants', async (req, res) => {
    // let me = myFirestore.collection('users').doc('me')
    // await me.set({
    //     name: 'tate'
    // });
    const headers = {
        'Api-Key': '79abac227fdb4d9e986da4876d81b337'
    }
    axios.get('https://api.omnivore.io/1.0/locations' , {headers}).then(response => {
        console.log(response.data)
    });
})

module.exports = router;