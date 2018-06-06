let _singleton=Symbol();
class MultipleChoiceService{
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new MultipleChoiceService(_singleton);
        return this[_singleton]
    }

    addQuestion(examId){
        let newQuestion={
            title:'New Multiple Choice Question',
            description:'Enter Description',
            points:'0',
            subtitle:'Multiple Choice',
            questionType:'MC',
            options:'option-1#option-2',
            correctOption:'1'
        }

        return fetch("http://localhost:8080/api/exam/"+examId+"/choice",{
            method:"post",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(newQuestion)
        })
    }

    updateQuestion(questionId,question){
        return fetch("http://localhost:8080/api/question/"+questionId+"/choice", {
            method: "put",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(question)
        })
    }

}

export default MultipleChoiceService;