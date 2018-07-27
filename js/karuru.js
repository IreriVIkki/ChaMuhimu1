var originalSysText = "The inline form above feels 'compressed ', and will look much better with Bootstrap's spacing utilities. The following example adds a right margin (.mr-sm-2) to each input on all devices (small and up). And a margin bottom class (.mb-2) is used to style the input field when it breaks (goes from horizontal to vertical due to not enough space/width):"

function initialText(text) {
    $('#currentWord').text(text.split(' ')[0] + ' ')
    $('#otherWords').text(text.split(' ').splice(1).join(' '))
}

function checkAccuracy(userInput, sysCompare){
    if (userInput === sysCompare){
        $('#currentWord').addClass('text-success');
        $('#currentWord').removeClass('text-danger');
        $('.userInput').addClass('text-info');
        $('.userInput').removeClass('text-danger');
    } else {
        $('#currentWord').removeClass('text-success');
        $('#currentWord').addClass('text-danger');
        $('.userInput').addClass('text-danger');
        $('.userInput').removeClass('text-info');
    }
}

function wordFinished(userInput, sysText, originalSysText) {
    var space = " "
    var userSpace = ((userInput.split('')).splice(-1))[0]
    var sysChars = originalSysText.split('');
    var sysSpace = (sysChars.splice(0, userInput.length)).splice(-1)[0]
    if (userInput.length <= 1){
        $('#currentWord').text(originalSysText.split(' ')[0])
        $('#otherWords').text(originalSysText.split(' ').splice(1).join(' '))

    }
    if (sysSpace === space && space === userSpace) {
        var sysWords = sysText.split(' ');
        var firstWord = sysWords[0]
        var otherWords = (sysWords.splice(1)).join(' ')
        $('#currentWord').text(firstWord)
        $('#otherWords').text(otherWords)
    }
}

function wordsPerMinute(userInput){
    var time = parseInt($('#timeDisplay').text());
    var words = (userInput.split(' ').length)-1;
    // console.log(words)
    console.log(time)
    var wpm = words/time;
    $('.wpm').text(words);
}

// var timerId = setInterval(countdown, 1000);

function startTimer(duration, display) {
    var start = Date.now(),
        diff,
        seconds;
    function timer() {
        diff = duration - (((Date.now() - start) / 1000) | 0);
        seconds = (diff % 60) | 0;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        console.log(seconds)
        console.log(typeof(seconds))
        if ((seconds !== '00')){
            display.textContent = seconds;
        } else if (seconds === 55){
            clearInterval()
            showModal()
        }
        if (diff <= 0) {
            start = Date.now() + 1000;
        }
    };
    timer();
    setInterval(timer, 1000);
}

// $(selector).text();

$(document).ready(function () {
    $("#slide").click(function () {
        $("#panel").slideToggle(5000);
    });
});

window.onload = function () {
    initialText(originalSysText)

    $('.userInput').on('focus', function () {
        // if ($('.userInput').val() != '') {
            var time = 60;
                display = document.querySelector('#timeDisplay');
            startTimer(time, display);
        // }
    });
};
function showModal (){
    $('#yourScore').text('45 WPM YOU CAN DO BETTER!!!!!');
    $('#youWin').modal('show');
}

function goBack() {
    window.history.back();
}

$(document).ready(function () {
    
    $('.userInput').on('keyup', function (e) {
        if (e.key === 'Backspace'){
            console.log('works')
            var userInput = $(this).val();
        }else{
            var userInput = $(this).val();
        }
        var sysText = ((originalSysText.split('')).splice(userInput.length)).join('')
        var orginalChars = originalSysText.split('')
        var sysCompare = (orginalChars.splice(0, userInput.length)).join('');
        checkAccuracy(userInput, sysCompare);
        wordFinished(userInput, sysText, originalSysText);
        wordsPerMinute(userInput)
    });
});

