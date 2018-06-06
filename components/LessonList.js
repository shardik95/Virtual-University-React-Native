import React from 'react';
import {ListItem} from 'react-native-elements';
import {View} from 'react-native';
import {styles} from "../App";
import Icon from "react-native-elements/src/icons/Icon";

class LessonList extends React.Component{

    static navigationOptions={ title:"Lessons",
        headerStyle: { backgroundColor: '#363636' },
        headerTitleStyle: { color: '#fff' },
        headerTintColor: 'white'}

    constructor(props){
        super(props);
        this.state={
            courseId:"",
            moduleId:"",
            lessons:[]
        }
    }

    componentDidMount(){
        let courseId=this.props.navigation.getParam("courseId");
        let moduleId=this.props.navigation.getParam("moduleId");
        this.setState({courseId:courseId,moduleId:moduleId})
        fetch("http://localhost:8080/api/course/"+courseId+"/module/"+moduleId+"/lesson")
            .then(response=>(
                response.json()
            )).then(lessons=>(
                this.setState({lessons:lessons})
        ))
    }

    render(){
        return(
            <View style={{padding: 15}}>
                {this.state.lessons.map((lesson,index)=>(
                    <View key={index} style={styles.button}>
                        <ListItem title={lesson.title} key={index}
                                  onPress={() => this.props.navigation.navigate("TopicList", {
                                      courseId: this.state.courseId,
                                      moduleId: this.state.moduleId,
                                      lessonId:lesson.id
                                  })}
                                  titleStyle={{color:'#fff',paddingLeft:5}} chevronColor="#fff"
                                  leftIcon={<Icon
                                      color='#fff'
                                      name='open-book'
                                      type='entypo'
                                  />}
                        />
                    </View>
                ))}
            </View>
        )
    }
}

export default LessonList;