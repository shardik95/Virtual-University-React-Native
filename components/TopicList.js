import React from 'react';
import {ListItem} from 'react-native-elements';
import {View} from 'react-native';

class LessonList extends React.Component{

    static navigationOptions={title:"Topics"}

    constructor(props){
        super(props);
        this.state={
            courseId:"",
            moduleId:"",
            lessonId:"",
            topics:[]
        }
    }

    componentDidMount(){
        let courseId=this.props.navigation.getParam("courseId");
        let moduleId=this.props.navigation.getParam("moduleId");
        let lessonId=this.props.navigation.getParam("lessonId");
        this.setState({courseId:courseId,moduleId:moduleId,lessonId:lessonId})
        fetch("http://localhost:8080/api/course/"+courseId+"/module/"+moduleId+"/lesson/"+lessonId)
            .then(response=>(
                response.json()
            )).then(topics=>(
            this.setState({topics:topics})
        ))
    }

    render(){
        return(
            <View style={{padding: 15}}>
                {this.state.topics.map((topic,index)=>(
                    <ListItem title={topic.title} key={index}
                    onPress={()=>this.props.navigation.navigate("WidgetList",{topicId:topic.id})}
                    />
                ))}
            </View>
        )
    }
}

export default LessonList;