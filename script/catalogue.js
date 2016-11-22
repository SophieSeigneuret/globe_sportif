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

    // redirection vers la page d'accueil si url non reconnu
    if (-1 == categories.indexOf(categorie_url)) {
        window.location.href = "index.html";
    }

    afficher_catalogue();

    /* MODAL BOX */
    $(".modal_box_background").on("click", function () {
        $(this).parent().fadeOut(100, function () {
            $(this)
                .find("mb_item")
                .hide();
        });
    });

    // retour à la page catalogue depuis la page detail
    //$("#bouton_retour").on("click", function () {
    //    $("#page_detail").hide();
    //    });

    //*********************************************   function accordeon
    var num_categorie = 0;
    switch (categorie_url){
        case "Destination Surf":
            num_categorie = 0;
            break;
        case "Espaces sous-marins":
            num_categorie = 1;
            break;
        case "Snow attitude":
            num_categorie = 2;
            break;
        case "Randonnée et sac à dos":
            num_categorie = 3;
            break;
        default:
            num_categorie = 0;
    }

    $( "#accordion" ).accordion({
        active: num_categorie
    });


});

/**
 * Sert à la page catalogue pour afficher le catalogue (par categorie)
 */
function afficher_catalogue() {
    var ul_forfaits_surf = $('#dest_surf'); // Le ul des forfaits surf
    var ul_forfaits_sous_marins = $('#sous_marins'); // Le ul des forfaits plongée
    var ul_forfaits_snow = $('#snow_attitude'); // Le ul des forfaits snow
    var ul_forfaits_randonnee = $('#randonnee'); // Le ul des forfaits rando
    // console.log(ul_forfaits_randonnee, ul_forfaits_snow, ul_forfaits_sous_marins, ul_forfaits_surf);

    jQuery.each(forfaits, function(index, forfait){
            var li_item =
                $('<li>')

                    .append('<a id=\"'+index+'\" class="clic_detail" href="catalogue.html?forfait_id=' + index + '"><img src="' + forfait.img_catalogue + '" alt="photo forfait" /></a>')
                    .append('<div class="info_complet"><h2><a id=\"'+index+'\" class="clic_detail" href="catalogue.html?forfait_id=' + index + '">' + forfait.nom + '</a></h2></div>');
                    $('<div class="info_forfait">')
                        .appendTo(li_item.children('.info_complet'))
                        .append('<div class = "lieu">' + forfait.ref_forfait + '<span class="numero">' + forfait.nb_forfait + ' </span></div></div>')
                        .append('<p>' + forfait.info_cat + '</p>');
                    $('<div class="contact">')
                        .appendTo(li_item.children('.info_complet'))
                        .append('<div><h4> "Prix par personne : $"' + forfait.prix + '</h4></div>')
                        .append('<div><button class="bouton_cata"><a id=\"'+index+'\" class="clic_detail" href="catalogue.html?forfait_id=' + index + '">Voir détail</a></button></div></div>');


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
        console.log("Index ", index);
    });

    /* affiche la modal box page detail */
    $(".clic_detail").on("click", function (event){
        event.preventDefault();
        ecrire_detail($(this).attr("id"));  // ajoute la fonction ecrire_detail (sur detail.js) et attribue l'index pour ouvrir le bon forfait
            $(".page_detail")
                .addClass("mb_item")
                .show()
                .parent()
                .fadeIn(100);
    });

}



