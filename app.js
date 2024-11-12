import express from 'express';
import { get_staff_customer, get_all_customer, get_customer,cus_account,insert_cus,delete_customer,
       get_account_type,account_count,Branch_staff,All_staff,OpenAccount,InsertUsers} from './DB.js';



const app = express();
const port = 8080;



app.set("view engine", "ejs");

app.get('/manager',(req,res)=> {
  res.render('manager');
})

app.use(express.json());

// app.post('/register', async (req, res) => {
//   try {
//     const { userName, password } = req.body;
//     const insert_users = await InsertUsers(userName, password);
//     if (insert_users.success) {
//       res.json(insert_users.result); // Send successful result
//     } else {
//       res.status(500).json({ error: insert_users.error }); // Send detailed error as JSON
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error registering user");
//   }
// });


// // Login route
// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     // Fetch user from the database
//     const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
//     if (rows.length === 0) return res.status(400).send("User not found");

//     const user = rows[0];
//     // Compare the provided password with the stored hash
//     const isMatch = await bcrypt.compare(password, user.password_hash);
//     if (!isMatch) return res.status(400).send("Invalid password");

//     // Set session or token for authenticated user
//     req.session.user = { id: user.user_id, username: user.username };
//     res.send("Logged in successfully");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error logging in");
//   }
// });


// Route to staff html page
app.get('/staff_manage',(req,res) => {
  res.render('staff');
});

// Route to render the HTML page
app.get('/', (req, res) => {
  res.render('index'); // Render the EJS file
});

app.get('/api/All_staff',async(req,res) =>{
  try{
    const staff = await All_staff();
    res.json(staff);
  }catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
})

app.get('/api/branch_staff/:ifsce',async(req,res) => {
  try{
    const ifsce = req.params.ifsce;
    const branch_staff = await Branch_staff(ifsce);
    res.json(branch_staff);
  }catch (error) {
    console.error(error);
    res.status(600).send("Internal Server Error");
  }
})

// API route to get customer data 
app.get('/api/customers', async (req, res) => {
  try {
    const customers = await get_all_customer();
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// route to staff who are customer
app.get('/api/cus_staff',async (req,res) => {
  try{
    const cus_staff = await get_staff_customer();
    res.json(cus_staff);
  } catch (error) {
    console.error(error);
    res.status(600).send("Internal Server Error");
  }
})

// route to get single customer
app.get('/api/one_cus/:id',async(req,res) => {
  try{
    const id = req.params.id;
    const one_cus = await get_customer(id);
    res.json(one_cus);
  }catch (error) {
    console.error(error);
    res.status(600).send("Internal Server Error");
  }
})

// route to get customer account
app.get('/api/cus_acc/:cus_id', async (req, res) => {
  try {
    const cus_id = req.params.cus_id;
    const get_acc = await cus_account(cus_id);
    res.json(get_acc || []); // Return empty array if get_acc is null
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});




app.post('/api/insert_cus', async (req, res) => {
  try {
    const { cus_id, fname, lname, dob, pan, adhaar, sex, address, ifsce } = req.body;
    const ins_cus = await insert_cus(cus_id, fname, lname, dob, pan, adhaar, sex, address, ifsce);

    if (ins_cus.success) {
      res.json(ins_cus.result); // Send successful result
    } else {
      res.status(500).json({ error: ins_cus.error }); // Send detailed error as JSON
    }
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post('/api/OpenAcc',async(req,res) => {
  try{
    const{acc_id,cus_id,balance,acc_type,ifsce} = req.body;
    const OpenAcc = await OpenAccount(acc_id,cus_id,balance,acc_type,ifsce);

    if(OpenAcc){
      res.json(OpenAcc.result);
    } else{
      res.status(500).json({ error: ins_cus.error });
    }
}catch (error) {
  console.error("Server error:", error);
  res.status(500).json({ error: "Internal Server Error" });
}
})


// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

app.post('/api/delete_cus', async (req, res) => {
  try {
    const cus_id = req.body.cus_id; // Access cus_id from req.body
    const del_cus = await delete_customer(cus_id);

    if (del_cus.success) {
      res.json({ message: "Customer deleted successfully!" });
    } else {
      res.status(500).json({ error: del_cus.error });
    }
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/api/acc_type/:type', async (req,res) => {
  try{
    const type = req.params.type;
    const account = await get_account_type(type);
    res.json(account)
  }catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

app.get('/api/account_count/:cus_id',async(req,res) =>{
  try{
    const cus_id = req.params.cus_id;
    const count = await account_count(cus_id);
    res.json(count);
  }catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

app.use(express.static("Html & css"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
