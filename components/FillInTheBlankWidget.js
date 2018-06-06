import React from 'react';
import {Alert, View,ScrollView,TextInput} from 'react-native';
import {Text,FormInput,FormLabel,FormValidationMessage,Button} from 'react-native-elements';
import FillInTheBlankService from "../services/FillInTheBlankService";

class FillInTheBlankWidget extends React.Component{

    static navigationOptions={
        title:'Fill in the Blank Question Editor'
    }

    constructor(props){
        super(props);
        this.state={
            question:'',
            title:"",
            description:"",
            points:"",
            subtitle:"",
            variables:"",
            previewMode:true,
            fib:"",
            parsed:''
        }
        this.updateQuestion=this.updateQuestion.bind(this);
        this.parseQuestion=this.parseQuestion.bind(this);
        this.fillInTheBlankService=FillInTheBlankService.instance;
    }

    componentDidMount(){
        let question=this.props.navigation.getParam('question',1);
        this.setState({question:question})
        this.setState({
            title:question.title,
            description:question.description,
            points:question.points,
            subtitle:question.subtitle,
            variables:question.variables,
            fib:question.fib
        })
        var parsed = question.fib.replace(/[[a-zA-Z]*=\d]/gi,'-#-')
        this.setState({parsed:parsed})
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
            questionType:'FB',
            variables:this.state.variables,
            fib:this.state.fib
        }

        this.fillInTheBlankService.updateQuestion(this.state.question.id,question)
            .then(Alert.alert("Fill in the Blank Question updated successfully"))
            .then(()=>this.props.navigation.state.params.onNavigateBack())
            .then(()=>this.props.navigation.goBack())

    }

    parseQuestion(fib){
        let variab=fib.match(/[[a-zA-Z]*=\d]/gi);
        let nonvariab=fib.split(/[[a-zA-Z]*=\d]/gi)
        let variables='';
        for(var i=0;i<variab.length;i++){
            var str=variab[i].replace("[","").replace("]","");
            variables=variables+' '+str;
        }
        this.setState({variables:variables,fib:fib})
        var parsed = fib.replace(/[[a-zA-Z]*=\d]/gi,'\n-#-\n')
        this.setState({parsed:parsed})
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


                    <FormLabel>Enter Question of form x + y = [four=4]</FormLabel>
                    <FormInput onChangeText={text=>(
                        this.parseQuestion(text)
                    )} value={this.state.fib}/>
                    {this.state.fib==="" &&<FormValidationMessage>Question is required</FormValidationMessage>}


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

                    {this.state.parsed.split('-').map((str,index)=>{
                        return(
                            <View key={index}>
                                {str==="#" && <TextInput  style={{height: 40, borderColor: 'gray', borderWidth: 1}}/>}
                                {str!=="#" && <TextInput value={str} editable={false}/>}
                            </View>
                        )
                    })

                    }

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

export default FillInTheBlankWidget;