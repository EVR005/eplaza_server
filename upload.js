const fs = require("fs");
const pg = require("pg");

// Connection settings for Neon database
const pool = new pg.Pool({
  user: "edumbasankaravel513",
  host: "ep-lingering-snowflake-94445869.ap-southeast-1.aws.neon.tech",
  database: "eshopping",
  password: "5dgMQ8wrYKxc",
  port: 5432, // Default PostgreSQL port
  ssl: {
    rejectUnauthorized: false, // Allow self-signed certificates (if applicable)
    sslmode: "require", // Set SSL mode to 'require'
  },
});

// Read and parse the CSV file
const csvFilePath = "C:/Users/edumb/Downloads/products.csv";
const csvData = fs.readFileSync(csvFilePath, "utf8");
const rows = csvData
  .trim()
  .split("\n")
  .map((row) => row.split(","));

// Insert data into the database
const tableName = "products";
const columns = [
  "id",
  "image",
  "product_name",
  "color",
  "size",
  "category",
  "price",
  "caption",
  "quantity",
  "createdAt",
  "updatedAt",
]; // Replace with your column names

const insertQuery = `INSERT INTO ${tableName} (${columns.join(
  ", "
)}) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11)`;

const BulkInsert = () => {
  pool.connect((err, client, done) => {
    if (err) throw err;

    for (const row of rows) {
      client.query(insertQuery, row, (err, result) => {
        if (err) console.error(err);
      });
    }

    done(); // Release the client back to the pool
  });
};

module.exports = { BulkInsert };
