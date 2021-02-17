const server=require('../server');
const supertest=require('supertest');
const db=require('../data/config');

afterAll(async ()=>{
    //close db connection so the test process doesnt hang
await db.destroy();
})

beforeEach(async ()=>{
//get db to predictable data - by seeding before each time the test run
await db.seed.run()
})

describe("testing integration hobbits router",()=>{
    test("GET /hobbits",async ()=>{
        const res= await supertest(server).get("/hobbits")
        expect(res.statusCode).toBe(200);
        // expect(res.headers["content-type"]).toBe("/application/json; charset=utf-8)
        expect(res.type).toBe("application/json")
        expect(res.body).toHaveLength(4)
        expect(res.body[0].name).toBe("sam")
    })

    test("GET /hobbits/:id",async ()=>{
        const id=1
        const res= await supertest(server).get(`/hobbits/${id}`)
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe("application/json");
        //returns an object and not an array
        expect(res.body.name).toBe("sam")
        //for 404 
        const noid=5
        const resp= await supertest(server).get(`/hobbits/${noid}`)
        expect(resp.statusCode).toBe(404);
        expect(resp.body.message).toBe("hobbit id not found");
    })

    test("POST /hobbits",async ()=>{
        const res= await supertest(server).post('/hobbits').send({name:"bilbo"})
        expect(res.statusCode).toBe(201);
        expect(res.type).toBe("application/json");
        expect(res.body.name).toBe("bilbo");
    })

})


