(function(){

    var gameManager;

    /*****************************
     * CREATE THE CONSTRUCTOR QUESTION
    */
    var Question = function(question, questionOptions, correctOption) {

        this.question = question;
        this.questionOptions = questionOptions;
        this.correctOption = correctOption;
    };

    /*****************************
     * CREATE THE CONSTRUCTOR MANAGER
    */
    var QuestionsManager = function() {

        this.questionsList = [];
        this.questionsList.push(new Question('What time is it?', ['It is 8am.', 'It is 10am.', 'It is 12pm.'], 1));
        this.questionsList.push(new Question('What is my name?', ['Jorge.', 'Goncalo.', 'Simao.'], 1));
        this.questionsList.push(new Question('How old am I?', ['22 years old.', '38 years old.', '30 years old.'], 2));
        this.questionsList.push(new Question('What is my favorite color?', ['Green', 'Yellow.', 'Red.'], 0));
        this.questionsList.push(new Question('What is my favorite movie?', ['Titanic.', 'Match Point.', 'Contratiempo'], 2));
    };

    /*****************************
     * CREATE THE CONSTRUCTOR GAME MANAGER
    */
    var GameManager = function() {

        this.manager = new QuestionsManager();
        this.submitButton = document.getElementById('submit-answer');
        this.comboOptions = document.getElementById('answer');
        this.restartButton = document.getElementById("restart-question");
        this.resultLine = document.getElementById("result");
        this.quitButton = document.getElementById("quit");
        this.pointsLine = document.getElementById("score");
        this.questionString = document.querySelector('.question');
        this.points = 0;
        this.POINTS_RANGE = [-2, 2];
    };

    /*****************************
     * CREATE THE MANAGER METHODS
    */
    QuestionsManager.prototype.selectQuestion = function(){

        var qNumber = Math.floor(Math.random() * this.questionsList.length);
        this.currentQuestion = this.questionsList[qNumber];
        gameManager.questionString.textContent = this.currentQuestion.question;
    };

    /*****************************
     * CREATE THE NEEDED MANAGER GETTERS
    */
    QuestionsManager.prototype.getCorrectOption = function(){
        return this.currentQuestion.correctOption;
    };

    /*****************************
     * CREATE THE GAME MANAGER METHODS
    */
    GameManager.prototype.resetResultColor = function(){

        this.resultLine.classList.remove('waitAnswer');
        this.resultLine.classList.remove('rightAnswer');
        this.resultLine.classList.remove('wrongAnswer');
    };

    GameManager.prototype.disableElements = function(){

        this.submitButton.disabled = true;
        this.comboOptions.disabled = true;
    };

    GameManager.prototype.nextQuestion = function(){

        for (i = 0 ; i < this.comboOptions.length; i++){
            this.comboOptions.remove(i);
        }
        this.comboOptions.remove(0);

        this.manager.selectQuestion();
        this.manager.currentQuestion.createComboBox();

        this.resetResultColor();
        this.showResult('waitAnswer', 'Waiting for an answer...', false);

        this.submitButton.disabled = (this.comboOptions.length > 0) ? false : true;
        this.comboOptions.disabled = (this.comboOptions.length > 0) ? false : true;
    };

    GameManager.prototype.managePoints = function(win){

        if (win){
            this.points++;
        }else{
            this.points--
        }
        this.pointsLine.textContent = this.points;
        if (this.points <= gameManager.POINTS_RANGE[0]){
            this.disableElements();
            this.quitButton.disabled = true;
            this.showResult('wrongAnswer', 'YOU LOST THE GAME!', true);
            this.pointsLine.textContent = 'Your final score is: ' + gameManager.points;
        }
        if (this.points >= gameManager.POINTS_RANGE[1]){
            this.disableElements();
            this.quitButton.disabled = true;
            this.showResult('rightAnswer', 'YOU WON THE GAME!', true);
            this.pointsLine.textContent = 'Your final score is: ' + gameManager.points;
        }
    };

    GameManager.prototype.showResult = function(answerClass, resultText, isFinal){

        gameManager.resultLine.classList.add(answerClass)
        gameManager.resultLine.textContent = resultText;
        if (isFinal){
            gameManager.questionString.textContent = '';
        };
    };

    gameManager = new GameManager();

    /*****************************
     * SET SUBMIT AND COMBO DISABLED
    */
    gameManager.disableElements();
    gameManager.quitButton.disabled = false;

    /*****************************
     * CREATE THE QUESTION METHODS
    */
    Question.prototype.createComboBox = function(){

        for (i = 0 ; i < this.questionOptions.length; i++){
            opt = document.createElement("option");
            opt.value = i;
            opt.text = this.questionOptions[i];
            gameManager.comboOptions.add(opt, gameManager.comboOptions.options[i]);
        }
    };

    /*****************************
     * EVENTS
    */
    gameManager.restartButton.addEventListener('click', function(){
        
        gameManager.points = 0;
        gameManager.pointsLine.textContent = 0;
        gameManager.quitButton.disabled = false;
        gameManager.resetResultColor();
        gameManager.nextQuestion();
    });

    gameManager.submitButton.addEventListener('click', function(){
        
        var currentAnswer = parseInt(gameManager.comboOptions.value);
        gameManager.resetResultColor();
        if (currentAnswer === gameManager.manager.getCorrectOption()){
            gameManager.showResult('rightAnswer', 'Right!', false);
            gameManager.managePoints(true);
        }else{
            gameManager.showResult('wrongAnswer', 'Wrong!', false);
            gameManager.managePoints(false);
        }

        if (gameManager.points > gameManager.POINTS_RANGE[0] && gameManager.points < gameManager.POINTS_RANGE[1]){
            gameManager.disableElements();
            gameManager.questionString.textContent = 'Loading next question...';
            setTimeout(function() {gameManager.nextQuestion();}, 3000);
        }
        
    });

    gameManager.comboOptions.addEventListener('click', function(){

        gameManager.resetResultColor();
        gameManager.showResult('waitAnswer', 'Waiting for an answer...');
    });

    gameManager.quitButton.addEventListener('click', function(){

        gameManager.resetResultColor();
        gameManager.disableElements();
        gameManager.points = 0;
        gameManager.questionString.textContent = 'You quit the game...';
        gameManager.pointsLine.textContent = 'Your final score is: ' + gameManager.points;
        gameManager.quitButton.disabled = true;
        gameManager.showResult('', '');
    });

})();