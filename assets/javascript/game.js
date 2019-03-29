

    // Creating variables to hold the number of wins, current word, no. of guesses left & array to store user guesses
    var wins = 0;
    var currentWord = "";
    var guessesLeft = 20;
    var yourGuessesSoFar = [];
    var word = "";
    var guessedWord = "";


    // Create variables that hold references to the places in the HTML where we want to display things.
    var winsText = document.getElementById("wins-text");
    var currentWordText = document.getElementById("currentWord-text");
    var guessesLeftText = document.getElementById("guessesLeft-text");
    var yourGuessesSoFarText = document.getElementById("yourGuessesSoFar-text");

    var displayWinText = document.getElementById("displayWin-text");
    

    //Setting initial values to be placed on the screen when game starts
    function gameStartsHere() {

        //Reset variables excluding "wins"
        currentWord = "";
        guessesLeft = 20;
        yourGuessesSoFar = [];
        word = "";
        guessedWord = "";

        winsText.textContent = wins; //Previous wins will be carry forwarded
        guessesLeftText.textContent = guessesLeft; //guesses left reset to 10
        yourGuessesSoFarText.textContent = yourGuessesSoFar; //Array reset


        //Pick a random word from the dictionary defined in "dictionary.js" file 
        word = dictionary[Math.floor(Math.random() * 20)];
        word = word.toUpperCase();
        console.log("Random word is: " + word);

        word = word.split(""); //Break word to charcter array

        guessedWord = [];  //Reset guessedWord
        
        for(var i = 0 ; i < word.length ; i++) {
            
            //Initially underscore is used to denote the word
            guessedWord[i] = "__ ";

        }

        console.log("guessedWord: " + guessedWord);

        //Join the array to form a string and store in 'currentWord'
        currentWord = guessedWord.join(''); 
        console.log("currentWord: " + currentWord);

        currentWordText.textContent = currentWord;
        
    }


    //Start the game for the 1st time
    gameStartsHere();


    // This function is run whenever the user presses a key
    document.onkeyup = function(event) {

        //Reset "YOU WIN" text onkeyup event 
        displayWinText.textContent = ""; 

        // Determines which key was pressed.
        var userGuess = event.key;

        //Convert userGuess to upper case for comparison and ease
        userGuess = userGuess.toUpperCase();

        //Append user's guess onto the yourGuessesSoFar[] array
        yourGuessesSoFar.push(userGuess);


        //------------ CODE LOGIC STARTS ---------

        //Check if 'guessesLeft' counter is greater than 0
        if(guessesLeft > 0) {

            //If userGuess alphabet is anywhere in the "word" then replace '_' with the alphabet
            for(var index=0 ; index<word.length ; index++) {

                //Find 1st occurance of 'userGuess' in 'word' starting at index
                index = word.indexOf(userGuess, index);
                if(index !== -1) {

                    guessedWord[index] = userGuess + " ";
                    currentWord = guessedWord.join(''); 

                    console.log("currentWord-> " + currentWord);
            
                    currentWordText.textContent = currentWord;
                }
                else { //If index not found
                    break; //break out of for loop
                }
            } //END OF FOR LOOP

            //If user guess does not match any letter of the word then try again until guessesLeft > 0
            guessesLeft--;
        }

        //Check to see if my guess Word is complete

        //If we do not find an underscore in the array guessedWord, 
        //it means word is complete and user wins
        if(!currentWord.includes("_")) { 

            wins++;

            displayWinText.append("YOU WIN !!!");
            
            //Start a new game
            gameStartsHere();
        }
        else { //If word is still incomplete & guessesLeft = 0, restart game

            if(guessesLeft === 0){
                //Start a new game
                gameStartsHere();
            }
        }

        winsText.textContent = wins;
        guessesLeftText.textContent = guessesLeft;
        yourGuessesSoFarText.textContent = yourGuessesSoFar;


        //------------ CODE LOGIC ENDS ---------


    }


