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
            questionType:'FB'
        }

        return fetch("http://localhost:8080/api/exam/"+examId+"/blanks",{
            method:"post",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(newQuestion)
        })

    }
}

export default FillInTheBlankService;