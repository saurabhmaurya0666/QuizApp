import { LightningElement } from 'lwc';

export default class QuizApp extends LightningElement {
    selected = {}; // For storing answers
    correctAnswers = 0; // To show the number of correct answers
    isSubmitted = false; // Used to show the result

    myQuestions = [
        {
            id: "Question1",
            question: "Which one of the following is not a template loop?",
            answers: {
                a: "for:each",
                b: "iterator",
                c: "map loop"
            },
            correctAnswer: "c"
        },
        {
            id: "Question2",
            question: "Which of the file is invalid in LWC component folder?",
            answers: {
                a: ".svg",
                b: ".apex",
                c: ".js"
            },
            correctAnswer: "b"
        },
        {
            id: "Question3",
            question: "Which one of the following is not a directive?",
            answers: {
                a: "for:each",
                b: "if:true",
                c: "@track"
            },
            correctAnswer: "c"
        }
    ];

    // Disable Submit button if not all questions are answered
    get allNotSelected() {
        return !(Object.keys(this.selected).length === this.myQuestions.length); // Fixed typo: lenghth → length
    }
    get isisScoredFull(){
        return `slds-text-heading_large ${this.myQuestions.length ==this.correctAnswers?
         'slds-text-color_sucess':'slds-text-color_error'}`
    }

    // Handle radio button change
    changeHandler(event) {
        const { name, value } = event.target;
        this.selected = { ...this.selected, [name]: value };
    }

    // Submit quiz
    submitHandler(event) {
        event.preventDefault(); // Still keeping this for safety
        let correct = this.myQuestions.filter(
            item => this.selected[item.id] === item.correctAnswer // Fixed incorrect property
        );
        this.correctAnswers = correct.length;
        this.isSubmitted = true;
    }

    // Reset quiz
    resetHandler() {
        this.selected = {};
        this.correctAnswers = 0;
        this.isSubmitted = false; // Added to reset submission state
    }
}
