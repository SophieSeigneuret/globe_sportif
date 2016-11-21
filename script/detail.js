/**
 * Created by sophieseigneuret on 09/11/2016.
 */
"use strict";


// AFFICHER PAGE DÉTAIL
var forfait_voulu;


function ecrire_detail(forfait_id) {
    // création des onglets page détail
    $("#onglets").tabs();

    forfait_voulu = forfaits[forfait_id];

    function initialisation_detail() {
        // changement du lien du bouton réserver de la page détail pour avoir la bonne destination (bon forfait sur la page formulaire)
        $("#vers_formulaire").attr("href", "formulaire.html?forfait_id=" + forfait_id);
        // bouton retour à la page catalogue (page détail)
        $("#bouton_retour").attr("href", "catalogue.html?categorie=" + forfait_voulu.categorie);

        // AJOUT DESCRIPTIF PAGE DETAIL
        // photo forfait
        document.querySelector("#photo1_forfait").innerHTML = forfait_voulu.photo1;
        document.querySelector("#photo2_forfait").innerHTML = forfait_voulu.photo2;
        document.querySelector("#photo3_forfait").innerHTML = forfait_voulu.photo3;
        // nom categorie
        document.querySelector("#informations_forfait h2").textContent = forfait_voulu.categorie.toUpperCase();
        // nom forfait
        document.querySelector("#descriptif h3").innerHTML = forfait_voulu.nom;
        // date de début de saison
        document.querySelector("#descriptif p:first-of-type span:first-of-type").innerHTML = forfait_voulu.debut_saison;
        // date de fin de saison
        document.querySelector("#descriptif p:first-of-type span:last-of-type").innerHTML = forfait_voulu.fin_saison;
        // durée du séjour
        document.querySelector("#descriptif p:nth-of-type(2) span").innerHTML = forfait_voulu.duree;
        // animaux autorisés
        document.querySelector("#descriptif p:nth-of-type(3) span").innerHTML = forfait_voulu.nbr_max_animaux_admis;
        // places restantes
        document.querySelector("#descriptif p:nth-of-type(4) span").innerHTML = forfait_voulu.places_dispo;
        // prix par personne
        document.querySelector("#descriptif h4 span").innerHTML = forfait_voulu.prix;

        // AJOUT DÉTAILS ONGLETS
        // le lieu
        document.querySelector("#le_lieu p").innerHTML = forfait_voulu.lieu;
        // les infos pratiques
        document.querySelector("#infos_pratiques p").innerHTML = forfait_voulu.infos;
        // l'hébergement
        document.querySelector("#hebergement p").innerHTML = forfait_voulu.hebergement;
        // niveau
        document.querySelector("#niveau p").innerHTML = forfait_voulu.niveau;
    }

    initialisation_detail();
}




$(document).ready(function() {

    $("#owl-demo").owlCarousel({

        navigation : true, // Show next and prev buttons
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem:true

        // "singleItem:true" is a shortcut for:
        // items : 1,
        // itemsDesktop : false,
        // itemsDesktopSmall : false,
        // itemsTablet: false,
        // itemsMobile : false

    });

});


