const request = require("supertest");
const server = require('../server'); //instance of our server (but separate the listen to index file as we dont actually start the server - and dontwant the server to be left running)
//import instance of database


test('GET/', async ()=>{
    //call the instance of our server with supertest
    const res= await request(server).get("/")
    expect(res.statusCode).toBe(200)
    expect(res.type).toBe("application/json")
    expect(res.body.message).toBe("Welcome to our API")
})