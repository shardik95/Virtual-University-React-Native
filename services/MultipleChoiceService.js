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
            options:'1. Option 1\n2. Option 2\n3. Option 3\n4. Option 4',
            correctOption:'1. Option 1'
        }

        return fetch("http://localhost:8080/api/exam/"+examId+"/choice",{
            method:"post",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(newQuestion)
        })
    }

}

export default MultipleChoiceService;