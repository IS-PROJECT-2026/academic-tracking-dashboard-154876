import pg from 'pg';
const { Pool } = pg;


const pool = new Pool({
  user: 'ISProject',
  host: 'localhost',
  database: 'AMSPlatform',
  password: '1234Bravin',
  port: 5432, 
});


async function queryDatabase() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Connected! Current time from DB:', res.rows[0]);
  } catch (err) {
    console.error('Database connection error:', err.stack);
  } finally {
    
    await pool.end(); 
  }
}

queryDatabase();