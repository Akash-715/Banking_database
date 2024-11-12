 import mysql from 'mysql2'
import bcrypt from 'bcrypt'

 const pool = mysql.createPool({
   host: '127.0.0.1',
   user: 'root',
   password: 'Grey_black@123',
   database: 'Banking_03'
 }).promise()

const saltrounds = 10;

export async function InsertUsers(username,password){
  try{
    const hashpassword = await bcrypt.hash(password,saltrounds);
    let [value] = await pool.query(`Insert into users(user_id,password) values(?,?)`,[username,hashpassword])
    return { success: true, result: value };
  }catch (error) {
    console.error("Database error:", error);
    return { success: false, error: error.message };
  }

 }

 
 let ask= await pool.query("SELECT * FROM staff_03");

 export async function get_staff_customer(){
  let [value] = await pool.query(`
    select c.FNAME,c.LNAME,c.CUSTOMER_ID,s.STAFF_ID
    from customer_03 c 
    join staff_03 s 
    on c.PAN_NO = s.PAN_NO`)
    return value;
 }

 export async function All_staff() {
  let [result] = await pool.query(`CALL Get_ALL_STAFF()`);
  return result[0]; // Adjust to return only the rows
}


export async function Branch_staff(ifsce) {
  try {
    // Use CALL to invoke the stored procedure correctly
    let [value] = await pool.query(`CALL Branch_staff(?)`, [ifsce]);
    return value[0];
  } catch (error) {
    console.error("Error executing stored procedure:", error);
  }
}


export async function OpenAccount(acc_id, cus_id, balance, acc_type, ifsce) {
  try {
    console.log({ acc_id, cus_id, balance, acc_type, ifsce }); // Log all parameters
    let [value] = await pool.query(`
      CALL OpenNewAccount(?, ?, ?, ?, ?)`, [acc_id, cus_id, balance, acc_type, ifsce]);
    return { success: true, result: value };
  } catch (error) {
    console.error("Database error:", error);
    return { success: false, error: error.message };
  }
}

 export async function get_all_customer(){
  let [value] = await pool.query(`
    select *
    from customer_03
    `)
    return value;
 }
export async function cus_account(cus_id) {
  try{
    let [value] = await pool.query(`CALL get_cus_account(?)`,[cus_id]); 
    return value; // returning data if needed
  } catch (error) {
    console.error("Error executing stored procedure:", error);
  }
}

export async function insert_cus(cus_id, fname, lname, dob, pan, adhaar, sex, address, ifsce) {
  try {
    let [value] = await pool.query(`
       CALL create_cus(?,?,?,?,?,?,?,?,?)`, [cus_id, fname, lname, dob, pan, adhaar, sex, address, ifsce]);
    return { success: true, result: value };
  } catch (error) {
    console.error("Database error:", error);
    return { success: false, error: error.message }; // Return error message to the route
  }
}

export async function delete_customer(cus_id) {
try{
  let [value] = await pool.query(`CALL delete_cus(?)`,[cus_id]);
  return { success: true, result: value };
}catch (error) {
  console.error("Database error:", error);
  return { success: false, error: error.message }; // Return error message to the route
}
  
}

export async function get_account_type(acc_type) {
  try {
    let [value] = await pool.query(`CALL Account_type(?)`, [acc_type]);
    console.log("Raw database response:", value); // Log the raw response for inspection
    return { success: true, result: value };
  } catch (error) {
    console.error("Database error:", error);
    return { success: false, error: error.message };
  }
}

 export async function get_customer(num) {
   let [value] = await pool.query(`
    select * 
    from customer_03 
    where customer_id = ? `,[num])
    return value;
 }

 export async function account_count(cus_id) {
  try{
    let [value] = await pool.query(`CALL  GetAccountCountByCustomer(?)`,[cus_id]);
    return { success: true, result: value };
  }catch (error) {
    console.error("Database error:", error);
    return { success: false, error: error.message };
  }
 }

 let print = await  get_customer(1);
 console.log(print);
 console.log(ask);
