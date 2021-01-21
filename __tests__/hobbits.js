const supertest = require("supertest")
const server = require("../server")
const db = require("../data/config")

beforeEach(async () => {
	await db.seed.run()
})

afterAll(async () => {
	await db.destroy() // closes the database connection
})

describe("hobbits integration tests", () => {
	it("gets a list of hobbits", async () => {
		const res = await supertest(server).get("/hobbits")
		expect(res.statusCode).toBe(200)
		expect(res.type).toBe("application/json")
		expect(res.body.length).toBe(4)
		expect(res.body[0].id).toBe(1)
		expect(res.body[0].name).toBe("sam")
	})

	it("gets a hobbit by the id", async () => {
		const res = await supertest(server).get("/hobbits/2")
		expect(res.statusCode).toBe(200)
		expect(res.type).toBe("application/json")
		expect(res.body.id).toBe(2)
		expect(res.body.name).toBe("frodo")
	})

	it("returns a 404 if hobbit is not found", async () => {
		const res = await supertest(server).get("/hobbits/50")
		expect(res.statusCode).toBe(404)
		expect(res.type).toBe("application/json")
		expect(res.body.message).toBe("Hobbit not found")
	})

	it("creates a hobbit", async () => {
		const res = await supertest(server)
			.post("/hobbits")
			.send({ name: "bilbo" })
		expect(res.statusCode).toBe(201)
		expect(res.type).toBe("application/json")
		expect(res.body.name).toBe("bilbo")
	})
})
