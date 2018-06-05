import FillInTheBlankService from "./FillInTheBlankService";

let _singleton=Symbol();

class QuestionService{
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');

        this.fillInTheBlankService=FillInTheBlankService.instance;

    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new QuestionService(_singleton);
        return this[_singleton]
    }

    addQuestion(questionType,examId){
        if(questionType==='FB'){
            return this.fillInTheBlankService.addQuestion(examId)
        }
    }

    findQuestionsByExamId(examId){
        return fetch("http://localhost:8080/api/exam/"+examId+"/question")
            .then(response=>(
                response.json()
            ))
    }

}

export default QuestionService;