let api_key = "$2a$10$BeJYGzlDN3Gj3tRbLA.68OyGqYifAJR7jX.udTRxvceaulwAwAYwS";
let characters, houses, spells;
getData();
let status;

let playing = false;
let score = 0;
let action;
let time = 60;
let correctanswer = 0;
let shareScore = '', encodedtext, urlMail, urlSMS, urlTwitter, urlWhatsapp;


$('#takequiz').click(function() {

    var text = $('#takequiz').html();
    //console.log(text);
    if(text === "TAKE QUIZ")
    {
        
        console.log(status);
        if(status === true)
        {
            console.log(status);
            $('.maincontainer').addClass('growmaincontainer');
            $('#takequiz').html('RELOAD PAGE');
        } 
    }
    else
    {
        window.location.reload();
    }
    
    
});


function getData() {
    let url_search = "https://www.potterapi.com/v1/characters?key="+api_key;
    fetch(url_search)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
        characters = data;
        console.log(characters);
        status = true;
    }).catch(function(err) {
        $('#error').html("<div class='alert alert-danger'>Error connecting using the Potter API. Check your internet connectivity or try again after sometime.</div>");
        
        status = false;
    });
    
    url_search = "https://www.potterapi.com/v1/spells?key="+api_key;
    fetch(url_search)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
        spells = data;
        console.log(spells);
        status = true;
    }).catch(function(err) {
        $('#error').html("<div class='alert alert-danger'>Error connecting using the Potter API. Check your internet connectivity or try again after sometime.</div>");
        
        status = false;
    });

    url_search = "https://www.potterapi.com/v1/houses?key="+api_key;
    fetch(url_search)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
        houses = data;
        console.log(data);
        status = true;
    }).catch(function(err) {
        $('#error').html("<div class='alert alert-danger'>Error connecting using the Potter API. Check your internet connectivity or try again after sometime.</div>");
        
        status = false;
    });
}

$('#startgame').click(function() {
    
    playing = true;
    time = 60;
    score = 0;
    
    setTimeout(function() {
        $('.startpage').css('display', 'none');
        $('.gamepage').css('display', 'block');

        $('#timevalue').html(time);
        $('#scoreval').html(score);
        showElement("score");
        showElement("timeremaining");


        generateQuestions();
        startCountdown();
    }, 500);
});


function startCountdown() {
    action = setInterval(function() {
        time -= 1;
        $('#timevalue').html(time);

        if(time == 0)
        {
            playing = false;
            stopCountdown();
            $('.gamepage').css('display', 'none');
            $('#showscore').html(score);
            $('#gameover').css('display', 'flex');

            hideElement("timeremaining");
            hideElement("correct");
            hideElement("wrong");
            
            shareScore += 'Hey! I scored ' +score+ ' in this Pottermania quiz! \n\n';
            shareScore += 'Visit Pottermania to play and beat my score: \nhttps://das-jishu.github.io/pottermania/';

            encodedtext = encodeURIComponent(shareScore);
            urlTwitter = 'https://twitter.com/intent/tweet?text=' + encodedtext;
            urlMail = "mailto:?body=" + encodedtext;
            urlWhatsapp = 'https://wa.me/?text='+encodedtext;
            urlSMS = 'sms:?body=' + encodedtext;
        }
    }, 1000);

}


function stopCountdown() {
    clearInterval(action);   
}

function hideElement(Id) {
    $("#"+Id).css('display', 'none');
}

function showElement(Id) {
    $("#"+Id).css('display', 'block');
}

function generateQuestions() {
    let rand = parseInt(Math.floor(Math.random() * 6)) + 1;
    let arr = housesQ(rand);
    //let arr = housesQ(4);
    correctanswer = arr[1];
    $('#questionbox').html(arr[0]);

    var correctpos = 1 + Math.floor(Math.random() * 4);
    $("#box"+correctpos).html(correctanswer);
    var k = 2;
    for (i = 1; i < 5; i++)
    {
        if(i != correctpos)
        {
            let x = arr[k++];
            $("#box"+i).html(x);
        }
    }

}

function spellsQ(x) {
    let list = [], question, c_ans;
    let spellsName = [], spellsEffect = [], spellsType = ['Spell', 'Hex', 'Jinx', 'Charm', 'Enchantment', 'Curse'];
    spells.forEach(function(data) {
        if(data.hasOwnProperty('spell')) {
            spellsName.push(data.spell);
        }
        if(data.hasOwnProperty('effect')) {
            spellsEffect.push(data.effect);
        }
    });

    if(x === 1) {
        let r;
        do {
            r = parseInt(Math.floor(Math.random() * spells.length));
        }
        while(!(spells[r].hasOwnProperty('spell') && spells[r].hasOwnProperty('effect')));

        question = "What type of effect does the incantation '"+spells[r].spell+"' have?";
        c_ans = spells[r].effect;
        list[0] = question;
        list[1] = c_ans;
        spellsEffect = shuffle(spellsEffect);
        let k = 0;
        if(c_ans !== spellsEffect[k]) {
            list[2] = spellsEffect[k++];
        }
        else {
            list[2] = spellsEffect[++k];
            k++;
        }
        if(c_ans !== spellsEffect[k]) {
            list[3] = spellsEffect[k++];
        }
        else {
            list[3] = spellsEffect[++k];
            k++;
        }
        if(c_ans !== spellsEffect[k]) {
            list[4] = spellsEffect[k++];
        }
        else {
            list[4] = spellsEffect[++k];
            k++;
        }
    }

    if(x === 2) {
        let r;
        do {
            r = parseInt(Math.floor(Math.random() * spells.length));
        }
        while(!(spells[r].hasOwnProperty('spell') && spells[r].hasOwnProperty('effect')));

        question = "Which incantation '"+spells[r].effect+"'?";
        c_ans = spells[r].spell;
        list[0] = question;
        list[1] = c_ans;
        spellsName = shuffle(spellsName);
        let k = 0;
        if(c_ans !== spellsName[k]) {
            list[2] = spellsName[k++];
        }
        else {
            list[2] = spellsName[++k];
            k++;
        }
        if(c_ans !== spellsName[k]) {
            list[3] = spellsName[k++];
        }
        else {
            list[3] = spellsName[++k];
            k++;
        }
        if(c_ans !== spellsName[k]) {
            list[4] = spellsName[k++];
        }
        else {
            list[4] = spellsName[++k];
            k++;
        }
    }

    if(x === 3) {
        let r;
        do {
            r = parseInt(Math.floor(Math.random() * spells.length));
        }
        while(!(spells[r].hasOwnProperty('spell') && spells[r].hasOwnProperty('type')));

        question = "What type of an incantation is '"+spells[r].spell+"'?";
        c_ans = spells[r].type;
        list[0] = question;
        list[1] = c_ans;
        spellsType = shuffle(spellsType);
        let k = 0;
        if(c_ans !== spellsType[k]) {
            list[2] = spellsType[k++];
        }
        else {
            list[2] = spellsType[++k];
            k++;
        }
        if(c_ans !== spellsType[k]) {
            list[3] = spellsType[k++];
        }
        else {
            list[3] = spellsType[++k];
            k++;
        }
        if(c_ans !== spellsType[k]) {
            list[4] = spellsType[k++];
        }
        else {
            list[4] = spellsType[++k];
            k++;
        }
    }
    
    return list;
}

function housesQ(x) {
    let list = [], question, c_ans;
    if (x === 1) {
        let founders = ['Goderic', 'Rowena', 'Helga', 'Salazar'];
        let r = parseInt(Math.floor(Math.random() * houses.length));
        question = "Who is the founder of the house '"+houses[r].name+"'?";
        c_ans = houses[r].founder.substring(0, houses[r].founder.indexOf(' '));
        list[0] = question;
        list[1] = c_ans;
        founders = shuffle(founders);
        founders.splice(founders.indexOf(c_ans), 1);
        list[2] = founders[0];
        list[3] = founders[1];
        list[4] = founders[2];
    }

    if (x === 2) {
        let houseghost = ["Nearly Headless Nick", "The Grey Lady", "The Bloody Baron", "The Fat Friar"];
        let r = parseInt(Math.floor(Math.random() * houses.length));
        question = "Which is the house ghost of the house '"+houses[r].name+"'?";
        c_ans = houses[r].houseGhost;
        list[0] = question;
        list[1] = c_ans;
        houseghost = shuffle(houseghost);
        houseghost.splice(houseghost.indexOf(c_ans), 1);
        list[2] = houseghost[0];
        list[3] = houseghost[1];
        list[4] = houseghost[2];
    }

    if (x === 3) {
        let mascots = ["badger", "serpent", "eagle", "lion"];
        let r = parseInt(Math.floor(Math.random() * houses.length));
        question = "Which animal is the mascot of the house '"+houses[r].name+"'?";
        c_ans = houses[r].mascot;
        list[0] = question;
        list[1] = c_ans;
        mascots = shuffle(mascots);
        mascots.splice(mascots.indexOf(c_ans), 1);
        list[2] = mascots[0];
        list[3] = mascots[1];
        list[4] = mascots[2];
    }

    if (x === 4) {
        let allcolors = [['scarlet', 'gold'], ['blue', 'bronze'], ['green', 'silver'], ['yellow', 'black']];
        let r = parseInt(Math.floor(Math.random() * houses.length));
        question = "Which of these colours is present in the emblem of the house '"+houses[r].name+"'?";
        c_ans = houses[r].colors[parseInt(Math.floor(Math.random() * 2))];
        list[0] = question;
        list[1] = c_ans;
        allcolors = shuffle(allcolors);
        var i;
        for(var j = 0; j < 4; j++)
        {
            if(allcolors[j][0] === houses[r].colors[0]) {
                i = j;
            }
        }
        allcolors.splice(i, 1);
        list[2] = allcolors[0][parseInt(Math.floor(Math.random() * 2))];
        list[3] = allcolors[1][parseInt(Math.floor(Math.random() * 2))];
        list[4] = allcolors[2][parseInt(Math.floor(Math.random() * 2))];
    }

    if (x === 5) {
        let allvalues = [['courage', 'bravery', 'nerve', 'chivalry'], ['intelligence', 'creativity', 'learning', 'wit'], ['ambition', 'cunning', 'leadership', 'resourcefulness'], ['hard work', 'patience', 'justice', 'loyalty']];
        let r = parseInt(Math.floor(Math.random() * houses.length));
        question = "Which of these is one of the values portrayed by the house '"+houses[r].name+"'?";
        c_ans = houses[r].values[parseInt(Math.floor(Math.random() * 4))];
        list[0] = question;
        list[1] = c_ans;
        allvalues = shuffle(allvalues);
        var i;
        for(var j = 0; j < 4; j++)
        {
            if(allvalues[j][0] === houses[r].values[0]) {
                i = j;
            }
        }
        allvalues.splice(i, 1);
        list[2] = allvalues[0][parseInt(Math.floor(Math.random() * 4))];
        list[3] = allvalues[1][parseInt(Math.floor(Math.random() * 4))];
        list[4] = allvalues[2][parseInt(Math.floor(Math.random() * 4))];
    }

    if (x === 6) {
        let allhousenames = ["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"];
        let r = parseInt(Math.floor(Math.random() * houses.length));
        question = "'"+houses[r].headOfHouse+"' is/was the head of which Hogwarts house?";
        c_ans = houses[r].name;
        list[0] = question;
        list[1] = c_ans;
        allhousenames = shuffle(allhousenames);
        allhousenames.splice(allhousenames.indexOf(c_ans), 1);
        list[2] = allhousenames[0];
        list[3] = allhousenames[1];
        list[4] = allhousenames[2];
    }

    return list;
}

function charactersQ(x) {

}


for (i = 1; i < 5; i++)
{
    $("#box"+i).click(function() {
        if (playing == true)
        {
            if (this.innerHTML == correctanswer)
            {
                score++;
                $("#scoreval").html(score);
                showElement("correct");
                hideElement("wrong");
                
                setTimeout(function() {
                    hideElement("correct");
                }, 1000);

                setTimeout(function() {
                    generateQuestions();
                }, 500);
            }

            else
            {
                showElement("wrong");
                hideElement("correct");
                setTimeout(function() {
                    hideElement("wrong");
                }, 1000);

                setTimeout(function() {
                    generateQuestions();
                }, 500);
                
            }
        }
    });
}


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}



$('#restartgame').click(function() {
    stopCountdown();
    playing = false;
    score = 0;
    time = 60;
    $('.startpage').css('display', 'flex');
    $('.gamepage').css('display', 'none');
});

$('#playagain').click(function() {
    stopCountdown();
    playing = false;
    score = 0;
    time = 60;
    $('.startpage').css('display', 'flex');
    $('.gamepage').css('display', 'none');
});

//console.log(score);

$('#twi').click(function() {
window.open(urlTwitter, '_blank');
});

$('#ail').click(function() {
    window.open(urlMail, '_blank');
});

$('#wha').click(function() {
    window.open(urlWhatsapp, '_blank');
});

$('#sms').click(function() {
    window.open(urlSMS, '_blank');
});
