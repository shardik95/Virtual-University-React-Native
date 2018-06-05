let _singleton=Symbol();

const ASSIGNMENT_URL="http://localhost:8080/api/topic/TOPICID/assignment";

class AssignmentService{
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new AssignmentService(_singleton);
        return this[_singleton]
    }

    findAssignmentsForTopic(topicId){
        return fetch("http://localhost:8080/api/topic/"+topicId+"/assignment")
            .then(response=>(
                response.json()
            ))
    }

    addAssignment(topicId,assignment){
        return fetch("http://localhost:8080/api/topic/"+topicId+"/assignment",{
            method:"post",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(assignment)
        })
    }

    findAssignmentById(assignmentId){
        return fetch("http://localhost:8080/api/assignment/"+assignmentId)
            .then(response=>(
                response.json()
            ))
    }

    deleteAssignment(assignmentId){
        fetch("http://localhost:8080/api/assignment/"+assignmentId,{
            method:'delete'
        })
    }

    updateAssignment(assignmentId,assignment) {
        return fetch("http://localhost:8080/api/assignment/"+assignmentId, {
            method: "put",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(assignment)
        })
    }

}

export default AssignmentService;