/////////////////////////////
// CODING CHALLENGE


/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)*/

var currentAnswer, question1, currentQuestion, questionNr;
var questionList = [];
var questionSolutions = [];
var submitButton1 = document.getElementById('submit-answer-1');
var combo1 = document.getElementById('answer-1');
var restart1 = document.getElementById("restart-1");

submitButton1.disabled = true;
combo1.disabled = true;

var QuestionsContructor = function() {

        this.createQuestions = function() {
            
            questionList.push('What time is it?');
            questionList.push('What is my name?');
            questionList.push('How old am I?');
            questionList.push('What is my favorite color?');
            questionList.push('What is my favorite movie?');

            questionSolutions = ['10am', 'g', '30', 'gr', 'c'];
        }

        this.selectQuestionNumber = function(){

            questionNr = Math.floor(Math.random() * questionList.length);
            console.log(questionNr);
            currentQuestion = questionSolutions[questionNr];
            document.querySelector('.question').textContent = questionList[questionNr];
        }

        this.constructCombo = function(){

            combo1 = document.getElementById('answer-1');
            var opt;
      
            if(currentQuestion === questionSolutions[0]){
                var optionValues = ["8am",questionSolutions[0],'12pm'];
                var optionTexts = ['It is 8am.', 'It is 10am.', 'It is 12pm.']
            }else if(currentQuestion === questionSolutions[1]) {
                var optionValues = ["j",questionSolutions[1],'s'];
                var optionTexts = ['Jorge.', 'Goncalo.', 'Simao.']
            }else if(currentQuestion === questionSolutions[2]) {
                var optionValues = ["22",'38',questionSolutions[2]];
                var optionTexts = ['22 years old.', '38 years old.', '30 years old.']
            }else if(currentQuestion === questionSolutions[3]) {
                var optionValues = [questionSolutions[3],'y','r'];
                var optionTexts = ['green', 'Yellow.', 'Red.']
            }else if(currentQuestion === questionSolutions[4]) {
                var optionValues = ["t",'m',questionSolutions[4]];
                var optionTexts = ['Titanic.', 'Match Point.', 'Contratiempo']
            };

            for (i = 0 ; i < optionValues.length; i++){
                opt = document.createElement("option");
                opt.value = optionValues[i];
                opt.text = optionTexts[i];
                combo1.add(opt, combo1.options[i]);
            }
        }  
};

restart1.addEventListener('click', function(){

    questionList = [];
    questionSolutions = [];
    for (i = 0 ; i < combo1.length; i++){
        combo1.remove(i);
    }
    combo1.remove(0);

    question1 = new QuestionsContructor();
    question1.createQuestions();
    question1.selectQuestionNumber();
    question1.constructCombo();

    submitButton1.disabled = (combo1.length > 0) ? false : true;
    combo1.disabled = (combo1.length > 0) ? false : true;
});

submitButton1.addEventListener('click', function(){
    
    currentAnswer = combo1.value;
    if (currentAnswer === questionSolutions[questionNr]){
        document.querySelector("#result").textContent = 'Right!';
    }else{
        document.querySelector("#result").textContent = 'Wrong!';
    }
});



/*2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/

