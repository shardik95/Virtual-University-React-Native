import React from 'react';
import {ListItem} from 'react-native-elements';
import {View} from 'react-native';

class LessonList extends React.Component{

    static navigationOptions={title:"Lessons"}

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
                    <ListItem title={lesson.title} key={index}
                              onPress={() => this.props.navigation.navigate("TopicList", {
                                  courseId: this.state.courseId,
                                  moduleId: this.state.moduleId,
                                  lessonId:lesson.id
                              })}
                    />
                ))}
            </View>
        )
    }
}

export default LessonList;