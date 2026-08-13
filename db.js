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

async function findUserbyMail(email){
  const result  = await pool.query('SELECT id from users WHERE email = $1',[email]);
  return result.rows[0]||null;
}
async function createUser(name,email,password,role){
  const result = await pool.query(
    `INSERT INTO users (name,email,password,rols)
    VALUES($1,$2,$3,$4)
    RETURNING id,name,email,role`,
    [name,email,password,role]
  );
  return result.rows[0];
    
}

module.exports = {findUserbyMail,createUser}
