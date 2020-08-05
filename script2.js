var mData="";
var sliderRange="";
var abbrechenField=false;
var speichernField=false;
//listen to mouse movements
document.addEventListener('mousemove', showMovementCoords, true);
//listen to mouse clicks
document.addEventListener('click', showClickCoords, true);



// add all the elements to a list
var hilfeIcons= document.getElementsByClassName("fa fa-question-circle-o");
var modalTitles= document.getElementsByClassName("modalheader")
//add a listener to all the relevant elements
var labelElements = document.getElementsByTagName("label");
var interactiveElements =document.getElementsByClassName("form-control");
var textInput =document.getElementsByClassName("longInput");
var formElements=[];
for (let i = 0; i < labelElements.length; i++) {

	formElements.push(labelElements[i])
}
for (let i = 0; i < interactiveElements.length; i++) {
	formElements.push(interactiveElements[i])
}
for (let i = 0; i < modalTitles.length; i++) {
	formElements.push(modalTitles[i])
}
for (let i = 0; i < textInput.length; i++) {
	formElements.push(textInput[i])
}


formElements.push(document.getElementById("gueltigTextfield"))
formElements.push(document.getElementById("anzeigeHilfe"))
formElements.push(document.getElementById("abbrechen"))
formElements.push(document.getElementById("speichern"))
formElements.push(document.getElementById("chiffreCheckbox"))
formElements.push(document.getElementById("vertreterCheckbox"))
formElements.push(document.getElementById("anzeigeHilfeText"))
formElements.push(document.getElementById("angebotHilfeText"))
formElements.push(document.getElementById("themaHilfeText"))
formElements.push(document.getElementById("inhaltHilfeText"))
formElements.push(document.getElementById("schlagworteHilfeText"))
formElements.push(document.getElementById("fotoHilfeText"))
formElements.push(document.getElementById("ortHilfeText"))
formElements.push(document.getElementById("gueltigHilfeText"))
formElements.push(document.getElementById("chiffreHilfeText"))
formElements.push(document.getElementById("vertreterHilfeText"))
formElements.push(document.getElementById("sichtbarkeitHilfeText"))
formElements.push(document.getElementById("anzeigeHilfeQuestion"))
formElements.push(document.getElementById("angebotHilfeQuestion"))
formElements.push(document.getElementById("themaHilfeQuestion"))
formElements.push(document.getElementById("inhaltHilfeQuestion"))
formElements.push(document.getElementById("schlagworteHilfeQuestion"))
formElements.push(document.getElementById("fotoHilfeQuestion"))
formElements.push(document.getElementById("ortHilfeQuestion"))
formElements.push(document.getElementById("gueltigHilfeQuestion"))
formElements.push(document.getElementById("chiffreHilfeQuestion"))
formElements.push(document.getElementById("vertreterHilfeQuestion"))
formElements.push(document.getElementById("sichtbarkeitHilfeQuestion"))
formElements.push(document.getElementById("anzeigeOK"))
formElements.push(document.getElementById("angebotOK"))
formElements.push(document.getElementById("themaOK"))
formElements.push(document.getElementById("inhaltOK"))
formElements.push(document.getElementById("schlagworteOK"))
formElements.push(document.getElementById("ortOK"))
formElements.push(document.getElementById("gueltigOK"))
formElements.push(document.getElementById("chiffreOK"))
formElements.push(document.getElementById("vertreterOK"))
formElements.push(document.getElementById("sichtbarkeitOK"))
formElements.push(document.getElementById("mySlider"))
formElements.push(document.getElementById("bildBttn"))
formElements.push(document.getElementById("removeBttnFrame"))
formElements.push(document.getElementById("aufgabeText"))
formElements.push(document.getElementById("aufgabeBttn"))
formElements.push(document.getElementById("mapid"))
formElements.push(document.getElementById("imgPreview"))

//add listeners to the elements in formElements
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

// get details every time the page is opened or renewed
$(window).on('load', function() {
 mData=",loadedPage,Aufgabe2,"+Date.now()+",,,,,";
    fetchFunction(mData)})


//get details when the user changed back from another tab or window
$(window).focus(function() {
    mData=  ",switchedBack,Aufgabe2,"+Date.now()+",,,,,";
    fetchFunction(mData)
});

//get details when the user changed to another tab or window
$(window).blur(function() {
mData=  ",switchedWindow,Aufgabe2,"+Date.now()+",,,,,";
    fetchFunction(mData)});


function scrollFunction() {
     mData =",scrolled,"
         +event.target.id+","+  Date.now() + ","    +     event.clientX.toString() + "_" + event.clientY.toString()+",,,,"
    fetchFunction(mData)
    }
function rightClick() {
        //add right click listeners to the elements on the interactive map
    if(event.target.className==="leaflet-control-zoom-in"){
                  mData =",rightClicked,zoomIn,"+ Date.now() + ","+  event.clientX.toString() + "_" + event.clientY.toString()+ ",,,,";

    }
    else if(event.target.className==="leaflet-control-zoom-out"){
                 mData =",rightClicked,zoomOut,"+ Date.now() + ","+  event.clientX.toString() + "_" + event.clientY.toString()+ ",,,,";

    }else if(event.target.className==="leaflet-control-zoom leaflet-bar leaflet-control"){
                 mData =",rightClicked,zoomParent,"+ Date.now() + ","+  event.clientX.toString() + "_" + event.clientY.toString()+ ",,,,";

    }
    else if(event.target.className==="geocoder-control-input leaflet-bar"){
                 mData =",rightClicked,mapSearchBar,"+ Date.now() + ","+  event.clientX.toString() + "_" + event.clientY.toString()+ ",,,,";

    }

    else{
     mData =",rightClicked,"
         +event.target.id+","+  Date.now() + ","    +     event.clientX.toString() + "_" + event.clientY.toString()+",,,,"}
    fetchFunction(mData)
    }

//save the current mouse coordinates
function showMovementCoords(event) {

     mData =",mousePosition,,"+  Date.now() + "," +
        event.clientX.toString() + "_" + event.clientY.toString()+",,,,"
    fetchFunction(mData)


    //listen to the abbrechenSide and speichernSide buttons on the side bar for mouse hover over and hover away data.
     if(event.clientY>22&&event.clientY<121 &&event.clientX>11&&event.clientX<107){if(abbrechenField===false){
         abbrechenField=true;
          mData =",hoveredOver,abbrechenSide,"+ Date.now() + ","+  event.clientX.toString() + "_" + event.clientY.toString()+ ",,,,";
    fetchFunction(mData)
     }}
     if(event.clientX>15&&event.clientX< 103&&event.clientY>147&&event.clientY<241){if(speichernField===false){
         speichernField=true;
          mData =",hoveredOver,speichernSide,"+ Date.now() + ","+  event.clientX.toString() + "_" + event.clientY.toString()+ ",,,,";

    fetchFunction(mData)
     }}

      if(event.clientY<=22||event.clientY>=121 ||event.clientX<=11||event.clientX>=107){if(abbrechenField===true){
         abbrechenField=false;
          mData =",hoveredAway,abbrechenSide,"+ Date.now() + ","+  event.clientX.toString() + "_" + event.clientY.toString()+ ",,,,";

    fetchFunction(mData)
     }}
     if(event.clientX<=15||event.clientX>= 103||event.clientY<=147||event.clientY>=241){if(speichernField===true){
         speichernField=false;
          mData =",hoveredAway,speichernSide,"+ Date.now() + ","+  event.clientX.toString() + "_" + event.clientY.toString()+ ",,,,";

    fetchFunction(mData)
     }}
}

//save coordinates of single mouse clicks
function showClickCoords(event) {
       //listen to the abbrechenSide and speichernSide buttons on the side bar for mouse click on data.
     if(event.clientY>22&&event.clientY<121 &&event.clientX>11&&event.clientX<107){
          mData =",clickedOn,abbrechenSide,"+ Date.now() + ","+  event.clientX.toString() + "_" + event.clientY.toString()+ ",,,,";
    fetchFunction(mData)
     }
     if(event.clientX>15&&event.clientX< 103&&event.clientY>147&&event.clientY<241){
          mData =",clickedOn,speichernSide,"+ Date.now() + ","+  event.clientX.toString() + "_" + event.clientY.toString()+ ",,,,";

    fetchFunction(mData)
     }
     mData=",mouseClick,,"+Date.now() +","+
        event.clientX.toString() + "_" + event.clientY.toString()+",,,,";
        fetchFunction(mData)
}

//save the details, when a user has hovered over an html element
function overFunction(event) {
    if(event.target.className==="inline-help form-label"){
        return;
    }

    //add hover listeners to the elements on the interactive map
    if(event.target.className==="leaflet-control-zoom-in"){
                 mData =",hoveredOver,zoomIn,"+ Date.now() + ","+  event.clientX.toString() + "_" + event.clientY.toString()+ ",,,,";

    }
    else if(event.target.className==="leaflet-control-zoom-out"){
                 mData =",hoveredOver,zoomOut,"+ Date.now() + ","+  event.clientX.toString() + "_" + event.clientY.toString()+ ",,,,";

    }
    else if(event.target.className==="leaflet-control-zoom leaflet-bar leaflet-control"){
                 mData =",hoveredOver,zoomParent,"+ Date.now() + ","+  event.clientX.toString() + "_" + event.clientY.toString()+ ",,,,";

    }
    else if(event.target.className==="geocoder-control-input leaflet-bar"){
                 mData =",hoveredOver,mapSearchBar,"+ Date.now() + ","+  event.clientX.toString() + "_" + event.clientY.toString()+ ",,,,";

    } else if(event.target.className==="leaflet-control-attribution leaflet-control"){
                 mData =",hoveredOver,leafLetCopyright,"+ Date.now() + ","+  event.clientX.toString() + "_" + event.clientY.toString()+ ",,,,";

    }else if(event.target.title==="A JS library for interactive maps"){
                 mData =",hoveredOver,leafLet,"+ Date.now() + ","+  event.clientX.toString() + "_" + event.clientY.toString()+ ",,,,";

    }else if(event.target.title==="leaflet-control-attribution leaflet-ight"){
                 mData =",hoveredOver,leafLetRight,"+ Date.now() + ","+  event.clientX.toString() + "_" + event.clientY.toString()+ ",,,,";

    }
    else{
         mData =",hoveredOver," +event.target.id+","+ Date.now() + ","+  event.clientX.toString() + "_" + event.clientY.toString()+ ",,,,";
    }
    fetchFunction(mData)
}

//save the time, when a user has left the area of an html element
function outFunction(event) {

      if(event.target.className==="inline-help form-label"){
        return;
    }

        //add "hover away" listeners to the elements on the interactive map
      if(event.target.className==="leaflet-control-zoom-in"){
                 mData =",hoveredAway,zoomIn,"+ Date.now() + ","+  event.clientX.toString() + "_" + event.clientY.toString()+ ",,,,";

    }
    else if(event.target.className==="leaflet-control-zoom-out"){
                 mData =",hoveredAway,zoomOut,"+ Date.now() + ","+  event.clientX.toString() + "_" + event.clientY.toString()+ ",,,,";

    }else if(event.target.className==="leaflet-control-zoom leaflet-bar leaflet-control"){
                 mData =",hoveredaway,zoomParent,"+ Date.now() + ","+  event.clientX.toString() + "_" + event.clientY.toString()+ ",,,,";

    }
    else if(event.target.className==="geocoder-control-input leaflet-bar"){
                 mData =",hoveredAway,mapSearchBar,"+ Date.now() + ","+  event.clientX.toString() + "_" + event.clientY.toString()+ ",,,,";

    }
    else{mData =",hoveredAway," +event.target.id+","+ Date.now() + ","+  event.clientX.toString() + "_" + event.clientY.toString()+ ",,,,";}
    fetchFunction(mData)
}

//save the time, when a user has clicked on an html element
function focusFunction(event) {

   if(event.target.className==="geocoder-control-input leaflet-bar"){
                 mData =",clickedOn,mapSearchBar,"+ Date.now() + ","+  event.clientX.toString() + "_" + event.clientY.toString()+ ",,,,";
fetchFunction(mData);
        return;
    }
     if(event.target.className==="inline-help form-label"){
        return;
    }    if(event.target.id==="mySlider"){

            sliderRange=parseInt(event.target.value)+1

             mData =",clickedOn," +event.target.id+","+ Date.now() + ","+  event.clientX.toString() + "_" + event.clientY.toString()+ ",,," +sliderRange+",";
        fetchFunction(mData);
        return;
    }
      var on=""
	if (event.target.type==="checkbox"){
		if(event.target.checked===true){
			on="1"
		}
		else{
			on="0"
		}
	}
  mData =",clickedOn," +event.target.id+","+ Date.now() + ","+  event.clientX.toString() + "_" + event.clientY.toString()+ ",,,,"+on;
     fetchFunction(mData)

    sliderRange="";

}
// save the details, when a user has clicked away from an html element
function blurFunction(event) {
      if(event.target.className==="inline-help form-label"){
        return;
    }

     inputlength = "";
    //save the length of text input
    //save the length of text input
    if (event.target.type==="text"|| event.target.type==="textarea"||event.target.id==="gueltigTextfield") {
        inputlength = event.target.value.length.toString();
    }

      if(event.target.className==="leaflet-control-zoom-in"){
                 mData =",clickedAway,zoomIn,"+ Date.now() +",," +inputlength+",,,";

    }
    else if(event.target.className==="leaflet-control-zoom-out"){
                 mData =",clickedAway,zoomOut,"+ Date.now() +",," +inputlength+",,,";

    }else if(event.target.className==="leaflet-control-zoom leaflet-bar leaflet-control"){
                 mData =",clickedAway,zoomParent,"+ Date.now() + ",," +inputlength+",,,";

    }
    else if(event.target.className==="geocoder-control-input leaflet-bar"){
                 mData =",clickedAway,mapSearchBar,"+ Date.now() + ",," +inputlength+",,,";

    }
    else{mData =",clickedAway," +event.target.id+","+ Date.now() + ",," +inputlength+",,,";}
     fetchFunction(mData)

}

//upload image
function changeProfile() {
      $('#image').click();
}

//get the path of the file to upload and upload it if its an image file
$('#image').change(function () {
    var imgPath = this.value;
    var ext = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
    if (ext == "gif" || ext == "png" || ext == "jpg" || ext == "jpeg")
        readURL(this);
    else{
                mData= ",changedImage,imgPreview,"+Date.now()+",,,"+this.files[0].name+"-invalidFileType,,"

        fetchFunction(mData);

        swal("Wählen Sie bitte eine Bilddatei mit einer der folgenden Endungen: jpg, jpeg, png.")}
});

//save the details about the uploaded image and blend in the delete button
function readURL(input) {
    if (input.files && input.files[0]) {
        mData= ",changedImage,imgPreview,"+Date.now()+",,,"+input.files[0].name+",,"
        fetchFunction(mData);
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onload = function (e) {
            $('#imgPreview').attr('src', e.target.result);
            addDeleteBttn();
        };
    }
}
//remove the image with a click on the delete button
function removeImage() {
    mData= ",removedImage,imgPreview,"+Date.now()+",,,,,"
        fetchFunction(mData);
    $('#imgPreview').attr('src', "../static/default.png");
      $("#image").val("");

    removeDeleteBttn();
}
function addDeleteBttn() {
    document.getElementById("btnDeletePhoto").style.display = "block";
}

function removeDeleteBttn() {
    document.getElementById("btnDeletePhoto").style.display = "none";
}



function myFunction(elemModal,commentBtn){
    // Get the modal
    var modal = document.getElementById(elemModal);

    // Get the <span> element that closes the modal

      modal.style.display = "block";
    if(commentBtn===''){
        return
    }
        var span = document.getElementById(commentBtn);

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }
}

function closeAufgabe(){
    document.getElementById("aufgabeModal").style.display="none";
}

//default radius on the slider
$(document).ready(function(){

    updateSlider(7);
});

$('input[type="range"]').on("change mousemove", function () {

    updateSlider($(this).val());
});

function updateSlider(sliderValue){
  updateSliderBackground(sliderValue);
  updateSliderCircles(sliderValue);
  showRadius(sliderValue);
}

//update the colour of the slider according to which radius user has chosen.
function updateSliderBackground(sliderValue){
  var rangeSlider = document.getElementById("mySlider");
  var val = sliderValue / rangeSlider.getAttribute("max");

  rangeSlider.style.backgroundImage='-webkit-gradient(linear, left top, right top, '
                                  + 'color-stop(' + val + ', #84b7e3), '
                                  + 'color-stop(' + val + ', #DADDe3)'
                                  + ')';
}

//change the colour of the slider circles based on which radius the user has chosen.
function updateSliderCircles(sliderValue){
    var nodes=document.getElementsByClassName("dot");
    for (let i=0;i<nodes.length;i++){
        nodes[i].style.backgroundColor = "#DADDe3";
    }
    for (let i=0;i<sliderValue;i++){
        nodes[i].style.backgroundColor = "#84b7e3";
    }
}

//show the radius label according to the radius user has chosen on the slider
function showRadius(range){
    if (range==0){
        document.getElementById("radiusLbl").innerHTML='Im Haus (0m)'
    } if (range==1){
        document.getElementById("radiusLbl").innerHTML='Enge Nachbarn (50m)'
    } if (range==2){
        document.getElementById("radiusLbl").innerHTML='Block (250m)'
    } if (range==3){
        document.getElementById("radiusLbl").innerHTML='Ort klein (750m)'
    } if (range==4){
        document.getElementById("radiusLbl").innerHTML='Ort mittel (1.5km)'
    } if (range==5){
        document.getElementById("radiusLbl").innerHTML='Ort groß (3km)'
    } if (range==6){
        document.getElementById("radiusLbl").innerHTML='Region klein (8km)'
    } if (range==7){
        document.getElementById("radiusLbl").innerHTML='Region mittel (15km)'
    } if (range==8){
        document.getElementById("radiusLbl").innerHTML='Region groß (25m)'
    } if (range==9){
        document.getElementById("radiusLbl").innerHTML='Überregional (überall)'
    }
}


//close modal windows by pushing the escape button
var modalWindow;
function keyDown(modWin){
    modalWindow=modWin;
}

document.onkeydown = function(evt) {
        evt = evt || window.event;

    if(evt.key === "Escape" &&modalWindow.style.display!=="none") {
        modalWindow.style.display = "none";
         mData=",clickedEscape,"+ modalWindow.id+","+Date.now()+",,,,,"
        fetchFunction(mData)
    }
}

//send user data to flask
function fetchFunction(mData){

    fetch(`${window.origin}/Aufgabe2`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(mData),
            cache: "no-cache",
            headers:  new Headers({
                "content-type": "application/json"
            })
        })
}



