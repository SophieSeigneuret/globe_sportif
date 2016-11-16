'use strict';
/* Vérifier la présence de jQuery */
console.log($);

/* Au DOMContentLoadsed*/

$(document).ready(function () {
    $('.accordion-toggle').on('click', function(event){
        event.preventDefault();
        // creation variables
        var accordion = $(this);
        var accordionContent = accordion.next('.accordion-content');
        var accordionToggleIcon = $(this).children('.toggle-icon');

        // toggle accordion link open class
        accordion.toggleClass("open");
        // toggle accordion content
        accordionContent.slideToggle(250);

        // change plus/minus icon
        if (accordion.hasClass("open")) {
            accordionToggleIcon.html("<i class='fa fa-minus-circle'></i>");
        } else {
            accordionToggleIcon.html("<i class='fa fa-plus-circle'></i>");
        }
    });
});



