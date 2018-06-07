import React from 'react';
import {View, ScrollView, TextInput, Alert} from 'react-native';
import {Text,FormValidationMessage,FormLabel,FormInput,Button,CheckBox} from 'react-native-elements';
import TrueOrFalseService from "../services/TrueOrFalseService";
import RadioForm from 'react-native-simple-radio-button';
import Icon from "react-native-elements/src/icons/Icon";


class TrueFalseWidget extends React.Component{

    static navigationOptions={
        title:"True/False Editor",
        headerStyle: { backgroundColor: '#363636' },
        headerTitleStyle: { color: '#fff' },
        headerTintColor: 'white'
    }

    constructor(props){
        super(props);
        this.state={
            question:'',
            title:"",
            description:"",
            points:"",
            subtitle:"",
            isTrue:'1',
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
        let no;
        return(
            <ScrollView style={{padding: 15}} >
                {this.state.previewMode &&<ScrollView>

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
                                    }} value={this.state.question.title}/>
                                </View>
                                {this.state.title === "" &&
                                <FormValidationMessage>Title is required</FormValidationMessage>}
                            </View>
                        </View>
                    </View>

                    <View style={{padding: 15, marginBottom: 0}}>
                        <View style={{flex: 1, backgroundColor: 'grey', padding: 11, marginBottom: 2}}>
                            <TextInput editable={false} style={{color: "#fff"}}>Subtitle</TextInput>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{flex: 6}}>
                                    <TextInput style={{
                                        height: 40,
                                        borderColor: 'black',
                                        borderWidth: 1,
                                        backgroundColor: 'white'
                                    }} onChangeText={(text) => {
                                        this.formUpdate({subtitle: text})
                                    }} value={this.state.question.subtitle}/>
                                </View>
                                {this.state.subtitle === "" &&
                                <FormValidationMessage>Subtitle is required</FormValidationMessage>}
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
                                    }} value={this.state.question.description}/>
                                </View>
                                {this.state.description === "" &&
                                <FormValidationMessage>Description is required</FormValidationMessage>}
                            </View>
                        </View>
                    </View>

                    {no = this.state.question.points}
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

                    <CheckBox onPress={() => this.formUpdate(this.state.isTrue==='1'? {isTrue:'0'} : {isTrue:'1'} )}
                              checked={this.state.isTrue=='1'} title='The answer is true'/>

                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 2}}>
                            <Icon name={'save'} size={40} color="green"
                                  onPress={() => this.updateQuestion()}
                                  type='entypo'/>
                        </View>
                        <View style={{flex: 2}}>
                            <Icon name={'cancel'} size={40} color="red"
                                  onPress={() => this.props.navigation.goBack()}
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

                    <RadioForm
                        radio_props={this.state.radio_props}
                        initial={0}
                        onPress={(value) => {this.setState({value:value})}}
                    />

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
                </View>
                }


            </ScrollView>
        )
    }


}

export default TrueFalseWidget;