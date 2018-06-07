import React from 'react';
import {Text,Button,ListItem,Icon} from 'react-native-elements';
import {View,Picker,ScrollView} from 'react-native';
import QuestionService from "../services/QuestionService";
import {styles} from "../App";

class ExamWidget extends React.Component{

    static navigationOptions={
        title:"Exam",
        headerStyle: { backgroundColor: '#363636' },
        headerTitleStyle: { color: '#fff' },
        headerTintColor: 'white'
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
        this.deleteQuestion=this.deleteQuestion.bind(this);
    }

    handleOnNavigateBack = () => {
        this.questionService.findQuestionsByExamId(this.state.examId)
            .then(questions=>this.setState({questions:questions}))
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

    deleteQuestion(questionId){
        this.questionService.deleteQuestion(questionId)
        this.questionService.findQuestionsByExamId(this.state.examId)
            .then(questions=>this.setState({questions:questions}))
    }

    render(){
        return(
            <ScrollView>
                <View style={{flex: 1, flexDirection: 'row',backgroundColor:'grey',padding:10,marginBottom:5}}>
                    <View style={{flex: 6}}>
                        <Text h3 style={{color:"#fff"}}>{this.state.exam.title}</Text>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row',backgroundColor:'grey',padding:10,marginBottom:5}}>
                    <View style={{flex: 6}}>
                        <Text h5 style={{color:"#fff"}}>Questions</Text>
                    </View>
                </View>
                {this.state.questions.map((question)=> {
                    return(
                        <View key={question.id} >

                            {question.questionType === 'FB'&&<View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{flex: 5}}>
                                    <View style={styles.button1}>
                                            {question.questionType === 'FB' &&
                                        <ListItem title={question.title} subtitle={question.subtitle}
                                                  key={question.id} leftIcon={<Icon
                                            color='#fff'
                                            name='code'
                                            type='entypo'
                                        />} titleStyle={{color:'#fff',padding:5}} chevronColor="#fff"
                                                  subtitleStyle={{color:'#fff',padding:5}}
                                        onPress={()=>this.props.navigation.navigate("FillInTheBlankWidget",{
                                            question:question,onNavigateBack: this.handleOnNavigateBack
                                        })}/>}
                                    </View>
                                </View>
                                <View style={{flex: 1,marginTop:30}}>
                                    {question.questionType === 'FB' && <Icon name={'delete'}  color='grey' onPress={()=>this.deleteQuestion(question.id)} />}
                                </View>
                            </View>}


                            {question.questionType === 'TF' &&<View style={{flex: 1, flexDirection: 'row',}}>
                               <View style={{flex: 5}}>
                                    <View style={styles.button1}>
                                        {question.questionType === 'TF' &&
                                        <ListItem title={question.title} subtitle={question.subtitle}
                                                  key={question.id} leftIcon={<Icon
                                            color='#fff'
                                            name='check'
                                            type='entypo'
                                        />} titleStyle={{color:'#fff',padding:5}} chevronColor="#fff"
                                                  subtitleStyle={{color:'#fff',padding:5}}
                                                  onPress={()=>this.props.navigation.navigate("TrueFalseWidget",{
                                                      question:question,onNavigateBack: this.handleOnNavigateBack
                                                  })}/>}
                                    </View>
                                </View>
                                <View style={{flex: 1,marginTop:30}}>
                                    {question.questionType === 'TF' && <Icon name={'delete'}  color='grey' style={{padding:5}} onPress={()=>this.deleteQuestion(question.id)} />}
                                </View>
                            </View>}

                            {question.questionType === 'ES'&&<View style={{flex: 1, flexDirection: 'row',}}>
                                <View style={{flex: 5}}>
                                    <View style={styles.button1}>
                                        {question.questionType === 'ES' &&
                                        <ListItem title={question.title} subtitle={question.subtitle}
                                                  key={question.id} leftIcon={<Icon
                                            color='#fff'
                                            name='subject'
                                            type='materialicon'
                                        />} titleStyle={{color:'#fff',padding:5}} chevronColor="#fff"
                                                  subtitleStyle={{color:'#fff',padding:5}}
                                                  onPress={()=>this.props.navigation.navigate("EssayWidget",{
                                                      question:question,onNavigateBack: this.handleOnNavigateBack
                                                  })}/>}
                                    </View>
                                </View>
                                <View style={{flex: 1,marginTop:30}}>
                                    {question.questionType === 'ES' && <Icon name={'delete'}  color='grey' style={{padding:5}} onPress={()=>this.deleteQuestion(question.id)} />}
                                </View>
                            </View>}

                            {question.questionType === 'MC' && <View style={{flex: 1, flexDirection: 'row',marginTop:10}}>
                                <View style={{flex: 5}}>
                                    <View style={styles.button1}>
                                        {question.questionType === 'MC' &&
                                        <ListItem title={question.title} subtitle={question.subtitle}
                                                  key={question.id} leftIcon={<Icon
                                            color='#fff'
                                            name='check'
                                            type='entypo'
                                        />} titleStyle={{color:'#fff',padding:5}} chevronColor="#fff"
                                                  subtitleStyle={{color:'#fff',padding:5}}
                                                  onPress={()=>this.props.navigation.navigate("MultipleChoiceWidget",{
                                                      question:question,onNavigateBack: this.handleOnNavigateBack
                                                  })}/>}
                                    </View>
                                </View>
                                <View style={{flex: 1,marginTop:30}}>
                                    {question.questionType === 'MC' && <Icon name={'delete'}  color='grey'  onPress={()=>this.deleteQuestion(question.id)} />}
                                </View>
                            </View>}
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
                <Icon
                    color='red'
                    name='circle-with-plus'
                    type='entypo'
                    onPress={()=>{
                        this.addQuestion(this.state.questionType)
                    }}
                    size={40}
                />
                <Text>{'\n'}</Text>
            </ScrollView>
        )
    }
}

export default ExamWidget;