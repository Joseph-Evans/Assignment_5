function MenuChoice()
{
    switch (document.getElementById("menu").value)
    {
        case "Please select an option":
            document.getElementById("allcustomers").style.visibility = "hidden";
            document.getElementById("orderhistory").style.visibility = "hidden";
            document.getElementById("orderlist").style.visibility = "hidden";
            break;
        case "Customer List":
            document.getElementById("allcustomers").style.visibility = "visible";
            document.getElementById("orderhistory").style.visibility = "hidden";
            document.getElementById("orderlist").style.visibility = "hidden";
            break;
        case "Customer Order History":
            document.getElementById("allcustomers").style.visibility = "hidden";
            document.getElementById("orderhistory").style.visibility = "visible";
            document.getElementById("orderlist").style.visibility = "hidden";
            break;
        case "Customer Order List":
            document.getElementById("allcustomers").style.visibility = "hidden";
            document.getElementById("orderhistory").style.visibility = "hidden";
            document.getElementById("orderlist").style.visibility = "visible";
    }
}

function GetAllCustomers()
{
    var objRequest = new XMLHttpRequest(); //Creates AJAX request object
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getAllCustomers";
    
    
    
    //Checks that the object has returned data
    objRequest.onreadystatechange = function()
    {
       if (objRequest.readyState == 4 && objRequest.status == 200)
       {
            var output = JSON.parse(objRequest.responseText);
            GenerateCustomerOutput(output);
       }
    }
    //Inititate the server request
    objRequest.open("Get",url,true);
    objRequest.send();
    
}

function GenerateCustomerOutput(result)
{
    var count = 0;
    var customertable = '<table id="customertable" border=1pt solid black><tr><th>Customer Name</th><th>Customer ID</th><th>City</th></tr>';
    
    for (count = 0; count < result.GetAllCustomersResult.length; count++)
    {
        customertable += "<tr><td>" + result.GetAllCustomersResult[count].CompanyName + "</td><td>" + result.GetAllCustomersResult[count].CustomerID + "</td><td>"
        + result.GetAllCustomersResult[count].City + "</td></tr>";
    }
    
    customertable += "</table>";
    document.getElementById("allcustomersdisplay").innerHTML = customertable;
    
    
}

function GetOrderHistory()
{
    var objRequest = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
    url += document.getElementById("orderhistorycustomerid").value;
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            GenerateOrderHistory(output);
        }
    }
    
    objRequest.open("Get",url,true);
    objRequest.send();
}

function GenerateOrderHistory(result)
{
    var count = 0;
    var orderhistorytable = '<table id="orderhistorytable" border=1pt solid black><tr><th>Product Name</th><th>Quantity</th></tr>'
    
    for (count = 0; count < result.length; count++)
    {
        orderhistorytable += "<tr><td>" + result[count].ProductName + "</td><td>" + result[count].Total + "</td></tr>";
    }
    
    orderhistorytable += "</table>";
    document.getElementById("orderhistorydisplay").innerHTML = orderhistorytable;
}

function GetOrderList()
{
    var objRequest = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getOrdersForCustomer/";
    url += document.getElementById("orderlistcustomerid").value;
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState ==4 && objRequest.status ==200)
        {
            var output = JSON.parse(objRequest.responseText);
            GenerateOrderList(output);
        }
    }
    
    objRequest.open("Get",url,true);
    objRequest.send();
}

function GenerateOrderList(result)
{
    var count = 0;
    var orderlisttable = '<table id="orderlisttable" border=1pt solid black><tr><th>Order Date</th><th>Order ID</th><th>Ship Address</th><th>Ship City</th><th>Ship Name</th><th>Ship Post Code</th><th>Shipped Date</th></tr>';
    
    for (count = 0; count < result.GetOrdersForCustomerResult.length; count++)
    {
        orderlisttable += "<tr><td>" + result.GetOrdersForCustomerResult[count].OrderDate + "</td><td>" + result.GetOrdersForCustomerResult[count].OrderID + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipAddress + "</td><td>" +
        result.GetOrdersForCustomerResult[count].ShipCity + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipName + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipPostcode + "</td><td>" + result.GetOrdersForCustomerResult[count].ShippedDate + "</td></tr>";
    }
    
    orderlisttable += "</table>";
    document.getElementById("orderlistdisplay").innerHTML = orderlisttable;
}