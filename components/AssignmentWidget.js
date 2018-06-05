import React from 'react';
import {Text,FormInput,FormLabel,FormValidationMessage,Button} from 'react-native-elements';
import {View,TextInput} from 'react-native';
import AssignmentService from "../services/AssignmentService";

class AssignmentWidget extends React.Component{

    static navigationOptions={
        title:"Assignment Editor"
    }


    constructor(props){
        super(props);
        this.state={
            title:"",
            description:"",
            points:"",
            assignment:""
        }
        this.assignmentService=AssignmentService.instance;
    }

    componentDidMount(){
        let assignmentId=this.props.navigation.getParam('assignmentId',1)
        this.assignmentService.findAssignmentById(assignmentId)
            .then(assignment=>(
                this.setState({assignment:assignment,title:assignment.title
                        ,description:assignment.description,points:assignment.points})
            ))
    }

    formUpdate(newState){
        this.setState(newState);
    }

    render(){
        return(
            <View style={{padding: 15}}>

                <FormLabel>Title</FormLabel>
                <TextInput onChangeText={text=>(
                    this.formUpdate({title:text})
                )} value={this.state.assignment.title}
                           style={{height: 40, borderColor: 'gray', borderWidth: 1,paddingLeft:10}}/>
                {this.state.title==="" && <FormValidationMessage>Title is required</FormValidationMessage>}
                <FormLabel>Description</FormLabel>
                <TextInput  onChangeText={text=>(
                    this.formUpdate({description:text})
                )} value={this.state.assignment.description}
                            style={{height: 40, borderColor: 'gray', borderWidth: 1,paddingLeft:10}}/>
                {this.state.description==="" && <FormValidationMessage>Description is required</FormValidationMessage>}
                <FormLabel>Points</FormLabel>
                <FormInput onChangeText={text=>(
                    this.formUpdate({points:text})
                )} />
                {this.state.points==="" &&<FormValidationMessage>Points are required</FormValidationMessage>}
                <Text>{'\n'}</Text>
                <Button title="Save" backgroundColor="green"
                        color="white"/>
                <Text>{'\n'}</Text>
                <Button title="Cancel" backgroundColor="red"
                        color="white"/>
            </View>
        )
    }

}

export default AssignmentWidget;