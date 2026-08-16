const pg = require('pg');
const { Pool } = pg;


const pool = new Pool({
  user: 'ISProject',
  host: 'localhost',
  database: 'AMSPlatform',
  password: '',
  port: 5432, 
});



async function findUserbyMail(email){
  const result  = await pool.query('SELECT uid from users WHERE email = $1',[email]);
  return result.rows[0]||null;
}
async function createUser(name,email,password,role){
  const result = await pool.query(
    `INSERT INTO users (name,email,password,role)
    VALUES($1,$2,$3,$4)
    RETURNING uid,name,email,role`,
    [name,email,password,role]
  );
  return result.rows[0];
    
}

module.exports = {findUserbyMail,createUser}
