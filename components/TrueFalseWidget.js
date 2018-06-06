import React from 'react';
import {View, ScrollView, TextInput, Alert} from 'react-native';
import {Text,FormValidationMessage,FormLabel,FormInput,Button,CheckBox} from 'react-native-elements';
import TrueOrFalseService from "../services/TrueOrFalseService";
import RadioForm from 'react-native-simple-radio-button';


class TrueFalseWidget extends React.Component{

    static navigationOptions={
        title:'True/False Question Editor'
    }

    constructor(props){
        super(props);
        this.state={
            question:'',
            title:"",
            description:"",
            points:"",
            subtitle:"",
            isTrue:true,
            previewMode:true,
            radio_props : [
                {label: 'True', value: 1 },
                {label: 'False', value: 0 }
            ]
        }

        this.updateQuestion=this.updateQuestion.bind(this);
        this.trueOrFalseService=TrueOrFalseService.instance;
    }

    componentDidMount(){
        let question=this.props.navigation.getParam('question',1);
        this.setState({question:question})
        this.setState({
            title:question.title,
            description:question.description,
            points:question.points,
            subtitle:question.subtitle,
            isTrue:question.isTrue
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
            questionType:'TF',
            isTrue:this.state.isTrue
        }

        this.trueOrFalseService.updateQuestion(this.state.question.id,question)
            .then(Alert.alert("True/False Question updated successfully"))
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

                    <CheckBox onPress={() => this.formUpdate({isTrue: !this.state.isTrue})}
                              checked={this.state.isTrue} title='The answer is true'/>

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


                    <RadioForm
                        radio_props={this.state.radio_props}
                        initial={0}
                        onPress={(value) => {this.setState({value:value})}}
                    />

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

export default TrueFalseWidget;