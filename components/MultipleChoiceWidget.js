import React from 'react';
import {View, ScrollView, Alert,TextInput} from 'react-native';
import {Text,FormInput,FormValidationMessage,FormLabel,Button,CheckBox} from 'react-native-elements';
import MultipleChoiceService from "../services/MultipleChoiceService";
import Icon from "react-native-elements/src/icons/Icon";


class MultipleChoiceWidget extends React.Component{

    static navigationOptions={
        title:'Multiple Choice Question Editor'
    }

    constructor(props){
        super(props);
        this.state={
            title:"",
            description:"",
            points:"",
            subtitle:"",
            question:'',
            correctOption:'',
            options:[],
            previewMode:true,
            newOption:''
        }
        this.updateQuestion=this.updateQuestion.bind(this);
        this.addOption=this.addOption.bind(this);
        this.deleteOption=this.deleteOption.bind(this);
        this.mcqService=MultipleChoiceService.instance;
    }

    componentDidMount(){
        let question=this.props.navigation.getParam('question',1);
        this.setState({question:question})
        this.setState({
            title:question.title,
            description:question.description,
            points:question.points,
            subtitle:question.subtitle,
            correctOption:question.correctOption,
        })
        let opt=question.options.split('#')
        this.setState({options:opt})
    }

    componentWillReceiveProps(newProps){
        let opt=newProps.getParam('question',1).options.split('#')
        this.setState({options:opt})
    }

    formUpdate(newState){
        console.log(newState)
        this.setState(newState);
    }

    deleteOption(title){
        var str=[]
        let count=0;
        for(var i=0;i<this.state.options.length;i++)
            if(this.state.options[i]!=title)
                str[count++]=this.state.options[i];
        this.setState({options:str})
    }

    updateQuestion(){

        var str=''
        for(var i=0;i<this.state.options.length;i++)
            str=str+"#"+this.state.options[i];

        let question={
            title:this.state.title,
            description:this.state.description,
            points:this.state.points,
            subtitle:this.state.subtitle,
            correctOption:this.state.correctOption+1,
            options:str,
            questionType:'MC'
        }

        this.mcqService.updateQuestion(this.state.question.id,question)
            .then(Alert.alert("MCQ updated successfully"))
            .then(()=>this.props.navigation.state.params.onNavigateBack())
            .then(()=>this.props.navigation.goBack())
    }

    addOption(){

        let optn=this.state.options;
        optn[optn.length]=this.state.newOption
        this.setState({options:optn})

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
                    <FormLabel>Options</FormLabel>

                    {this.state.options.map((str,index)=>(
                        <View style={{ flexDirection: 'row'}} key={index}>
                            {str!=='' &&<CheckBox title={str} key={index}
                                                  onPress={() => this.formUpdate({correctOption: index})}
                            checked={this.state.correctOption==(index)}/>}
                            {str!=='' &&<Icon name={'delete'} onPress={()=>this.deleteOption(str)}/>}
                        </View>
                    ))}


                    <Text>{'\n'}</Text>
                    <FormLabel>Add Option</FormLabel>
                    <TextInput onChangeText={text=>(
                        this.formUpdate({newOption:text})
                    )} style={{height: 40, borderColor: 'gray', borderWidth: 1}} />
                    <Text>{'\n'}</Text>
                    <Button title="Add Question" onPress={()=>this.addOption()}/>

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
                    <Text>{'\n'}</Text>
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

                    <FormLabel>Options</FormLabel>
                    {this.state.options.map((str,index)=>(
                        <View key={index}>
                            {str!=='' &&<CheckBox title={str} key={index}
                                                  onPress={() => this.formUpdate({correctOption: index})}
                                                  checked={this.state.correctOption==(index)}/>}
                        </View>
                    ))}

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


export default MultipleChoiceWidget;