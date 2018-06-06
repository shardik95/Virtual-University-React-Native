import React from 'react';
import {Text,Button,ListItem} from 'react-native-elements';
import {View,Picker,ScrollView} from 'react-native';
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
            questions:[],
            exam:''
        }
        this.questionService=QuestionService.instance;
        this.addQuestion=this.addQuestion.bind(this);
    }

    componentDidMount(){
        let examId=this.props.navigation.getParam("examId",1);
        let exam=this.props.navigation.getParam("exam",1)
        this.setState({examId:examId,exam:exam});
        this.questionService.findQuestionsByExamId(examId)
            .then(questions=>this.setState({questions:questions}))
    }

    addQuestion(questionType){
        this.questionService.addQuestion(questionType,this.state.examId)
            .then(()=>this.questionService.findQuestionsByExamId(this.state.examId))
            .then(questions=>this.setState({questions:questions}))

    }

    render(){
        return(
            <ScrollView style={{padding:15}}>
                <Text h2>{this.state.exam.title}</Text>
                <Text h3>Questions</Text>
                {this.state.questions.map((question)=> {

                    return(
                        <View key={question.id}>
                            {question.questionType === 'FB' &&
                        <ListItem title={question.title} subtitle={question.subtitle}
                                  key={question.id} leftIcon={{name: 'code'}}
                        onPress={()=>this.props.navigation.navigate("FillInTheBlankWidget",{
                            question:question
                        })}/>}
                            {question.questionType === 'TF' &&
                        <ListItem title={question.title} subtitle={question.subtitle}
                                  key={question.id} leftIcon={{name: 'check'}}
                                  onPress={()=>this.props.navigation.navigate("TrueFalseWidget",{
                                      question:question
                                  })}/>}
                            {question.questionType === 'ES' &&
                            <ListItem title={question.title} subtitle={question.subtitle}
                                      key={question.id} leftIcon={{name: 'subject'}}
                                      onPress={()=>this.props.navigation.navigate("EssayWidget",{
                                          question:question
                                      })}
                            />}
                            {question.questionType === 'MC' &&
                            <ListItem title={question.title} subtitle={question.subtitle}
                                      key={question.id} leftIcon={{name: 'list'}}
                                      onPress={()=>this.props.navigation.navigate("MultipleChoiceWidget",{
                                          question:question
                                      })}/>}
                        </View>
                    )



                })}
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
                <Text>{'\n'}</Text>
            </ScrollView>
        )
    }
}

export default ExamWidget;