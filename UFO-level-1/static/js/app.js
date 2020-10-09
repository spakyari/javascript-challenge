// from data.js
var tableData = data;

// YOUR CODE HERE!

var myTable = d3.select("#ufo-table");

myTable.attr("class","table table-striped table-dark");


function CreateTable(Data) {

    myTable.selectAll("td").remove()

    Data.forEach((record)=>{

        var row = myTable.append("tr");

        Object.values(record).forEach((value)=> {

            myData = row.append("td").text(value);
            myData.style();

        });

    });

};


CreateTable(tableData);

var button = d3.select("#filter-btn");

button.on("click", function() {

    d3.event.preventDefault();

    console.log("pressed");

    var myDate = document.getElementById("datetime").value;

    if (myDate == "") 
    {

        CreateTable(tableData);
    }
    else
    {   
        console.log("here");
        var filtered_data = tableData.filter((item)=>{return item.datetime == myDate});

        CreateTable(filtered_data);

    };
    
});


