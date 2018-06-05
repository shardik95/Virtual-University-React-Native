import React from 'react';
import {Text} from 'react-native-elements';
import {View} from 'react-native';

class ExamWidget extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>
                <Text h2>{this.props.navigation.getParam("examId",1)}</Text>
            </View>
        )
    }
}

export default ExamWidget;