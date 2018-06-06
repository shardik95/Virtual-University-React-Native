let _singleton=Symbol();
class EssayService{
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new EssayService(_singleton);
        return this[_singleton]
    }

    addQuestion(examId){
        let newQuestion={
            title:'New Essay Question',
            description:'Enter Description',
            points:'0',
            subtitle:'Essay',
            questionType:'ES'
        }

        return fetch("http://localhost:8080/api/exam/"+examId+"/essay",{
            method:"post",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(newQuestion)
        })
    }

    updateQuestion(questionId,question){
        return fetch("http://localhost:8080/api/question/"+questionId+"/essay", {
            method: "put",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(question)
        })
    }

}

export default EssayService;