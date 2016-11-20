/**
 * Created by sophieseigneuret on 09/11/2016.
 */
"use strict";


// AFFICHER PAGE DÉTAIL
var indice_forfait_url;
var forfait_voulu;


function ecrire_detail(forfait_id) {
    // création des onglets page détail
    $("#onglets").tabs();

    console.log('URL de la page : ', window.location);
    // Est-ce qu'il y a l'indice du forfait dans l'URL ?
    indice_forfait_url = getParameterByName('forfait_id');
    // Se protéger d'un indice de forfait absent ou invalide (cad n'est pas un nombre entier compris entre 0 et P86_TP_forfaits.length-1)
    //if ((null == indice_forfait_url)  // Absent
    //    || isNaN(parseInt(indice_forfait_url))  // N'est pas un nombre entier
    //    || ((parseInt(indice_forfait_url) < 0) || parseInt(indice_forfait_url) > forfaits.length-1)) // N'est pas dans l'intervalle
    //{
    //    // Redirection (Javascript) vers la page accueil
    //    console.log('hostname : ', window.location.hostname);
    //    console.log('pathname : ', window.location.pathname);
    //    var url_accueil = (window.location.protocol + '//' + window.location.hostname + window.location.pathname).replace('reservation','index');
    //    console.log('url page accueil : ', url_accueil);
    //    window.location.assign(url_accueil);
    //    //window.location.assign('http://p86/_6Ab_P86_A16/en_classe/j14/forfaits_jQuery/index.html');
    //}
    console.log('Index du forfait  : ', indice_forfait_url);
    forfait_voulu = forfaits[forfait_id];


    function initialisation_detail() {
        // AJOUT DESCRIPTIF PAGE DETAIL
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
    }

    initialisation_detail();

}
