import React from 'react';
import {ListItem,Button,Icon,Text} from 'react-native-elements';
import {View,Alert} from 'react-native';
import AssignmentService from "../services/AssignmentService";
import ExamService from "../services/ExamService";

class LessonList extends React.Component{

    static navigationOptions={title:"Widgets"}

    constructor(props){
        super(props);
        this.state={
            topicId:"",
            widgets:[],
            assignments:[],
            exams:[]
        }
        this.addAssignment=this.addAssignment.bind(this);
        this.deleteAssignment=this.deleteAssignment.bind(this);
        this.addExam=this.addExam.bind(this);
        this.deleteExam=this.deleteExam.bind(this);
        this.assignmentService=AssignmentService.instance;
        this.examService=ExamService.instance;
    }

    handleOnNavigateBack = () => {
        this.assignmentService.findAssignmentsForTopic(this.state.topicId).then(assignments=> (
            this.setState({assignments: assignments})
        ))

    }

    componentDidMount(){
        let topicId=this.props.navigation.getParam("topicId");
        this.setState({topicId:topicId})
        this.assignmentService.findAssignmentsForTopic(topicId).then(assignments=> (
            this.setState({assignments: assignments})
        ))
        this.examService.findExamForTopicId(topicId).then(exams=>(
            this.setState({exams:exams})
        ))
    }


    deleteAssignment(assignmentId){
        this.assignmentService.deleteAssignment(assignmentId)
        this.assignmentService.findAssignmentsForTopic(this.state.topicId).then(assignments=> (
            this.setState({assignments: assignments})
        ))

    }

    addAssignment(){

        let newAssignment={
            title:"New Assignment",
            description: "Add a description here",
            points:"0",
            text:"New Assignment",
            widgetType:"Assignment"
        }

        return this.assignmentService.addAssignment(this.state.topicId,newAssignment)
            .then(response => (response.json()))
            .then(()=>(fetch("http://localhost:8080/api/topic/"+this.state.topicId+"/assignment")
                .then(response=>(response.json()))
                .then(assignments=>(
                this.setState({assignments:assignments})
            ))
        ))
    }

    deleteExam(examId){
        fetch("http://localhost:8080/api/exam/"+examId,{
            method:'delete'
        })
        return fetch("http://localhost:8080/api/topic/"+this.state.topicId+"/exam")
            .then(response=>(
                response.json()
            )).then(exams=> (
            this.setState({exams: exams})
        ))
    }

    addExam(){

        let newExam={
            title:"New Exam",
            text:"New Exam",
            widgetType:"Exam"
        }

        return this.examService.addExam(this.state.topicId,newExam)
            .then(response => (response.json()))
            .then(()=>(fetch("http://localhost:8080/api/topic/"+this.state.topicId+"/exam")
                    .then(response=>(response.json()))
                    .then(exams=>(
                        this.setState({exams:exams})
                    ))
            ))

    }

    render(){
        return(
            <View style={{padding: 15}}>
                <Text h3>Assignments</Text>
                {this.state.assignments.map( (assignment, index)=>(
                    <ListItem title={assignment.title} key={index}
                    onPress={()=>(
                        this.props.navigation.navigate("AssignmentWidget",{assignmentId:assignment.id
                        ,onNavigateBack: this.handleOnNavigateBack})
                    )}
                    rightIcon={<Icon name={'delete'} size={20}
                                     onPress={() => this.deleteAssignment(assignment.id)} />}
                    />
                ))}
                <Text>{'\n'}</Text>
               <Button title="Add Assignment" onPress={()=>this.addAssignment()}/>
                <Text>{'\n'}</Text>
                <Text h3>Exams</Text>
                {this.state.exams.map( (exam, index)=>(
                    <ListItem title={exam.title} key={index}
                              onPress={()=>this.props.navigation.navigate("ExamWidget",{
                                  examId:exam.id,exam:exam
                              })}
                              rightIcon={<Icon name={'delete'} size={20}
                                               onPress={()=>this.deleteExam(exam.id)}/>}
                    />
                ))}
                <Text>{'\n'}</Text>
                <Button title="Add Exam" onPress={()=>this.addExam()} />
            </View>
        )
    }
}

export default LessonList;