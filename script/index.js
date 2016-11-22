/**
 * Created by acosta on 11/19/16.
 */

$(function () {
    console.log("jQuerry branche et DOM chargue");
    // cacher_info();
});

/* ------------------------------    CARROUSEL   --------------------------  */


$(document).ready(function(){

    // Creation d'objet banner. Acceder aux images
    var banner = {
        parent: $('#banner'),
        nb_slides: $('#banner').children('.slide').length,
        position: 1
    };

    // Etablir que le premier slide apparaîtra deplacé
    banner.parent.children('.slide').first().css({
        'left': 0
    });

    // Fonction pour calculer l"hauteur qu'aura le conteneur parent
    var hauteur_banner = function(){
        var hauteur = banner.parent.children('.slide').outerHeight();
        banner.parent.css({
            'height': hauteur + 'px'
        });
    };
    // Fonction execute pour calculer les hauteurs
    hauteur_banner();

    // S'on change de taille d'ecran va s'executer cette fonction pour savoir la nouvelle taille du element pere
    $(window).resize(function(){
        hauteur_banner();
    });

    // Fleche suivant

    $('#banner-next').on('click', function(e){
        e.preventDefault();

        if (banner.position < banner.nb_slides){
            // Assurer que tous les éléments de l'enfant
            // (non) .active sont positionnés à droite
            banner.parent.children().not('.active').css({
                'left': '100%'
            });
            //Suprimer la classe active et la mettre au suivant element. Animer
            $('#banner .active').removeClass('active').next().addClass('active').animate({
                'left': 0
            });

            //Animer le slide precedent pour qu'il se deglice vers la gouche
            $('#banner .active').prev().animate({
                'left': '-100%'
            });

            banner.position = banner.position + 1;
        } else {
            //On fait que le slide active (c'est à dire le dernier) s'anime vers la droite
            $('#banner .active').animate({
                'left': '-100%'
            });

            //Selectionner tous les slides que n'ont pas la classe .active
            //et les positioner à droite
            banner.parent.children().not('.active').css({
                'left': '100%'
            });

            //Eliminer la classe active et la mettre au premier element. Apres animer
            $('#banner .active').removeClass('active');
            banner.parent.children().first().addClass('active').animate({
                'left': 0
            });

            // Réinitialiser la position 1
            banner.position = 1;
        }
    });

    // Fleche presedent
    $('#banner-prev').on('click', function(e){
        e.preventDefault();

        if (banner.position > 1){

            // Assurer que tous les éléments de l'enfant
            // (non) .active sont positionnés à gauche
            banner.parent.children().not('.active').css({
                'left': '-100%'
            });
            //Deplacer le slide active de gouche à droite
            $('#banner .active').animate({
                'left': '100%'
            });
            //Eliminer la classe active et la mettre au slide anterieur. Apres animer
            $('#banner .active').removeClass('active').prev().addClass('active').animate({
                'left': 0
            });

            // Réinitialiser la position 1
            banner.position = banner.position - 1;
        } else {
            // Assurer que les slides commencent à gouche
            banner.parent.children().not('.active').css({
                'left': '-100%'
            });
            //Animer le slide active vers la droite
            $('#banner .active').animate({
                'left': '100%'
            });
            //Eliminer la classe active et la mettre au premier element. Apres animer
            $('#banner .active').removeClass('active');
            banner.parent.children().last().addClass('active').animate({
                'left': 0
            });
            //Réinitialiser la position 1
            banner.position = banner.nb_slides;
        }
    });
});

/* ------------------------------    IMAGES SLIDE AU BAS DE LA PAG   --------------------------  */

$(document).ready(function() {
    $('.slide').hover(
        function(){
            $(this).find('.caption').slideDown(250);
        },
        function(){
            $(this).find('.caption').slideUp(250);
        }
    );
});




