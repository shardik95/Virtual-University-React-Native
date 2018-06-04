import React from 'react';
import { StyleSheet, Text, View,StatusBar } from 'react-native';
import {Button} from 'react-native-elements';
import {FixedHeader} from "./elements/FixedHeader";
import {createStackNavigator} from 'react-navigation';
import CourseList from "./components/CourseList";
import ModuleList from "./components/ModuleList";
import LessonList from "./components/LessonList";
import TopicList from "./components/TopicList";
import WidgetList from "./components/WidgetList";

class Home extends React.Component{

    static navigationOptions={
        title:'Home'
    }

    constructor(props){
        super(props)
    }

    render(){
        return(
            <View>
                <FixedHeader/>
                <Button title="Course List" onPress={()=>this.props.navigation.navigate("CourseList")}/>
            </View>
        )
    }

}


const App = createStackNavigator(
    {
        Home,
        CourseList,
        ModuleList,
        LessonList,
        TopicList,
        WidgetList
    }
)

export default App;

