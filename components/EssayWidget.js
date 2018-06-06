import React from 'react';
import {View, ScrollView, Alert,TextInput} from 'react-native';
import {Text,FormInput,FormLabel,FormValidationMessage,Button} from 'react-native-elements';
import EssayService from "../services/EssayService";

class EssayWidget extends React.Component{

    static navigationOptions={
        title:'Essay Question Editor'
    }

    constructor(props){
        super(props);
        this.state={
            title:"",
            description:"",
            points:"",
            subtitle:"",
            question:'',
            previewMode:true
        }
        this.updateQuestion=this.updateQuestion.bind(this);
        this.essayService=EssayService.instance;
    }

    componentDidMount(){
        let question=this.props.navigation.getParam('question',1);
        this.setState({question:question})
        this.setState({
            title:question.title,
            description:question.description,
            points:question.points,
            subtitle:question.subtitle
        })
    }

    formUpdate(newState){
        this.setState(newState);
    }

    updateQuestion(){
        let question={
            title:this.state.title,
            description:this.state.description,
            points:this.state.points,
            subtitle:this.state.subtitle,
            questionType:'ES'
        }

        this.essayService.updateQuestion(this.state.question.id,question)
            .then(Alert.alert("Essay Question updated successfully"))
            .then(()=>this.props.navigation.state.params.onNavigateBack())
            .then(()=>this.props.navigation.goBack())
    }

    render(){
        return(
            <ScrollView style={{padding: 15}}>
                {this.state.previewMode &&<ScrollView>

                    <FormLabel>Title</FormLabel>
                    <FormInput onChangeText={text=>(
                        this.formUpdate({title:text})
                    )} value={this.state.question.title}/>
                    {this.state.title==="" && <FormValidationMessage>Title is required</FormValidationMessage>}

                    <FormLabel>Subtitle</FormLabel>
                    <FormInput onChangeText={text=>(
                        this.formUpdate({subtitle:text})
                    )} value={this.state.question.subtitle}/>
                    {this.state.subtitle==="" && <FormValidationMessage>Subtitle is required</FormValidationMessage>}

                    <FormLabel>Description</FormLabel>
                    <FormInput  onChangeText={text=>(
                        this.formUpdate({description:text})
                    )} value={this.state.question.description}/>
                    {this.state.description==="" && <FormValidationMessage>Description is required</FormValidationMessage>}

                    <FormLabel>Points</FormLabel>
                    <FormInput onChangeText={text=>(
                        this.formUpdate({points:text})
                    )} value={this.state.points.toString()}/>
                    {this.state.points==="" &&<FormValidationMessage>Points are required</FormValidationMessage>}

                    <Text>{'\n'}</Text>
                    <Button title="Save" backgroundColor="green"
                            color="white" onPress={()=>this.updateQuestion()}/>
                    <Text>{'\n'}</Text>

                    <Button title="Cancel" backgroundColor="red"
                            color="white" onPress={()=>this.props.navigation.goBack()}/>

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
                    <Text h4>{this.state.subtitle}</Text>
                    <Text>{'\n'}</Text>
                    <Text h4>Description:</Text>
                    <Text>{this.state.description}</Text>
                    <Text>{'\n'}</Text>
                    <Text h4>Points - {this.state.points}</Text>
                    <Text>{'\n'}</Text>
                    <Text h4>Essay Answer</Text>
                    <TextInput style={{height: 140, borderColor: 'gray', borderWidth: 1}} />
                    <Text>{'\n'}</Text>
                    <Button title="Submit" backgroundColor="blue" color="white"/>
                    <Button title="Cancel" backgroundColor="red" color="white"/>
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

export default EssayWidget;