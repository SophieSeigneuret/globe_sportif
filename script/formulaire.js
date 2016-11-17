"use strict";


/**************************************--  VALIDATION DU FORMULAIRE  --**************************************/

const MIN_NB_CAR = 1;

$(function () {
    console.log("DOM construit");
    // brancher un listener sur l'evenement "submit" sur l,element <form>
    $("#form_resa").on("submit", valider_formulaire);
});


function valider_formulaire(event) {
    console.log("tentative de soumission");
    var formulaire_valide = true;  // par defaut on suppose que le form est valide
    //var inputs_info = $("#infos_client input");
    //inputs_info.each(function(){
    //    $(this).removeClass("error");
    //    $(this).next("error_msg").remove();
    //});


    /* VALIDER LES CHAMPS INPUT DE TYPE TEXT */
    $(":text").not("#adresse").each(function () {
        if ($(this).val().trim().length < MIN_NB_CAR) {
            $(this).addClass("error");  // ajoute la classe error
            console.log("this : ", this);
            if (!$(this).next().is(".error_msg")) {
                $(this).after("<p class='error_msg'>Champ obligatoire</p>");  // ajoute un paragraphe de message apres l'element input
            }
            formulaire_valide = false;
        } else {
            $(this).removeClass("error");
            $(this).next(".error_msg").remove();
        }
    });

    /* CHAMP ADRESSE MIN 10 CARACTERES */
    var champ_adresse = $("#adresse");
    if (champ_adresse.val().trim().length < 10) {
        champ_adresse.addClass("error");  // ajoute la classe error
        if (!champ_adresse.next().is(".error_msg")) {
            champ_adresse.after("<p class='error_msg'>10 caractères min</p>");  // ajoute un paragraphe de message apres l'element input
        }
        formulaire_valide = false;
    } else {
        champ_adresse.removeClass("error");
        champ_adresse.next(".error_msg").remove();
    }

    /* VALIDER COURRIEL */
    function validation_email(champ_courriel) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(champ_courriel);
    }

    var champ_courriel = $("#mail");
    console.log("champ courriel : ", champ_courriel);
    if (validation_email(champ_courriel.val()) == false) {
        champ_courriel.addClass("error");
        if (!champ_courriel.next().is(".error_msg")) {
            champ_courriel.after("<p class='error_msg'>Adresse invalide</p>");  // ajoute un paragraphe de message apres l'element input 
        } 
        formulaire_valide = false;
     } else {
        champ_courriel.removeClass("error"); 
        champ_courriel.next(".error_msg").remove(); 
    }

    // EN CONCLUSION : on soumet ou pas
    if (!formulaire_valide) {
        event.preventDefault();  // empeche la soumission
    }
}

/**************************************--  CHANGEMENT VALEURS TABLEAU  --**************************************/


/* nom du forfait s'affiche tout seul */
var forfait_choisi = document.getElementById("recap").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0];
console.log(forfait_choisi);
//for (var i=0 ; i < forfaits.length ; i++) {
//    forfait_choisi.textContent += forfaits.nom;
//}


/* changement nombre de participants */
var nb_participants = document.getElementById("nb_participants").value;
var quantite_participants = document.getElementById("recap").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[1];
quantite_participants.innerHTML = nb_participants;


/* changement nombre d'animaux */
var nb_animaux = document.getElementById("nb_animaux").getElementsByTagName("option").value;
var quantite_animaux = document.getElementById("recap").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[1];

if (forfaits.nbr_max_animaux_admis > 0) {  // si le nb d'animaux admis est > à 0
    quantite_animaux.innerHTML = nb_animaux.value;  // la quantité change
} else {  // si le nombre d'animaux admis = 0 alors
    var ligne_table_animaux = document.getElementById("recap").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1];
    ligne_table_animaux.style.display = none;  //la ligne du tableau disparait
    var resa_animaux = document.getElementById("animaux");
    resa_animaux.style.display = none;   // la ligne réservation nb d'animaux disparait
}


/* changement prix du forfait */
var montant_forfait = document.getElementById("recap").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[2];
montant_forfait.innerHTML = forfaits[1].prix + " $";


/* changement prix animal */
var montant_animal = document.getElementById("recap").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[2];
montant_animal.textContent = forfaits[1].prix_animal;


/* changement montant total */
var montant_total = document.getElementById("recap").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[2].getElementsByTagName("td")[1];
montant_total = (montant_forfait * nb_participants) + (montant_animal * quantite_animaux);

