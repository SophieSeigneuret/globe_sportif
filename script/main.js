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
