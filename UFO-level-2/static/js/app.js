// from data.js
var tableData = data;

// YOUR CODE HERE!

criteria = {

    datetime:"",
    city:"",
    state:"",
    country:"",
    shape:""

}

var myTable = d3.select("#ufo-table");

myTable.attr("class","table table-striped table-dark");

CreateTable();

Populate_DropDowns();

var button = d3.select("#filter-btn");

button.on("click", function() {

    d3.event.preventDefault();

    var myDate = document.getElementById("datetime").value;

    if (myDate == "") 
    {

        CreateTable(tableData);
    }
    else
    {   

        var filtered_data = tableData.filter((item)=>{return item.datetime == myDate});

        var filtered_table = update_subdata();
        CreateTable(filtered_data);

    };
    
});


d3.selectAll(".drop-down").on("change", function () {
    
    d3.event.preventDefault();

    update_criteria();
    var filtered_table = update_subdata();
    CreateTable(filtered_table);



});


// --------------------------------functions-----------

function CreateTable(subData = tableData) {

    myTable.selectAll("td").remove()

    subData.forEach((record)=>{

        var row = myTable.append("tr");

        Object.values(record).forEach((value)=> {

            myData = row.append("td").text(value);
            myData.style();

        });

    });

};



// -------Populate drop down lists with 
// -------distinct Date, city, state, country and shape 

// Function to find desired field distinct values

function Populate_DropDowns(data_input = tableData) {

    features = ["datetime", "city", "state", "country", "shape"]

    function GetDistinct(Field) {

        var fields = data_input.map((item)=>{ return item[Field]});
        var distinct_values = [...new Set(fields)];

        return distinct_values;

    };

    var features_list = features.map((item)=>{return GetDistinct(item)});

    var i=0
    features.forEach((feature)=>{

        var DropDown = d3.select(`#${feature}`);

        var current_value = DropDown.value;

        DropDown.selectAll("option").remove();

        DropDown.append("option");


        features_list[i].forEach((item)=>{

            DropDown.append("option")
            .attr("value", item)
            .text(item);

        });



        i+=1;

    });

};


function update_criteria() {

    var myDrop_down = d3.event.target;

    criteria[String(myDrop_down.id)] = myDrop_down.value;

}

function verify(row) {

    if (!(criteria.datetime == row.datetime || criteria.datetime == ""))

        {return false};

    if (!(criteria.city == row.city || criteria.city == ""))

        {return false};

    if (!(criteria.state == row.state || criteria.state == ""))

        {return false};

    if (!(criteria.country == row.country || criteria.country == ""))

        {return false};

    if (!(criteria.shape == row.shape || criteria.shape == ""))

        {return false};
        
    return true;

};

function update_subdata() {

    return tableData.filter(verify);
};










