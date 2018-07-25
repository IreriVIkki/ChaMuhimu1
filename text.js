//  function for systext as user types
//  collect user input
//  turn first system word blue when the user starts typing it
//  turn first system word red when user makes a mistake
//  turn all of the user text red when player makes a mistake
//  remove currentWord from span when user finishes typing it
//  add new first system word to currentWord span
//  

// var sysText = $('.sysText').text();
// console.log(sysText)

// var userInput = $('.userInput').val();
// console.log(userInput)

var originalSysText = "The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.The quick brown fox jumps over the lazy dog.The quick brown fox jumps over the lazy dog."

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
    console.log(originalSysText)
    var userSpace = ((userInput.split('')).splice(-1))[0]
    var sysChars = originalSysText.split('');
    var sysSpace = (sysChars.splice(0, userInput.length)).splice(-1)[0]
    if (sysSpace === space && space === userSpace) {
        // console.log('works')
        var sysText = ((sysText.split('')).splice(userInput.length -1)).join('')
        var sysWords = sysText.split(' ');
        var sysWords2 = sysWords.splice(2)
        var sysText = sysWords.join(' ')
        var firstWord = sysWords2.splice(0,1) + [' ']
        var otherWords = (sysWords2.splice(0)).join(' ')
        console.log(firstWord)
        console.log(otherWords)
        $('#currentWord').text(firstWord)
        $('#otherWords').text(otherWords)
    }
}

$('.userInput').on('keyup', function (e) {
    var sysText = $('.sysText').text();
    // console.log(sysText)
    var userInput = $('.userInput').val();
    var sysChars = sysText.split('');
    var orginalChars = originalSysText.split('')
    var sysCompare = (orginalChars.splice(0, userInput.length)).join('');
    checkAccuracy(userInput, sysCompare);
    wordFinished(userInput, sysText, originalSysText);
});

