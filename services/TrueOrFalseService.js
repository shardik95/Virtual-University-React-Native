let _singleton=Symbol();
class TrueOrFalseService{
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new TrueOrFalseService(_singleton);
        return this[_singleton]
    }

    addQuestion(examId){
        let newQuestion={
            title:'New True/False Question',
            description:'Enter Description',
            points:'0',
            subtitle:'true false',
            isTrue:'1',
            questionType:'TF'
        }

        return fetch("http://localhost:8080/api/exam/"+examId+"/truefalse",{
            method:"post",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(newQuestion)
        })
    }

    updateQuestion(questionId,question){
        return fetch("http://localhost:8080/api/question/"+questionId+"/truefalse", {
            method: "put",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(question)
        })
    }

}

export default TrueOrFalseService;