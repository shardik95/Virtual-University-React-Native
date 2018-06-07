import React from 'react';
import {Alert, View,ScrollView,TextInput} from 'react-native';
import {Text,FormInput,FormLabel,FormValidationMessage,Button} from 'react-native-elements';
import FillInTheBlankService from "../services/FillInTheBlankService";
import Icon from "react-native-elements/src/icons/Icon";

class FillInTheBlankWidget extends React.Component{

    static navigationOptions={
        title:"Fill in the blank Editor",
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
        let no;
        return(
            <ScrollView>
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

                    <View style={{padding: 15, marginBottom: 0}}>
                        <View style={{flex: 1, backgroundColor: 'grey', padding: 11, marginBottom: 2}}>
                            <TextInput editable={false} style={{color: "#fff"}}>Enter Question of form x + y = [four=4]</TextInput>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{flex: 6}}>
                                    <TextInput style={{
                                        height: 40,
                                        borderColor: 'black',
                                        borderWidth: 1,
                                        backgroundColor: 'white'
                                    }} onChangeText={text=>(
                                        this.parseQuestion(text)
                                    )} value={this.state.fib}/>
                                </View>
                                {this.state.fib === "" &&
                                <FormValidationMessage>Question is required</FormValidationMessage>}
                            </View>
                        </View>
                    </View>

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

                    <View style={{backgroundColor:'grey',padding:10,marginBottom:5}}>
                        <Text h4 style={{color:"#fff"}}>Question:</Text>
                        <Text style={{color:"#fff"}}>{this.state.fib}</Text>
                    </View>


                    {this.state.parsed.split('-').map((str,index)=>{
                        return(
                            <View key={index}>
                                {str==="#" && <TextInput  style={{height: 40,width:160, borderColor: 'black', borderWidth: 1}}/>}
                                {str!=="#" && <TextInput value={str} editable={false}/>}
                            </View>
                        )
                    })

                    }

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

export default FillInTheBlankWidget;