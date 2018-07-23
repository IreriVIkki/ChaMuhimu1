
// for(var sec = 1; sec <= 60; sec++){
//     setInterval(function(){
//         $('#timer').text(sec);
//     }, 1000);
//     console.log(sec)
// };

var sysText = $('#homeSysText').text();
$('#homeUserText').text('');
console.log(($('#homeUserText').val().length))


// var total = 0;

function charsPerMinute(userText, time){
    var speed = (userText/time)
    return speed;
}

function wordsPerMinute(userText, sysText, time){
    var userWords = userText.split(' ');
    var sysWords = sysText.split(' ')

    if(userText[-1] === sysWords[userWords.length -1]){
        return userWords.length/60
    }else{
        return ((userWords.length -1)/60)
    }
}



$('#homeUserText').keyup(function (e) {
    let userText = $('#homeUserText').val();
    // console.log(userText)
    // console.log('sys text' + sysText.slice(0, userText.length))
    if (userText === sysText.slice(0, userText.length)) {
        $('#homeUserText').css('color', 'blue');
        $('#homeUserText').addClass('start');
    } else {
        $('#homeUserText').css('color', 'red');
    }

});

$('#startTimer').click(function (e) {
    e.preventDefault();

    setTimeout(function () {
        var time = 0;
        var timer = setInterval(function () {
            $('#timer').text(time += 1);
            if (time === 10) {
                // document.getElementById("homeUserText").disabled = true;
                $('#homeUserText').attr('disabled', 'true');
                clearInterval(timer)
            }
            var userText = $('#homeUserText').val();
            userText.split('').length
            var speed = parseInt(charsPerMinute(userText.split('').length, time) * 60)
            $('#userSpeed').text(speed);
            console.log(speed)
        }, 1000);
    }, 3000);
});
