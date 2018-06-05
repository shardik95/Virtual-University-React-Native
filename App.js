import React from 'react';
import { StyleSheet, Text, ScrollView,StatusBar } from 'react-native';
import {Button} from 'react-native-elements';
import {FixedHeader} from "./elements/FixedHeader";
import {createStackNavigator} from 'react-navigation';
import CourseList from "./components/CourseList";
import ModuleList from "./components/ModuleList";
import LessonList from "./components/LessonList";
import TopicList from "./components/TopicList";
import WidgetList from "./components/WidgetList";
import AssignmentWidget from "./components/AssignmentWidget";

class Home extends React.Component{

    static navigationOptions={
        title:'Home'
    }

    constructor(props){
        super(props)
    }

    render(){
        return(
            <ScrollView>
                <FixedHeader/>
                <Button title="Course List" onPress={()=>this.props.navigation.navigate("CourseList")}/>
            </ScrollView>
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
        WidgetList,
        AssignmentWidget
    }
)

export default App;

