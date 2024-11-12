//TO GET ALL CUSTOMERS
document.addEventListener("DOMContentLoaded",() => {
    const button = document.getElementById("btn");
    const table = document.getElementById("customerTable");
    const tableBody = document.getElementById("customerTableBody");
  
    button.onclick = async () => {
      console.log("Button clicked"); // Log to confirm button click
  
      try {
        const response = await fetch('/api/customers');
        if (!response.ok) throw new Error("Network response was not ok");
        const customers = await response.json();
        console.log("Fetched customer data:", customers); // Log fetched data
  
        // Clear the table body first if there's previous data
        tableBody.innerHTML = '';
  
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
            <td>${customer. IFSCE_CODE}</td>
          `;
          tableBody.appendChild(row);
        });
  
        // Show the table after data is loaded
        table.style.display = 'table';
        console.log("Table displayed"); // Log to confirm table display
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };
  });
  
// To Get Staff who is customers

const CsButton = document.getElementById("csb");
  const table = document.getElementById("csTable");
  const TableBody = document.getElementById("csTableBody");

  CsButton.onclick = async () => {
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
  

// TO GET ONE CUSTOMER

const OcButton = document.getElementById("oneCusBtn");
const ocInput = document.getElementById("oneCusInput");
const ocTable = document.getElementById("OneCustomerTable");
const ocTableBody = document.getElementById("OneCustomerTableBody");

OcButton.onclick = async() => {
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
