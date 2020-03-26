(function(){/*****************************
 * SET PAGE ELEMENTS
*/

var submitButton = document.getElementById('submit-answer');
var comboOptions = document.getElementById('answer');
var restartButton = document.getElementById("restart-question");
var resultLine = document.getElementById("result");

var manager;

/*****************************
 * SET SUBMIT AND COMBO DISABLED
*/
disableElements();

/*****************************
 * CREATE THE CONSTRUCTOR QUESTION
*/
var Question = function(question, questionOptions, correctOption) {

    this.question = question;
    this.questionOptions = questionOptions;
    this.correctOption = correctOption;
};

/*****************************
 * CREATE THE QUESTION METHODS
*/
Question.prototype.createComboBox = function(){

    for (i = 0 ; i < this.questionOptions.length; i++){
        opt = document.createElement("option");
        opt.value = i;
        opt.text = this.questionOptions[i];
        comboOptions.add(opt, comboOptions.options[i]);
    }
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
 * CREATE THE MANAGER METHODS
*/
QuestionsManager.prototype.selectQuestion = function(){

    var qNumber = Math.floor(Math.random() * this.questionsList.length);
    this.currentQuestion = this.questionsList[qNumber];
    document.querySelector('.question').textContent = this.currentQuestion.question;
};

/*****************************
 * CREATE THE NEEDED MANAGER GETTERS
*/
QuestionsManager.prototype.getCorrectOption = function(){
    return this.currentQuestion.correctOption;
};

/*****************************
 * EVENTS
*/
restartButton.addEventListener('click', function(){

    for (i = 0 ; i < comboOptions.length; i++){
        comboOptions.remove(i);
    }
    comboOptions.remove(0);

    manager = new QuestionsManager();
    manager.selectQuestion();
    manager.currentQuestion.createComboBox();

    resetResultColor();
    resultLine.textContent = 'Waiting for an answer...';

    submitButton.disabled = (comboOptions.length > 0) ? false : true;
    comboOptions.disabled = (comboOptions.length > 0) ? false : true;
});

submitButton.addEventListener('click', function(){
    
    var currentAnswer = parseInt(comboOptions.value);
    if (currentAnswer === manager.getCorrectOption()){
        resetResultColor();
        resultLine.classList.add('rightAnswer')
        resultLine.textContent = 'Right!';
        disableElements();
    }else{
        resetResultColor();
        resultLine.classList.add('wrongAnswer')
        resultLine.textContent = 'Wrong! Try again.';
    }
});

comboOptions.addEventListener('click', function(){
    resetResultColor();
    resultLine.textContent = 'Waiting for an answer...';
});

/*****************************
 * USEFUL FUNCTIONS
*/
function resetResultColor(){

    resultLine.classList.remove('rightAnswer');
    resultLine.classList.remove('wrongAnswer');
}

function disableElements(){

    submitButton.disabled = true;
    comboOptions.disabled = true;
}
})();

/*
--- Expert level ---

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/