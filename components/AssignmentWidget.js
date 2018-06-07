import React from 'react';
import {Text,FormInput,FormLabel,FormValidationMessage,Button} from 'react-native-elements';
import {ScrollView,View,TextInput,Alert} from 'react-native';
import AssignmentService from "../services/AssignmentService";
import Hyperlink from 'react-native-hyperlink'
import Icon from "react-native-elements/src/icons/Icon";

class AssignmentWidget extends React.Component{

    static navigationOptions={
        title:"Assignment Editor",
        headerStyle: { backgroundColor: '#363636' },
        headerTitleStyle: { color: '#fff' },
        headerTintColor: 'white'
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
        let no;
        return (
            <ScrollView>
                {this.state.previewMode &&
                <ScrollView>

                    <View style={{padding: 15, marginBottom: 0}}>
                        <View style={{flex: 1, backgroundColor: 'grey', padding: 11, marginBottom: 2}}>
                            <TextInput editable={false} style={{color: "#fff"}}>Title</TextInput>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{flex: 6}}>
                                    <TextInput style={{
                                        height: 40,
                                        borderColor: 'black',
                                        borderWidth: 1,
                                        backgroundColor: 'white'
                                    }} onChangeText={(text) => {
                                        this.formUpdate({title: text})
                                    }} value={this.state.assignment.title}/>
                                </View>
                                {this.state.title === "" &&
                                <FormValidationMessage>Title is required</FormValidationMessage>}
                            </View>
                        </View>
                    </View>

                    <View style={{padding: 15, marginBottom: 0}}>
                        <View style={{flex: 1, backgroundColor: 'grey', padding: 11, marginBottom: 2}}>
                            <TextInput editable={false} style={{color: "#fff"}}>Description</TextInput>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{flex: 6}}>
                                    <TextInput style={{
                                        height: 40,
                                        borderColor: 'black',
                                        borderWidth: 1,
                                        backgroundColor: 'white'
                                    }} onChangeText={(text) => {
                                        this.formUpdate({description: text})
                                    }} value={this.state.assignment.description}/>
                                </View>
                                {this.state.description === "" &&
                                <FormValidationMessage>Description is required</FormValidationMessage>}
                            </View>
                        </View>
                    </View>


                    {no = this.state.assignment.points}
                    { no=''+no}

                    <View style={{padding: 15, marginBottom: 0}}>
                        <View style={{flex: 1, backgroundColor: 'grey', padding: 11, marginBottom: 2}}>
                            <TextInput editable={false} style={{color: "#fff"}}>Points</TextInput>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{flex: 6}}>
                                    <TextInput style={{
                                        height: 40,
                                        borderColor: 'black',
                                        borderWidth: 1,
                                        backgroundColor: 'white'
                                    }} onChangeText={(text) => {
                                        this.formUpdate({points: text})
                                    }} value={no}/>
                                </View>
                                {this.state.points === "" &&
                                <FormValidationMessage>Points are required</FormValidationMessage>}
                            </View>
                        </View>
                    </View>

                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 2}}>
                            <Icon name={'save'} size={40} color="green"
                                  onPress={() => this.updateAssignment()}
                            type='entypo'/>
                        </View>
                        <View style={{flex: 2}}>
                            <Icon name={'cancel'} size={40} color="red"
                                  onPress={() => this.props.navigation.navigate('WidgetList')}
                                  type='materialicon'/>
                        </View>
                        <View style={{flex: 2}}>
                            <Icon name={'slideshow'} size={40} color="blue"
                                  onPress={() => {
                                      this.setState({previewMode: !this.state.previewMode})
                                  }}
                                  type='materialicon'/>
                        </View>

                    </View>

                </ScrollView>}


                {!this.state.previewMode &&
                <View style={{padding:5}}>
                    <View style={{flex: 1, flexDirection: 'row',backgroundColor:'grey',padding:10,marginBottom:5}}>
                        <View style={{flex: 4}}>
                            <Text h4 style={{color:"#fff"}}>{this.state.title}</Text>
                        </View>
                        <View style={{flex: 2}}>
                            <Text h4 style={{color:"#fff"}}>Points - {this.state.points}</Text>
                        </View>
                    </View>
                    <View style={{backgroundColor:'grey',padding:10,marginBottom:5}}>
                        <Text h4 style={{color:"#fff"}}>Description:</Text>
                        <Text style={{color:"#fff"}}>{this.state.description}</Text>
                    </View>

                    <View style={{backgroundColor:'grey',padding:10,marginBottom:5}}>
                        <Text h4 style={{color:"#fff"}}>Essay Answer</Text>
                        <TextInput style={{height: 120, borderColor: 'black', borderWidth: 1,backgroundColor:'white'}}/>
                    </View>

                    <View style={{backgroundColor:'grey',padding:10,marginBottom:5}}>
                        <Text h4 style={{color:"#fff"}}>Link Upload</Text>
                        <Hyperlink linkDefault={true}>
                            <TextInput style={{height: 30, borderColor: 'black', borderWidth: 1,backgroundColor:'white'}}/>
                        </Hyperlink>
                    </View>

                    <View style={{backgroundColor:'grey',padding:10,marginBottom:5}}>
                        <Text h4 style={{color:"#fff"}}>File Upload</Text>
                            <TextInput style={{height: 30, borderColor: 'black', borderWidth: 1,backgroundColor:'white'}}/>
                    </View>

                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 2}}>
                            <Icon name={'check'} size={40} color="green"
                                  type='entypo'/>
                        </View>
                        <View style={{flex: 2}}>
                            <Icon name={'cancel'} size={40} color="red"
                                  type='materialicon'/>
                        </View>
                        <View style={{flex: 2}}>
                            <Icon name={'back'} size={40} color="blue"
                                  onPress={() => {
                                      this.setState({previewMode: !this.state.previewMode})}}
                                  type='entypo'/>
                        </View>
                    </View>
                </View>}

            </ScrollView>
        )
    }

}

export default AssignmentWidget;