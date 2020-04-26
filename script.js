
$('#takequiz').click(function() {

    var text = $('#takequiz').html();
    console.log(text);
    if(text === "TAKE QUIZ")
    {
        $('.maincontainer').addClass('growmaincontainer');
        $('#takequiz').html('RELOAD PAGE');
    }
    else
    {
        window.location.reload();
    }
    
    
});