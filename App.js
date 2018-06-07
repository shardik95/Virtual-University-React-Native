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
import ExamWidget from "./components/ExamWidget";
import FillInTheBlankWidget from "./components/FillInTheBlankWidget";
import TrueFalseWidget from "./components/TrueFalseWidget";
import MultipleChoiceWidget from "./components/MultipleChoiceWidget";
import EssayWidget from "./components/EssayWidget";


class Home extends React.Component{

    static navigationOptions={
        header:<FixedHeader name="Home"/>
    }

    constructor(props){
        super(props)
    }

    render(){
        return(
            <ScrollView>
                <StatusBar barStyle="light-content"/>
                <Button icon={{
                                name: 'book',
                                size: 25,
                                color: 'white'
                            }}
                         buttonStyle={styles.button}
                         title="Course List"
                         onPress={()=>this.props.navigation.navigate("CourseList")}/>
            </ScrollView>
        )
    }

}

export const styles= StyleSheet.create({
    button:{
        backgroundColor: "rgba(92, 99,216, 1)",
        margin:15,
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5,
    },
    fontcolor:{
      color:'#fff'
    },
    button1:{
        backgroundColor: "rgba(92, 99,216, 1)",
        margin:15,
        height: 65,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5,
    },

})

const App = createStackNavigator(
    {
        Home,
        CourseList,
        ModuleList,
        LessonList,
        TopicList,
        WidgetList,
        AssignmentWidget,
        ExamWidget,
        FillInTheBlankWidget,
        TrueFalseWidget,
        MultipleChoiceWidget,
        EssayWidget
    }
)

export default App;

