var events = [{
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 240000,
    date: "06/01/2017",
},
{
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 250000,
    date: "06/01/2018",
},
{
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 257000,
    date: "06/01/2019",
},
{
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 130000,
    date: "06/01/2017",
},
{
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 140000,
    date: "06/01/2018",
},
{
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 150000,
    date: "06/01/2019",
},
{
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 40000,
    date: "06/01/2017",
},
{
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 45000,
    date: "06/01/2018",
},
{
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 50000,
    date: "06/01/2019",
},
];

//the default display is all events
var filteredEvents = events;

//build a dropdown of specific cities
function buildDropDown(){
    let eventDD = document.getElementById("eventDropDown");
    eventDD.innerHTML = "";

    let template = document.getElementById("cityDD-template");

    //Store Events in local storage
    
    //get the distinct list of cities  --  HIGH ORDER FUNCTION AND SPREAD OPERATOR in JS
    let distinctEvents = [...new Set(events.map((event) => event.city))];
     
    let ddItemNode = document.importNode(template.content, true);
    let ddItem = ddItemNode.querySelector("a");

    ddItem.setAttribute("data-string", "All");
    ddItem.textContent = "All";
    eventDD.appendChild(ddItem);

     for (let index = 0; index < distinctEvents.length; index++) {
         
        ddItemNode = document.importNode(template.content, true);
        ddItem = ddItemNode.querySelector("a");
        ddItem.setAttribute("data-string", distinctEvents[index]);
        ddItem.textContent = distinctEvents[index];
        eventDD.appendChild(ddItem);         
     }   
     
     displayStats();
     displayData();
}
//when the user selects a city in the drop down, display the stats and the data filtered
function getEvents(element){
    let city = element.getAttribute("data-string");
    document.getElementById("statsHeader").innerHTML = `Stats For ${city} Events`;

    if (city != "All") {
        filteredEvents = events.filter(function(item){
            if (item.city == city) {
                return item;                                                                
            }
        })}
    else
    {
        filteredEvents = events;
    }
    

    displayStats();
    displayData();
}

//this will display stats for the events
function displayStats(){

    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;
    let currentAttendance = 0;

    for (let index = 0; index < filteredEvents.length; index++) {
        
        currentAttendance = filteredEvents[index].attendance;
        total += currentAttendance;

        

        //replace this with array function
        if (most < currentAttendance) {
            most = currentAttendance;           
        }
        //replace this with array function
        if (least > currentAttendance || least < 0) {
            least = currentAttendance;
        }       
    }
    average = total / filteredEvents.length

    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("least").innerHTML = least.toLocaleString();
    document.getElementById("average").innerHTML = average.toLocaleString(
        undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }
    );
}

//displays the data from the array
function displayData(){
    let template = document.getElementById("eventData-template");
    let eventBody = document.getElementById("eventBody");

    eventBody.innerHTML = "";

    //TODO: grab the events from local storage

  for (let index = 0; index < filteredEvents.length; index++) {
      
    let eventRow = document.importNode(template.content, true);

    var eventCols = eventRow.querySelectorAll("td");

    eventCols[0].textContent = filteredEvents[index].event;
    eventCols[1].textContent = filteredEvents[index].city;
    eventCols[2].textContent = filteredEvents[index].state;
    eventCols[3].textContent = filteredEvents[index].attendance;
    eventCols[4].textContent = new Date(filteredEvents[index].date).toDateString();
      
    eventBody.appendChild(eventRow);
  }
 
}