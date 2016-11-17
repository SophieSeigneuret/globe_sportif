/**
 * Created by sophieseigneuret on 09/11/2016.
 */
"use strict";


// CREATION DES ONGLETS PAGE DETAIL
$( function() {
    $( "#onglets" ).tabs();
} );


// AJOUT DESCRIPTIF PAGE DETAIL
var forfait_voulu = forfaits[2];
// photo forfait
document.querySelector("#informations_forfait div:first-of-type").innerHTML = forfait_voulu.photo;
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


