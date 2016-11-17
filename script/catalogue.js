/**
 * Created by sophieseigneuret on 09/11/2016.
 */
"use strict";

var categorie_url;

$(function(){
    console.log('URL de la page : ' , window.location);
    // Est-ce qu'il y a un paramètre dans l'URL ?
    categorie_url = getParameterByName('categorie');
    console.log('Valeur de la categorie : ' , categorie_url);
    afficher_catalogue();
});

/**
 * Sert à la page catalogue pour afficher le catalogue (par categorie)
 */
function afficher_catalogue() {
    var ul_forfaits_surf = $('#dest_surf'); // Le ul des forfaits nature
    var ul_forfaits_sous_marins = $('#sous_marins'); // Le ul des forfaits croisieres
    var ul_forfaits_snow = $('#snow_attitude'); // Le ul des forfaits sports hiver
    var ul_forfaits_randonnee = $('#randonnee'); // Le ul des forfaits sports hiver
    // console.log(ul_forfaits_randonnee, ul_forfaits_snow, ul_forfaits_sous_marins, ul_forfaits_surf);

    jQuery.each(forfaits, function(index, forfait){
        if ((null == categorie_url) || (forfait.categorie.toLowerCase() == categorie_url.toLowerCase())) {
            // console.log(index, forfait);
            var li_item =
                $('<li>')

                    .append('<img src="' + forfait.photo + '" alt="photo forfait" />')
                    .append('<h2>' + forfait.nom + '</h2>')
                    .append('<p>' + forfait.description + '</p>')
                    .append('<a href="reservation.html?forfait_id=' + index + '">Réserver</a>');


            switch (forfait.categorie) {
                case 'Destination Surf':
                    li_item.appendTo(ul_forfaits_surf);
                    break;
                case 'Espaces sous-marins':
                    li_item.appendTo(ul_forfaits_sous_marins);
                    break;
                case 'Snow attitude':
                    li_item.appendTo(ul_forfaits_snow);
                    break;
                case 'Randonnée et sac à dos':
                    li_item.appendTo(ul_forfaits_randonnee);
                    break;
                default:
                    console.log('Error categorie inconnue')
            }
            // li_forfait_jQ.css('background-color','blue');
        }
    });
}

