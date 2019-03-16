$(document).ready( () => {
    //Load the first page

    loadRegisterPage();

    $('#multiplayer').click(() => {
        $('#body').empty();
        loadMultiplayerPage();
    });

    $('#prob').click(() => {
        $('#body').empty();
        loadProbsPage();
    });

});

function loadMultiplayerPage(){
    //Load the page Ajax
    $('#body').load('/pages/multiplayer.html');
    //Re-Load the js files recognize the new content
    $.getScript('/js/kenoSelectNumbersTable.js');
    $.getScript('/js/betPaying.js');
    $.getScript('/js/multiplayer.js');
}

function loadProbsPage(){
    //Load the Page Ajax
    $('#body').load('/pages/probs.html');
    
    //Re-Load the js files to recognize the new content   
    $.getScript('/js/kenoSelectNumbersTable.js', () => $.getScript('/js/probs.js'));

    
}


function loadRegisterPage(){
     //Load the Page Ajax
     $('#body').load('/pages/register.html');
     $.getScript('/js/register.js');
}