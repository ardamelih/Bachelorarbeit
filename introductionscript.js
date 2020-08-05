  

function enableWeiter(val){
    if (val.checked===true){
        document.getElementById("weiter").style="display: none;"
                        document.getElementById("weiter").disabled=true;    
 document.getElementById("weiter2").style="font-size : 26px; color: darkgrey;       9%; height: 36px; border-radius: 7px;color: #000000;display: block;"
                        document.getElementById("weiter2").disabled=false;    

    }
    else{ document.getElementById("weiter").style=" font-size : 26px; color: darkgrey;       9%; height: 36px; border-radius: 7px;color: #999;display: block;"
                        document.getElementById("weiter").disabled=false;    
 document.getElementById("weiter2").style="display: none;"
                        document.getElementById("weiter2").disabled=true;    


    }
}
$(window).bind("pageshow", function() {
  document.getElementById("einverstandenCheckbox").checked=false;
});

function showAlert(){
    swal("Bitte checken Sie zuerst das Kästchen.")}



    

