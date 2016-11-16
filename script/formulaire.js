"use strict";


const MIN_NB_CAR = 1;

$(function () {
    console.log("DOM construit");
    // brancher un listener sur l'evenement "submit" sur l,element <form>
    $("#form_resa").on("submit", valider_formulaire);
});


function valider_formulaire(event) {
    console.log("tentative de soumission");
    var formulaire_valide = true;  // par defaut on suppose que le form est valide

    /* VALIDER LES CHAMPS INPUT DE TYPE TEXT */
    $(":text").not("#adresse").each(function () {
        if ($(this).val().trim().length < MIN_NB_CAR) {
            $(this).addClass("error");  // ajoute la classe error
            console.log("this : ", this);
            if ( ! $(this).next().is(".error_msg")) {
                $(this).after("<p class='error_msg'>Champ obligatoire</p>");  // ajoute un paragraphe de message apres l'element input
            }
            formulaire_valide = false;
        } else {
            $(this).removeClass("error");
        }
    });

    /* CHAMP ADRESSE MIN 10 CARACTERES */
    var champ_adresse = $("#adresse");
    if (champ_adresse.val().trim().length < 10) {
        champ_adresse.addClass("error");  // ajoute la classe error
        if ( ! champ_adresse.next().is(".error_msg")) {
            champ_adresse.after("<p class='error_msg'>10 caractères min</p>");  // ajoute un paragraphe de message apres l'element input
        }
        formulaire_valide = false;
    } else {  //
        champ_adresse.removeClass("error");
        champ_adresse.next(".error_msg").remove();
    }

    // EN CONCLUSION : on soumet ou pas
    if (!formulaire_valide) {
        event.preventDefault();  // empeche la soumission
    }

}