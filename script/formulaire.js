"use strict";


/**************************************--  VALIDATION DU FORMULAIRE  --**************************************/

const MIN_NB_CAR = 1;
var forfait_id = getParameterByName('forfait_id');
var forfait_voulu = forfaits[forfait_id];
var formulaire_valide = true;  // par defaut on suppose que le form est valide
var ischecked;

$(function () {
    console.log("DOM construit");
    var formulaire = $("#form_resa");
    // brancher un listener sur l'evenement "submit" sur l'element <form>
    formulaire.on("submit", valider_formulaire);

    /* DATEPICKER */
    // ajouter 1 jour au datepicker début et fin de saison
    var min_date = new Date(forfait_voulu.debut_saison);
    min_date.setDate(min_date.getDate()+1);
    var max_date = new Date(forfait_voulu.fin_saison);
    max_date.setDate(max_date.getDate()+1);
    // rajout du datepicker jQuery
    $("#datepicker").datepicker({
        showOn: 'button',
        buttonImage: 'images/calendar_icon.gif',
        numberOfMonths: 2,
        showButtonPanel: true,
        dateFormat: "dd-mm-yy",
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

    // retour à la page d'accueil lorsqu'on clique sur annuler
    $("#annuler").on("click", function() {
        window.location.href = "index.html";
    });

});




function valider_formulaire(event) {
    console.log("tentative de soumission");
    console.log("Event 1 = ", event);
    formulaire_valide = true;
    /* VALIDER LES CHAMPS INPUT DE TYPE TEXT */
    $(":text").not("#adresse").not("#datepicker").each(function () {
        if ($(this).val().trim().length < MIN_NB_CAR) {
            $(this).addClass("error");  // ajoute la classe error
            console.log("this : ", this);
            if (!$(this).next().is(".error_msg")) {
                $(this).after("<p class='error_msg'>Champ obligatoire</p>");  // ajoute un paragraphe de message apres l'element input
            }
            console.log("formulaire valide des inputs ");
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
        console.log("formulaire valide adresse ");
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
        console.log("formulaire valide mail ");
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
        console.log("formulaire valide tel ");
        formulaire_valide = false;
    } else {
        champ_tel.removeClass("error");
        champ_tel.next(".error_msg").remove();
    }

    /* VALIDER DATEPICKER */
    var champ_datepicker = $("#datepicker");
    var img_calendrier = $("#resa_client button");
        if (champ_datepicker.val().trim().length < MIN_NB_CAR) {
            champ_datepicker.addClass("error");  // ajoute la classe error
            if (!champ_datepicker.next().is(".error_msg")) {
                img_calendrier.after("<p class='error_msg'>Champ obligatoire</p>");  // ajoute un paragraphe de message apres l'element input
            }
            formulaire_valide = false;
        } else {
            champ_datepicker.removeClass("error");
            img_calendrier.next(".error_msg").remove();
        }


    // EN CONCLUSION : on soumet ou pas
    if (formulaire_valide) {
            $("#confirm_resa")
                .addClass("mb_item")
                .show()
                .parent()
                .fadeIn(100);
        }
    event.preventDefault();  // empeche la soumission

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


// disparition ligne d'animaux si nb animaux admis égal 0
if (forfait_voulu.nbr_max_animaux_admis == 0) {
    var ligne_table_animaux = $("#recap tbody tr").eq(1);
    ligne_table_animaux.hide();  //la ligne du tableau disparait
    var resa_animaux = $("#animaux");
    resa_animaux.hide();   // la ligne réservation nb d'animaux disparait
}




/**************************************--  MODAL BOX  --**************************************/

//if (formulaire_valide) {
//    ("#reserver").on("click", function () {
//        $("#confirm_resa")
//            .addClass("mb_item")
//            .show()
//            .parent()
//            .fadeIn(100);
//    });
//}

//$("#reserver").on("click", function (){
//    console.log("modal box");
//    if (formulaire_valide) {
//       $("#confirm_resa")
//           .addClass("mb_item")
//           .show()
//           .parent()
//           .fadeIn(100);
//    }
//});



//// ouvrir la boite de dialogue seulement si tous les champs sont remplis
//function soumission_formulaire (event) {
//    console.log("test");
//    valider_formulaire(event);
//    console.log("le formulaire est-il valide ", formulaire_valide);
//    if (formulaire_valide) {
//        $("#confirm_resa")
//            .addClass("mb_item")
//            .show()
//            .parent()
//            .fadeIn(100);
//    }
//}