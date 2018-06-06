import FillInTheBlankService from "./FillInTheBlankService";
import TrueOrFalseService from "./TrueOrFalseService";
import EssayService from "./EssayService";
import MultipleChoiceService from "./MultipleChoiceService";

let _singleton=Symbol();

class QuestionService{
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');

        this.fillInTheBlankService=FillInTheBlankService.instance;
        this.trueFalseService=TrueOrFalseService.instance;
        this.essayService=EssayService.instance;
        this.mulitpleChoiceService=MultipleChoiceService.instance;

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
        else if(questionType==='TF'){
            return this.trueFalseService.addQuestion(examId)
        }
        else if(questionType==='ES'){
            return this.essayService.addQuestion(examId)
        }
        else if(questionType==='MC'){
            return this.mulitpleChoiceService.addQuestion(examId)
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