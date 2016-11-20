"use strit";

/**************************************--  NAVIGATION  --**************************************/

$(function(){
    console.log("DOM construit");

     //console.log(encodeURI('?categorie=Destination Surf'));
     //console.log(encodeURI('?categorie=Espaces sous-marins'));
     //console.log(encodeURI('?categorie=Snow attitude'));
     //console.log(encodeURI('?categorie=Randonnée et sac à dos'));

     console.log('URL de la page : ' , window.location);
});

function getParameterByName(name) {
    var match = new RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}


//var categorie_url;

//$(function(){
//    // Est-ce qu'il y a un paramètre dans l'URL ?
//    categorie_url = getParameterByName('categorie');
//    console.log('Valeur de la categorie : ' , categorie_url);
//    afficher_catalogue();
//});

//function afficher_catalogue() {
//    var li_forfaits_surf = $(".menu_surf"); // Le li des forfaits surf
//    var li_forfaits_plongee = $(".menu_plongee"); // Le li des forfaits plongée
//    var li_forfaits_snow = $(".menu_snow"); // Le li des forfaits snow
//    var li_forfaits_rando = $(".menu_rando"); // Le li des forfaits rando
//    jQuery.each(forfaits, function(index, forfait){
//        if ((null == categorie_url) || (forfait.categorie.toLowerCase() == categorie_url.toLowerCase())) {
//            // console.log(index, forfait);
//            var li_item = $('<li>').text(forfait.nom);
//            switch (forfait.categorie.toLowerCase()) {
//                case 'surf':
//                    li_item.appendTo(li_forfaits_surf);
//                    break;
//                case 'plongée':
//                    li_item.appendTo(li_forfaits_plongee);
//                    break;
//                case 'snow':
//                    li_item.appendTo(li_forfaits_snow);
//                    break;
//                case 'rando':
//                    li_item.appendTo(li_forfaits_rando);
//                    break;
//                default:
//                    console.log('Error categorie inconnue')
//            }
//            // li_forfait_jQ.css('background-color','blue');
//        }
//    });
//}