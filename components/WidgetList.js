import React from 'react';
import {ListItem,Button,Icon} from 'react-native-elements';
import {View,Alert,Text} from 'react-native';
import AssignmentService from "../services/AssignmentService";

class LessonList extends React.Component{

    static navigationOptions={title:"Widgets"}

    constructor(props){
        super(props);
        this.state={
            topicId:"",
            widgets:[],
            assignments:[]
        }
        this.addAssignment=this.addAssignment.bind(this);
        this.deleteAssignment=this.deleteAssignment.bind(this);
        this.assignmentService=AssignmentService.instance;
    }

    componentDidMount(){
        let topicId=this.props.navigation.getParam("topicId");
        this.setState({topicId:topicId})
        this.assignmentService.findAssignmentsForTopic(topicId).then(assignments=> (
            this.setState({assignments: assignments})
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
            .then(()=>(
            fetch("http://localhost:8080/api/topic/"+this.state.topicId+"/assignment")
                .then(response=>(
                    response.json()
                )).then(assignments=>(
                this.setState({assignments:assignments})
            ))
        ))
    }

    render(){
        return(
            <View style={{padding: 15}}>
                {this.state.assignments.map( (assignment, index)=>(
                    <ListItem title={assignment.title} key={index}
                    onPress={()=>(
                        this.props.navigation.navigate("AssignmentWidget",{assignmentId:assignment.id})
                    )}
                    rightIcon={<Icon name={'delete'} size={20}
                                     onPress={() => this.deleteAssignment(assignment.id)} />}
                    />
                ))}
                <Text>{'\n'}</Text>
               <Button title="Add Assignment" onPress={()=>this.addAssignment()}/>
            </View>
        )
    }
}

export default LessonList;