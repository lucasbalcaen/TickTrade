/**
 * Created by giles on 4/01/2016.
 */
var geselecteerd =[];

function blurscherm() {

    var path =window.location.pathname;
    var id = path.replace("/overzichttickets/","");

    document.getElementById("geblurd").className+= "blurred";
    document.getElementById("popup").className= "visible popup";
    document.getElementById("formAangebodenId").value = id;

}

function selecteren(clicked){
   var klassen =clicked.className;
    if(klassen.indexOf("selected")>-1){
        clicked.className="ng-scope";
        var id = clicked.id;
        var index = geselecteerd.indexOf(id);
        if (index > -1) {
            geselecteerd.splice(index, 1);
            document.getElementById("formGeselecteerdId").value = geselecteerd;
        }
    }else{
        clicked.className+=" selected";
        var id = clicked.id;
        geselecteerd.push(id);
        document.getElementById("formGeselecteerdId").value = geselecteerd;

    }


}


