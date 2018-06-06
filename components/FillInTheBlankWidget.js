import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';

class FillInTheBlankWidget extends React.Component{

    static navigationOptions={
        title:'Fill in the Blank Question Editor'
    }

    constructor(props){
        super(props);
        this.state={
            question:''
        }
    }

    componentDidMount(){
        let question=this.props.navigation.getParam('question',1);
        this.setState({question:question})
    }

    render(){
        return(
            <View>
                <Text h1>{this.state.question.title}</Text>
            </View>
        )
    }


}

export default FillInTheBlankWidget;