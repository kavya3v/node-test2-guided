const pgConnection=process.env.DATABASE_URL;

module.exports = {
	development:{
		client: "sqlite3",
		useNullAsDefault: true,
		connection: {
			filename: "./data/hobbits.db3",
		},
		migrations: {
			directory: "./data/migrations",
		},
		seeds: {
			directory: "./data/seeds",
		},
	},
		testing:{
			client: "sqlite3",
			useNullAsDefault: true,
			connection: {
				filename: "./data/test.db3",
			},
			migrations: {
				directory: "./data/migrations",
			},
			seeds: {
				directory: "./data/seeds",
			},
		},
		production: {
			client: "pg",
			connection: {
			  connectionString: pgConnection,
			  ssl: { rejectUnauthorized: false }
			},
			pool: {
			  min: 2,
			  max: 10
			},
			migrations: {
			  directory: "./data/migrations"
			},
			seeds: {
			  directory: "./data/seeds"
			}
		  }	
}
