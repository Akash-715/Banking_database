let paragraph = document.getElementById('Headp');
let paragraph1 = document.getElementById('afterp');
let paragraph2 = document.getElementById('head2p');
let paragraph3 = document.getElementById('lp');
let paragraph4 = document.getElementById('op');
let paragraph5 = document.getElementById('cp');
    const Acc_Button = document.getElementById("acc");
    const Acc_Input = document.getElementById("get_acc");
    const Acc_Table = document.getElementById("accTable");
    const Acc_TableBody = document.getElementById("accTableBody");

    Acc_Input.style.display = 'none';
    Acc_Button.style.display ='none';

  
 // To get customer account 
 async function Customer_account () {
      const customerId = Acc_Input.value.trim();
      if (!customerId) {
        window.alert("Enter a valid customer ID");
        return;
      }
  
      try {
        const res = await fetch(`/api/cus_acc/${customerId}`);
        if (!res.ok) throw new Error("Network response was not ok");
  
        const one_cus = await res.json();
        console.log("Fetched input customer's data:", one_cus);

        paragraph1.textContent = `You Are seeing Account Details of customer_id ${customerId}`;

          Acc_TableBody.innerHTML = '';

// Assuming one_cus[0] contains the array of accounts
        (Array.isArray(one_cus[0]) ? one_cus[0] : [one_cus[0]]).forEach(oc => {
             const row = document.createElement("tr");
             row.innerHTML = `
            <td>${oc.ACCOUNT_NO}</td>
            <td>${oc.CUS_ID}</td>
            <td>${oc.balance}</td>
            <td>${oc.ACC_TYPES_ID}</td>
            `;
            Acc_TableBody.appendChild(row);
          });

  
        Acc_Table.style.display = 'table';
        console.log("Account table displayed");
  
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };
  
// Customer insertion
const cust_form = document.getElementById('customerForm');
cust_form.style.display = 'none';

   async function Insert_customer (event){
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
  
    try {
      const response = await fetch('/api/insert_cus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to insert customer');
      }
  
      const result = await response.json();
      document.getElementById('responseMessage').textContent = 'Customer inserted successfully!';
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('responseMessage').textContent = `Error inserting customer: ${error.message}`;
    }
  }
  // Account type input
  const AButton = document.getElementById("acc_btn");
  const AInput = document.getElementById("account");
  const ATable = document.getElementById("acc_typeTable");
  const ATableBody = document.getElementById("acc_typeTableBody");

  AButton.style.display ='none';
  AInput.style.display = 'none';
  
 async function Account_type (){
    const acc_type = AInput.value.trim();
    if (!acc_type) {
      window.alert("Enter a valid account type");
      return;
    }
  
    try {
      const res = await fetch(`/api/acc_type/${acc_type}`);
      if (!res.ok) throw new Error("Network response was not ok");
  
      const acc = await res.json();
      console.log("Fetched account data:", acc); // Inspect response structure

      paragraph3.textContent = `You Are seeing Account Details of  ${acc_type}`;
  
      if (acc.result && acc.result.length > 0 && Array.isArray(acc.result[0])) {
        ATableBody.innerHTML = '';
  
        acc.result[0].forEach((account) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${account.account_no}</td>
            <td>${account.cus_id}</td>
            <td>${account.balance}</td>
            <td>${account.account_type}</td>
          `;
          ATableBody.appendChild(row);
        });
  
        ATable.style.display = 'table';
      } else {
        window.alert("No data found for the specified account type.");
        console.log("No data found or unexpected format:", acc);
      }
  
    } catch (error) {
      console.error("Error fetching account data:", error);
    }
  };
  


    

  // TO GET ONE CUSTOMER
  const ocInput = document.getElementById("oneCusInput");
  const ocTable = document.getElementById("OneCustomerTable");
  const ocTableBody = document.getElementById("OneCustomerTableBody");
  const ocbutton = document.getElementById("oneCusBtn")

  // First not displaying the input and output button
 ocInput.style.display = 'none';
 ocbutton.style.display = 'none';

 async function OneCustomer() {

  const customerId = ocInput.value.trim();

  if (!customerId) {
    window.alert("Enter a valid customer ID");
    return;
  }

  try {
    const res = await fetch(`/api/one_cus/${customerId}`);
    if (!res.ok) throw new Error("Network response was not ok");

    // Wait for the JSON data to be resolved
    const one_cus = await res.json(); 
    console.log("Fetched input customer's data:", one_cus);

    paragraph4.textContent = `You Are seeing Details of customer_id ${customerId}`;

    ocTableBody.innerHTML = '';

    // Wrap one_cus in an array in case it’s a single object
    (Array.isArray(one_cus) ? one_cus : [one_cus]).forEach(oc => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${oc.CUSTOMER_ID}</td>
        <td>${oc.FNAME}</td>
        <td>${oc.LNAME}</td>
        <td>${oc.SEX || 'N/A'}</td>
        <td>${oc.PAN_NO || 'N/A'}</td>
        <td>${oc.ADHAAR_NO || 'N/A'}</td>
        <td>${oc.DOB}</td>
        <td>${oc.IFSCE_CODE}</td>`;
      ocTableBody.appendChild(row);
    });

    // Display the table after data is loaded
    ocTable.style.display = 'table';
    console.log("OC Table displayed");

  } catch (error) {
    console.error("Error fetching customer data:", error);
  }
}


document.addEventListener("DOMContentLoaded", function(){
  $('.js-summa').select2();
})


// ALL CUSTOMER 

// Selecting the dropdown which is the id for selection tag
const actionDropdown = document.getElementById("actionDropdown");
const cus_table = document.getElementById("customerTable");
const cus_tableBody = document.getElementById("customerTableBody");

// Function to fetch and display all customers
async function ALL_customer() {
 
  console.log("Get All Customers action triggered"); // Log to confirm action

  try {
    const response = await fetch('/api/customers');
    if (!response.ok) throw new Error("Network response was not ok");
    const customers = await response.json();
    console.log("Fetched customer data:", customers); // Log fetched data

    // Clear the table body first if there's previous data
    cus_tableBody.innerHTML = '';

    // Populate table with customer data
    customers.forEach(customer => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${customer.CUSTOMER_ID}</td>
        <td>${customer.FNAME}</td>
        <td>${customer.LNAME}</td>
        <td>${customer.SEX || 'N/A'}</td>
        <td>${customer.PAN_NO || 'N/A'}</td>
        <td>${customer.ADHAAR_NO || 'N/A'}</td>
        <td>${customer.DOB}</td>
        <td>${customer.IFSCE_CODE}</td>
      `;
      cus_tableBody.appendChild(row);
    });

    // Show the table after data is loaded
    cus_table.style.display = 'table';
  } catch (error) {
    console.error("Error fetching customer data:", error);
  }
}

// deletion input and output button 

const Deletion_div = document.getElementById('DeleteCustomer');

Deletion_div.style.display = 'none';

// get customer who are staff

const CsButton = document.getElementById("csb");
const table = document.getElementById("csTable");
const TableBody = document.getElementById("csTableBody");


async function CustomerStaff ()  {
    console.log("CS BUTTON CLICKED");

    try{
      const res = await fetch ('/api/cus_staff');
      if (!res.ok)  throw new Error("Network response was not ok");
      const staff_cus = await res.json();
      console.log("Fetched staff who is customer's data:", staff_cus); // Log fetched data


      TableBody.innerHTML = '';

      staff_cus.forEach(cs => {
        const row = document.createElement("tr");
          row.innerHTML =`
          <td>${cs.FNAME} </td>
          <td>${cs.LNAME} </td>
          <td>${cs.CUSTOMER_ID} </td>
          <td>${cs.STAFF_ID} </td>
          `;
          TableBody.appendChild(row);

          table.style.display = 'table';
        console.log("CS Table displayed"); 
      })
    }catch (error) {
      console.error("Error fetching customer data:", error);
    }
  }

  const countInput = document.getElementById("countIN");
  const countButton = document.getElementById("countBtn");
  const countTable = document.getElementById("CountTable");
  const countTableBody = document.getElementById("CountTableBody");
  
 
  countInput.style.display = 'none';
  countButton.style.display ='none';
  countTable.style.display = 'none';
  async function getAccountCount() {
    const cusId = countInput.value.trim();
  
    if (!cusId) {
      window.alert("Please enter a valid Customer ID");
      return;
    }
  
    try {
      // Send request to the backend to get account count for the specified customer ID
      const response = await fetch(`/api/account_count/${cusId}`);
      if (!response.ok) throw new Error("Network response was not ok");
  
      const data = await response.json();
      
  
      // Check if the response contains successful data
      if (data.success && data.result && data.result.length > 0) {
        // Clear previous table data
        
        countTableBody.innerHTML = '';
  
        // Populate table with new data
        data.result[0].forEach((row) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${row.cus_id}</td>
            <td>${row.account_count}</td>
          `;
          countTableBody.appendChild(tr);
        });
  
        // Display the table after data is loaded
        countTable.style.display = 'table';
      } else {
        window.alert("No data found for the specified customer ID.");
        countTable.style.display = 'none';
      }
    } catch (error) {
      console.error("Error fetching account count:", error);
      window.alert("Error fetching data. Please try again.");
    }
  }
  
  
  const Acc_form = document.getElementById('AccountForm');
  Acc_form.style.display = 'none';
  
     async function OpenAccount(event){
      event.preventDefault();

    
      const formData = new FormData(Acc_form);
    const acc_id = formData.get('AccNo');
    const cus_id = formData.get('cus_id');
    const balance = formData.get('balance');
    const acc_type = formData.get('AccType');
    const ifsce = formData.get('ifsce');

    // Prepare data to send
    const data = {
        acc_id: acc_id,
        cus_id: cus_id,
        balance: balance,
        acc_type: acc_type,
        ifsce: ifsce
    };

      try {
        const response = await fetch('/api/OpenAcc', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to Open account');
        }
    
        const result = await response.json();
        document.getElementById('responseMessage').textContent = 'Opened Accountt successfully!';
      } catch (error) {
        console.error('Error:', error);
        document.getElementById('responseMessage').textContent = `Error inserting customer: ${error.message}`;
      }
    }



// Event listener to handle dropdown changes
actionDropdown.addEventListener("change", () => {
  const selectedAction = actionDropdown.value;

  // Select * from customer_03
  if (selectedAction === "getAllCustomers") {
    paragraph.style.display ='';
    paragraph.textContent = "You are seeing Details of all Customers";
    ocInput.style.display = 'none';
    ocbutton.style.display = 'none';
    cust_form.style.display = 'none';
    AButton.style.display ='none';
  AInput.style.display = 'none';
  Acc_Table.style.display ='none';
  Deletion_div.style.display = 'none';
  ATable.style.display = 'none';
  countInput.style.display = 'none';
  countButton.style.display ='none';
  countTable.style.display = 'none';
    ALL_customer();
  } 

  // Select * from customer_03 where cus_id = input

  else if(selectedAction === "getOneCustomer"){
    paragraph4.style.display ='';
    ocInput.style.display = 'inline';
    ocbutton.style.display = 'inline';
    Acc_Input.style.display = 'none';
    Acc_Button.style.display ='none';
    cus_table.style.display = 'none';
    Acc_Table.style.display = 'none';
    cust_form.style.display = 'none';
    AButton.style.display ='none';
    Acc_Table.style.display ='none';
  AInput.style.display = 'none';
  ATable.style.display = 'none';
  Deletion_div.style.display = 'none';
  table.style.display = 'none';
  countInput.style.display = 'none';
  countButton.style.display ='none';
  countTable.style.display = 'none';
  paragraph.style.display ='none';
  paragraph3.style.display ='none';
  paragraph1.style.display = 'none';
  paragraph5.style.display= 'none';
  paragraph3.style.display = 'none';
  Acc_form.style.display = 'none';
  }

  else if(selectedAction === 'getCustomerAccount'){
    paragraph1.style.display = '';
    Acc_Input.style.display = 'inline';
    Acc_Button.style.display ='inline';
    cus_table.style.display = 'none';
    ocTable.style.display ='none';
    ocInput.style.display = 'none';
    ocbutton.style.display = 'none';
    cust_form.style.display = 'none';
    AButton.style.display ='none';
  AInput.style.display = 'none';
  Deletion_div.style.display = 'none';
  ATable.style.display = 'none';
  table.style.display = 'none';
  countInput.style.display = 'none';
  countButton.style.display ='none';
  countTable.style.display = 'none';
  paragraph.style.display ='none';
  paragraph3.style.display = 'none';
  paragraph5.style.display= 'none';
  paragraph4.style.display ='none';
  Acc_form.style.display = 'none';
  }
 
  else if(selectedAction === 'insertCustomer'){
    cust_form.style.display = 'inline';
    cus_table.style.display = 'none';
    ocTable.style.display ='none';
    ocInput.style.display = 'none';
    ocbutton.style.display = 'none';
    Acc_Input.style.display = 'none';
    Acc_Button.style.display ='none';
    cus_table.style.display = 'none';
    AButton.style.display ='none';
  AInput.style.display = 'none';
  Deletion_div.style.display = 'none';
  ATable.style.display = 'none';
  table.style.display = 'none';
  countInput.style.display = 'none';
  countButton.style.display ='none';
  countTable.style.display = 'none';
  Acc_Table.style.display ='none';

  Acc_form.style.display = 'none';
  }

  else if(selectedAction === "getAccountType"){
    paragraph3.style.display = '';
    AButton.style.display ='inline';
    AInput.style.display = 'inline';
    cus_table.style.display = 'none';
    ocTable.style.display ='none';
    ocInput.style.display = 'none';
    ocbutton.style.display = 'none';
    Acc_Input.style.display = 'none';
    Acc_Button.style.display ='none';
    Acc_Table.style.display ='none';
    cus_table.style.display = 'none';
    cust_form.style.display = 'none';
    Deletion_div.style.display = 'none';
    ATable.style.display = 'none';
    table.style.display = 'none';
    countInput.style.display = 'none';
    countButton.style.display ='none';
    countTable.style.display = 'none';
    Acc_form.style.display = 'none';
  }

  else if(selectedAction === "deleteCustomer"){
    Deletion_div.style.display ="inline";
    cus_table.style.display = 'none';
    ocTable.style.display ='none';
    ocInput.style.display = 'none';
    ocbutton.style.display = 'none';
    Acc_Input.style.display = 'none';
    Acc_Button.style.display ='none';
    cus_table.style.display = 'none';
    cust_form.style.display = 'none';
    AButton.style.display ='none';
    AInput.style.display = 'none';
    ATable.style.display = 'none';
    table.style.display = 'none';
    Acc_Table.style.display ='none';
    countInput.style.display = 'none';
    countButton.style.display ='none';
    countTable.style.display = 'none';
    Acc_form.style.display = 'none';

  }

  else if(selectedAction === 'StaffWhoAreCustomer'){
    cus_table.style.display = 'none';
    ocTable.style.display ='none';
    ocInput.style.display = 'none';
    ocbutton.style.display = 'none';
    Acc_Input.style.display = 'none';
    Acc_Button.style.display ='none';
    cus_table.style.display = 'none';
    cust_form.style.display = 'none';
    AButton.style.display ='none';
    AInput.style.display = 'none';
    Acc_Table.style.display ='none';
    ATable.style.display = 'none';
    Deletion_div.style.display = 'none';
    countInput.style.display = 'none';
    countButton.style.display ='none';
    Acc_form.style.display = 'none';
    countTable.style.display = 'none';
    CustomerStaff();
  }

  else if(selectedAction === 'AccountCount'){
    countInput.style.display = 'inline';
    countButton.style.display ='inline';
    cus_table.style.display = 'none';
    ocTable.style.display ='none';
    Acc_Table.style.display ='none';
    ocInput.style.display = 'none';
    ocbutton.style.display = 'none';
    Acc_Input.style.display = 'none';
    Acc_Button.style.display ='none';
    cus_table.style.display = 'none';
    cust_form.style.display = 'none';
    AButton.style.display ='none';
    AInput.style.display = 'none';
    ATable.style.display = 'none';
    Deletion_div.style.display = 'none';
    table.style.display = 'none';
    Acc_form.style.display = 'none';

  }
  else if(selectedAction === 'OpenAccount'){
    Acc_form.style.display = 'inline';
    cus_table.style.display = 'none';
    ocTable.style.display ='none';
    Acc_Table.style.display ='none';
    ocInput.style.display = 'none';
    ocbutton.style.display = 'none';
    Acc_Input.style.display = 'none';
    Acc_Button.style.display ='none';
    cus_table.style.display = 'none';
    cust_form.style.display = 'none';
    AButton.style.display ='none';
    AInput.style.display = 'none';
    ATable.style.display = 'none';
    Deletion_div.style.display = 'none';
    table.style.display = 'none';
  }


  else {
  
    ocInput.style.display = 'none';
    ocbutton.style.display = 'none';
    cus_table.style.display = 'none';
    ocTable.style.display ='none';
    Acc_Input.style.display = 'none';
    Acc_Button.style.display ='none';
    Acc_form.style.display = 'none';
    Acc_Table.style.display = 'none';
    Deletion_div.style.display = 'none';
    ATable.style.display = 'none';
    table.style.display = 'none';
    countInput.style.display = 'none';
    countButton.style.display ='none';
    countTable.style.display = 'none';
    AButton.style.display ='none';
    AInput.style.display = 'none';
    console.log("Selected action:", selectedAction);
  }
});

ocbutton.addEventListener("click", OneCustomer);
Acc_Button.addEventListener("click",Customer_account);
cust_form.addEventListener("submit",Insert_customer);
AButton.addEventListener("click",Account_type);
countButton.addEventListener("click", getAccountCount);
paragraph.addEventListener('click',addEventListener);
Acc_form.addEventListener("submit",OpenAccount);
