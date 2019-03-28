

    // Create variables that hold references to the places in the HTML where we want to display things.
    var winsText = document.getElementById("wins-text");
    var lossesText = document.getElementById("losses-text");
    var guessesLeftText = document.getElementById("guessesLeft-text");
    var yourGuessesSoFarText = document.getElementById("yourGuessesSoFar-text");


    // Function defined to get computer generated random alphabet 
    function getRandomAlphabet() {

        //Randomly choose an alphabet from the 26 alphabet set 
        //This will behave as the Computer's guess.

        //Find a random no. from 0 - 25 (equivalent to 26 characters)
        var computerGuess = Math.floor(Math.random() * 26);

        //ASCII of A is 65 ... Z is 90
        //Linking random no. to an alphabet 
        computerGuess += 65;

        //Convert Unicode values into characters
        computerGuess = String.fromCharCode(computerGuess); 

        //Convert random alphabet to lower case for comparison
        computerGuess = computerGuess.toLowerCase();

        console.log("computerGuess = " + computerGuess);

        return computerGuess;
    }

    // Creating variables to hold the number of wins, losses, no. of guesses left & array to store user guesses
    var wins = 0;
    var losses = 0;
    var guessesLeft = 10;
    var yourGuessesSoFar = [];
    var winFlag = false; //Creating a win flag to be set to true only if user wins

    //Call getRandomAlphabet() function to get random alphabet
    var computerGuess = getRandomAlphabet();


    // This function is run whenever the user presses a key
    document.onkeyup = function(event) {

        //If no. of guessesLeft comes down to 0 OR previously there was a Win, then reset the game
        if(guessesLeft === 0 || winFlag === true) {

            guessesLeft = 10; //Set guessesLeft to default
            yourGuessesSoFar = []; //Empty yourGuessesSoFar array
            computerGuess = getRandomAlphabet(); //Get a new computer generated random alphabet
            winFlag = false; //Reset the flag
        }


        // Get user alphabet ------------------------------

        // Determines which key was pressed.
        var userGuess = event.key;

        //Append user's guess onto the yourGuessesSoFar[] array
        yourGuessesSoFar.push(userGuess);

        //Convert userGuess to lower case for comparison
        userGuess = userGuess.toLowerCase();


        //------------ CODE LOGIC STARTS ---------

        //Check if 'guessesLeft' counter is greater than 0
        if(guessesLeft > 0) {

            //If computer guess is same as user typed in, then user Wins
            if(computerGuess === userGuess) {
                wins++;
                winFlag = true; //Set win flag to true
            }

            //If user guess does not match computer alphabet then try again until guessesLeft = 0
            guessesLeft--;

        }

        //If the user failed to guess the alphabet, then user looses
        if(guessesLeft === 0 && winFlag === false) {
            losses++;
        }

        //------------ CODE LOGIC ENDS ---------


        // Update Wins, Losses, guesses left and yourGuessesSoFar
        winsText.textContent = "Wins: " + wins;
        lossesText.textContent = "Losses: " + losses;
        guessesLeftText.textContent = "Guesses left: " + guessesLeft;
        yourGuessesSoFarText.textContent = "Your Guesses So Far: " + yourGuessesSoFar;

    }


