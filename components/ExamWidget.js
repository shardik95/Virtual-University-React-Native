import React from 'react';
import {Text,Button} from 'react-native-elements';
import {View,Picker} from 'react-native';
import QuestionService from "../services/QuestionService";

class ExamWidget extends React.Component{

    static navigationOptions={
        title:"Exam"
    }

    constructor(props){
        super(props);
        this.state={
            examId:'',
            questions:[],
            visiblePicker:false,
            questionType:0,
        }
        this.questionService=QuestionService.instance;
        this.addQuestion=this.addQuestion.bind(this);
    }

    componentDidMount(){
        let examId=this.props.navigation.getParam("examId",1);
        this.setState({examId:examId});

    }

    addQuestion(questionType){
        console.log(questionType)
    }

    render(){
        return(
            <View style={{padding:15}}>
                <Text h3>Questions</Text>
                <Picker onValueChange={(itemValue)=>{
                    this.setState({questionType: itemValue})
                }} selectedValue={this.state.questionType}>
                    <Picker.Item value="MC" label="Multiple choice" />
                    <Picker.Item value="ES" label="Essay" />
                    <Picker.Item value="TF" label="True or false" />
                    <Picker.Item value="FB" label="Fill in the blanks" />
                </Picker>
                <Text>{'\n'}</Text>
                <Button title="Add Question" onPress={()=>{
                    this.addQuestion(this.state.questionType)
                }}/>
            </View>
        )
    }
}

export default ExamWidget;