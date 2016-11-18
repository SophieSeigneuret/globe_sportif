"use strict";


/**************************************--  VALIDATION DU FORMULAIRE  --**************************************/

const MIN_NB_CAR = 1;
var forfait_voulu = forfaits[2];

$(function () {
    console.log("DOM construit");
    var formulaire = $("#form_resa");
    // brancher un listener sur l'evenement "submit" sur l'element <form>
    formulaire.on("submit", valider_formulaire);

    /* DATEPICKER */
    // enlever le datepicker par défaut de Chrome
    // $('input[type="date"]').attr('type','text');
    // ajouter 1 jour au datepicker début et fin de saison
    var min_date = new Date(forfaits[1].debut_saison);
    min_date.setDate(min_date.getDate()+1);
    var max_date = new Date(forfaits[1].fin_saison);
    max_date.setDate(max_date.getDate()+1);
    // rajout du datepicker jQuery
    $("#datepicker").datepicker({
        numberOfMonths: 2,
        showButtonPanel: true,
        minDate: min_date,
        maxDate: max_date
    });

    /* SELECT NUMBER */
    $("#nb_animaux, #nb_participants")
        .selectmenu()
        .selectmenu( "menuWidget" )
        .addClass( "overflow" );

    /* CHANGEMENT VALEURS */
    changement_valeurs();  //
    formulaire.find(".selector").on("selectmenuchange", changement_valeurs);

    /* MODAL BOX */
    $(".modal_box_background").on("click", function () {
        $(this).parent().fadeOut(100, function () {
            $(this)
                .find("mb_item")
                .hide();
        });
    });

});




function valider_formulaire(event) {
    console.log("tentative de soumission");
    var formulaire_valide = true;  // par defaut on suppose que le form est valide

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

    /* VALIDER TELEPHONE */
    function validation_tel(champ_tel) {
        var re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return re.test(champ_tel);
    }

    var champ_tel = $("#phone");
    if (validation_tel(champ_tel.val()) == false) {
        champ_tel.addClass("error");
        if (!champ_tel.next().is(".error_msg")) {
            champ_tel.after("<p class='error_msg'>Numéro invalide</p>");  // ajoute un paragraphe de message apres l'element input 
        }
        formulaire_valide = false;
    } else {
        champ_tel.removeClass("error");
        champ_tel.next(".error_msg").remove();
    }


    // EN CONCLUSION : on soumet ou pas
    if (!formulaire_valide) {
        event.preventDefault();  // empeche la soumission
    }
}





/**************************************--  CHANGEMENT VALEURS TABLEAU  --**************************************/

function changement_valeurs() {
    console.log("cette valeur a changé : " , this);

    // quantité personnes (dans le tableau) = nb de participants selectionnés dans le menu déroulant
    var selection_participants = $("#nb_participants option:selected").text();
    $("#nb_personnes").html(selection_participants);

    // quantité d'animaux (dans le tableau) = nb d'animaux selectionnés dans le menu déroulant
    var selection_animaux = $("#nb_animaux option:selected").text();
    $("#nb_betes").html(selection_animaux);

    /* changement montant total */
    var somme = ((forfait_voulu.prix * selection_participants) + (forfait_voulu.prix_animal * selection_animaux));
    $("#total").text(somme + " $");
    console.log(somme);
}


/* nom du forfait, prix forfait et prix animal s'affichent tout seul */
$("#nom_forfait").text(forfait_voulu.nom);
$("#prix_forfait").text(forfait_voulu.prix + " $");
$("#prix_animal").text(forfait_voulu.prix_animal + " $");


/* disparition ligne d'animaux si nb animaux admis = 0 */
if (forfait_voulu.nbr_max_animaux_admis == 0) {
    var ligne_table_animaux = $("#recap tbody tr").eq(1);
    ligne_table_animaux.hide();  //la ligne du tableau disparait
    var resa_animaux = $("#animaux");
    resa_animaux.hide();   // la ligne réservation nb d'animaux disparait
}




/**************************************--  MODAL BOX  --**************************************/

$("#reserver").on("click", function(){
       $("#confirm_resa")
           .addClass("mb_item")
           .show()
           .parent()
           .fadeIn(100);
});



