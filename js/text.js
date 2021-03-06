var originalSysText = "Cha Muhimu meaning... This is perhaps the most popular phrase on social media currently. It loosely translates to “life is the only thing that matters”. It is used when a person is unable to achieve their targets or dreams and needs to take some comfort.An example in as statements Cha Muhimu ni uhai, hata kama ulikuwa wa Croatia ama uko pekee yako hii Julai--Bora Uhai "

function initialText(text) {
    $('#currentWord').text((text.split(' '))[0] + ' ');
    $('#otherWords').text(text.split(' ').splice(1).join(' '));
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

function playAgain(){
    location.reload()
    initialText(originalSysText)
    $('#results').text('0');
    $('#timeDisplay').text('60');
    $('.userInput').text('');
    $('.wpm').text('00');
    $('.userInput').removeClass('disable');
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
        var firstWord = sysWords[0];
        var otherWords = (sysWords.splice(1)).join(' ');
        $('#currentWord').text(firstWord)
        $('#otherWords').text(otherWords)
    }
}

function wordsPerMinute(userInput){
    var words = (userInput.split(' ').length)-1;
    var charsPerMinute = (userInput.split('').length)
    $('.wpm').text(words);
    $('#resultsFinal').html(words + 1);
    $('#resultsCPM').html(charsPerMinute);
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
        if ((seconds !== '00')){
            display.textContent = seconds;
        }
        if (diff <= 0) {
            start = Date.now() + 1000;
        }
        var time = parseInt($('#timeDisplay').text());
        console.log(time)
        if (time === 1) {
            showResults()
            clearInterval(counter)
        }
    };
    timer();
    var counter = setInterval(timer, 1000);
}

// $(selector).text();

$(document).ready(function () {
    $("#slide").click(function () {
        $("#panel").slideToggle(1000);
    });
});

window.onload = function () {
    initialText(originalSysText)

    $('.userInput').on('focus', function () {
        // if ($('.userInput').val() != '') {
            var time = 10;
                display = document.querySelector('#timeDisplay');
            startTimer(time, display);
        // }
    });
};
function showResults (){
    $('#showResults').addClass('zoomIn');
    $('#showResults').removeClass('hidden');
    // $('.userInput').addClass('disable');
}

function goBack() {
    window.history.back();
}

$(document).ready(function () {
    $('.playAgain').click(function (e) { 
        e.preventDefault();
        playAgain()
        $('.showResults').addClass('zoomOut');
        var wait = setTimeout(function(){
            $('#showResults').addClass('hidden');
        }, 500);
        
        initialText();
    });
    
    $('.userInput').on('keyup', function (e) {
        if (e.key === 'Backspace'){
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

