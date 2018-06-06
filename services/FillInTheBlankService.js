let _singleton=Symbol();

class FillInTheBlankService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new FillInTheBlankService(_singleton);
        return this[_singleton]
    }

    addQuestion(examId){
        let newQuestion={
            title:'New Fill in the Blank Question',
            description:'Enter Description',
            points:'0',
            subtitle:'fill in the blanks',
            variables:'v',
            questionType:'FB',
            fib:'2 + 2 = [four=4]\n' +
            '[two=2] + 2 = 4\n'
        }

        return fetch("http://localhost:8080/api/exam/"+examId+"/blanks",{
            method:"post",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(newQuestion)
        })

    }

    updateQuestion(questionId,question){
        return fetch("http://localhost:8080/api/question/"+questionId+"/blanks", {
            method: "put",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(question)
        })
    }
}

export default FillInTheBlankService;