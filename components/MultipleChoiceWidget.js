import React from 'react';
import {View, ScrollView, Alert,TextInput} from 'react-native';
import {Text,FormInput,FormValidationMessage,FormLabel,Button,CheckBox} from 'react-native-elements';
import MultipleChoiceService from "../services/MultipleChoiceService";
import Icon from "react-native-elements/src/icons/Icon";


class MultipleChoiceWidget extends React.Component{

    static navigationOptions={
        title:"MCQ Editor",
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
                            <TextInput editable={false} style={{color: "#fff"}}>Options</TextInput>
                    {this.state.options.map((str,index)=>(
                        <View style={{ flexDirection: 'row'}} key={index}>
                            {str!=='' &&<CheckBox title={str} key={index}
                                                  onPress={() => this.formUpdate({correctOption: index})}
                            checked={this.state.correctOption==(index)}/>}
                            {str!=='' &&<Icon name={'delete'} onPress={()=>this.deleteOption(str)}/>}
                        </View>
                    ))}
                        </View>
                    </View>

                    <View style={{padding: 15,flex:1, marginBottom: 0}}>
                        <View style={{flex: 1, backgroundColor: 'grey', padding: 11, marginBottom: 2}}>
                            <TextInput editable={false} style={{color: "#fff"}}>Options</TextInput>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:5}}>
                                <TextInput onChangeText={text=>(
                                    this.formUpdate({newOption:text})
                                )} style={{height: 40, borderColor: 'black', borderWidth: 1,backgroundColor:'white'}} />
                            </View>
                            <View style={{flex:1,marginTop:5}}>
                                <Icon
                                    color='black'
                                    name='circle-with-plus'
                                    type='entypo'
                                    onPress={()=>this.addOption()}
                                    size={30}
                                />
                            </View>
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
                    <Text>{'\n'}</Text>
                </ScrollView>}

                {!this.state.previewMode && <ScrollView>
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
                            <TextInput editable={false} style={{color: "#fff"}}>Options</TextInput>
                            <View style={{flex: 1}}>
                                {this.state.options.map((str,index)=>(
                                    <View key={index}>
                                        {str!=='' &&<CheckBox title={str} key={index}
                                                              onPress={() => this.formUpdate({correctOption: index})}
                                                              checked={this.state.correctOption==(index)}/>}
                                    </View>
                                ))}
                            </View>
                        </View>
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
                </ScrollView>}

            </ScrollView>
        )
    }


}


export default MultipleChoiceWidget;