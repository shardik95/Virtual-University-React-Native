import React from 'react';
import {Text,FormInput,FormLabel,FormValidationMessage,Button} from 'react-native-elements';
import {ScrollView,View,TextInput,Alert} from 'react-native';
import AssignmentService from "../services/AssignmentService";
import Hyperlink from 'react-native-hyperlink'

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
            assignment:"",
            previewMode:true
        }
        this.assignmentService=AssignmentService.instance;
        this.updateAssignment=this.updateAssignment.bind(this);
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

    updateAssignment(){
        let updateAssignment={
            title:this.state.title,
            description:this.state.description,
            points:this.state.points,
            widgetType:"Assignment",
            text:this.state.title
        }
        this.assignmentService.updateAssignment(this.state.assignment.id,updateAssignment)
            .then(Alert.alert("Assignment updated successfully"))
            .then(()=>this.props.navigation.state.params.onNavigateBack())
            .then(()=>this.props.navigation.goBack())

    }

    render(){
        return(
            <ScrollView style={{padding: 15}}>
                {this.state.previewMode &&
                    <ScrollView>
                        <FormLabel>Title</FormLabel>
                        <FormInput onChangeText={text=>(
                            this.formUpdate({title:text})
                        )} value={this.state.assignment.title}/>
                        {this.state.title==="" && <FormValidationMessage>Title is required</FormValidationMessage>}
                        <FormLabel>Description</FormLabel>
                        <FormInput  onChangeText={text=>(
                            this.formUpdate({description:text})
                        )} value={this.state.assignment.description}/>
                        {this.state.description==="" && <FormValidationMessage>Description is required</FormValidationMessage>}
                        <FormLabel>Points</FormLabel>
                        <FormInput onChangeText={text=>(
                            this.formUpdate({points:text})
                        )} value={this.state.points.toString()}/>
                        {this.state.points==="" &&<FormValidationMessage>Points are required</FormValidationMessage>}
                        <Text>{'\n'}</Text>
                        <Button title="Save" backgroundColor="green"
                                color="white" onPress={()=>this.updateAssignment()}/>
                        <Text>{'\n'}</Text>

                        <Button title="Cancel" backgroundColor="red"
                                color="white" onPress={()=>this.props.navigation.navigate('WidgetList')}/>

                        <Text>{'\n'}</Text>
                        <Button title="preview" backgroundColor="blue"
                                color="white" onPress={()=>{
                            this.setState({previewMode:!this.state.previewMode})
                        }}/>
                    </ScrollView>}


                {!this.state.previewMode &&
                    <View>
                        <Text h3>{this.state.title}</Text>
                        <Text>{'\n'}</Text>
                        <Text h4>Description:</Text>
                        <Text>{this.state.description}</Text>
                        <Text>{'\n'}</Text>
                        <Text h4>Points - {this.state.points}</Text>
                        <Text>{'\n'}</Text>
                        <Text h4>Essay Answer</Text>
                        <TextInput style={{height: 140, borderColor: 'gray', borderWidth: 1}} />
                        <Text>{'\n'}</Text>
                        <Text h4>Link Upload</Text>
                        <Hyperlink linkDefault={ true }>
                            <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}} />
                        </Hyperlink>
                        <Text>{'\n'}</Text>
                         <Button title="EditMode" backgroundColor="blue"
                                color="white" onPress={()=>{
                            this.setState({previewMode:!this.state.previewMode})
                         }}/>
                    </View>}

            </ScrollView>
        )
    }

}

export default AssignmentWidget;