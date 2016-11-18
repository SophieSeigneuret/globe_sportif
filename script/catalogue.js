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

                    .append('<a href="#"><img src="' + forfait.img_catalogue + '" alt="photo forfait" /></a>')
                    .append('<div class="info_complet"><h2><a href="#">' + forfait.nom + '</a></h2></div>');
                    $('<div class="info_forfait">')
                        .appendTo(li_item.children('.info_complet'))
                        .append('<div class = "lieu">' + forfait.ref_forfait + '<span class="numero">' + forfait.nb_forfait + ' </span></div></div>')
                        .append('<p>' + forfait.info_cat + '</p>');
                    $('<div class="contact">')
                        .appendTo(li_item.children('.info_complet'))
                        .append('<div><h4> "Prix par personne : $"' + forfait.prix + '</h4></div>')
                        .append('<div><button class="bouton_cata"><a href="reservation.html?forfait_id=' + index + '">Réserver</a></button></div></div>');


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

