import React from 'react';
import {Text,FormInput,FormLabel,FormValidationMessage,Button} from 'react-native-elements';
import {View} from 'react-native';

class AssignmentWidget extends React.Component{

    static navigationOptions={
        title:"Assignment Editor"
    }


    constructor(props){
        super(props);
        this.state={
            title:"",
            description:"",
            points:"",
        }

    }

    formUpdate(newState){
        this.setState(newState);
    }

    render(){
        return(
            <View>
                <FormLabel>Title</FormLabel>
                <FormInput onChangeText={text=>(
                    this.formUpdate({title:text})
                )}/>
                {this.state.title==="" && <FormValidationMessage>Title is required</FormValidationMessage>}
                <FormLabel>Description</FormLabel>
                <FormInput  onChangeText={text=>(
                    this.formUpdate({description:text})
                )}/>
                {this.state.description==="" && <FormValidationMessage>Description is required</FormValidationMessage>}
                <FormLabel>Points</FormLabel>
                <FormInput  onChangeText={text=>(
                    this.formUpdate({points:text})
                )}/>
                {this.state.points==="" &&<FormValidationMessage>Points are required</FormValidationMessage>}
                <Text>{'\n'}</Text>
                <Button title="Save" backgroundColor="green"
                        color="white"/>
                <Text>{'\n'}</Text>
                <Button title="Cancel" backgroundColor="red"
                        color="white"/>
                <Text h1>{this.state.title} - {this.state.description} - {this.state.points}</Text>
            </View>
        )
    }

}

export default AssignmentWidget;