var mData="";
var sliderRange="";

//listen to the mouse position while moving on the Webpage
document.addEventListener('mousemove', showMovementCoords, true);
//listen to the position of single mouse clicks on the Webpage
document.addEventListener('click', showClickCoords, true);



//loop through the html form elements and listen to the user's interactions with them
var formElements=[]

formElements.push(document.getElementById("weiter"));
for (let i = 0; i < formElements.length; i++) {
    formElements[i].addEventListener("mouseover", function(event) {
        overFunction(event);
    });
    formElements[i].addEventListener("mouseout", function(event) {
        outFunction(event);
    });

    formElements[i].addEventListener("click", function(event) {
        focusFunction(event);
    });

    formElements[i].addEventListener("blur", function(event) {
        blurFunction(event);
    });
    formElements[i].addEventListener("oncontextmenu", function(event) {
        rightClick();
    });
}


//Disable the tabulator and arrow keys.
$(document).keydown(function(e) {
    if (e.keyCode == 9||e.keyCode == 37||e.keyCode == 38||e.keyCode == 39||e.keyCode == 40) {
        e.preventDefault();
    }
})



$(window).on('load', function() {
 mData=",loadedPage,Aufgabenstellung2,"+Date.now()+",,,,,";
    fetchFunction(mData)})



$(window).focus(function() {
    mData=  ",switchedBack,Aufgabenstellung2,"+Date.now()+",,,,,";
    fetchFunction(mData)
});

$(window).blur(function() {
mData=  ",switchedWindow,Aufgabenstellung2,"+Date.now()+",,,,,";
    fetchFunction(mData)});


function scrollFunction() {
     mData = ",scrolled,"
         +event.target.id+","+  Date.now() + ","   +     event.clientX.toString() + "_" + event.clientY.toString()+",,,,"
    fetchFunction(mData)
    }
function rightClick() {
     mData =",rightClicked,"
         +event.target.id+","+  Date.now() + ","   +     event.clientX.toString() + "_" + event.clientY.toString()+",,,,"
    fetchFunction(mData)
    }

//save the current mouse position
function showMovementCoords(event) {
     mData =",mouseposition,,"+  Date.now() + "," +
        event.clientX.toString() + "_" + event.clientY.toString()+",,,,"
    fetchFunction(mData)
}

//save position of single mouse clicks in clickPosArray
function showClickCoords(event) {
     mData=",mouseClick,,"+Date.now() +","+
        event.clientX.toString() + "_" + event.clientY.toString()+",,,,";
        fetchFunction(mData)}

//save the time, when a user has hovered over an html element
function overFunction(event) {
      mData =",hoveredOver," +event.target.id+","+ Date.now() + ","+  event.clientX.toString() + "_" + event.clientY.toString()+ ",,,,";
 fetchFunction(mData)

}

//save the time, when a user has left the area of an html element
function outFunction(event) {
	      mData =",hoveredAway," +event.target.id+","+ Date.now() + ","+  event.clientX.toString() + "_" + event.clientY.toString()+ ",,,,";
            fetchFunction(mData)

}

//save the time, when a user has clicked on an html element
function focusFunction(event) {

             mData =",clickedOn," +event.target.id+","+ Date.now() + ","+  event.clientX.toString() + "_" + event.clientY.toString()+ ",,,,";
fetchFunction(mData);


}
// save the time point, when a user has clicked away from an html element
function blurFunction(event) {
    mData =",clickedAway," +event.target.id+","+ Date.now() + ",,,,,";
     fetchFunction(mData)
};
    
//send user data to flask
function fetchFunction(mData){
    
	console.log(mData)
    fetch(`${window.origin}/Aufgabenstellung2`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(mData),
            cache: "no-cache",
            headers:  new Headers({
                "content-type": "application/json"
            })
        })
}

