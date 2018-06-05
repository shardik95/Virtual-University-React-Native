let _singleton=Symbol();


class ExamService{
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new ExamService(_singleton);
        return this[_singleton]
    }

    findExamForTopicId(topicId){
        return fetch("http://localhost:8080/api/topic/"+topicId+"/exam")
            .then(response=>(
                response.json()
            ))
    }

    addExam(topicId,exam){
        return fetch("http://localhost:8080/api/topic/"+topicId+"/exam",{
            method:"post",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(exam)
        })
    }

    deleteExam(examId){
        fetch("http://localhost:8080/api/exam/"+examId,{
            method:'delete'
        })
    }
}

export default ExamService;