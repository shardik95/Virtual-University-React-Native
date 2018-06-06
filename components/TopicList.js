import React from 'react';
import {ListItem} from 'react-native-elements';
import {View} from 'react-native';
import {styles} from "../App";
import Icon from "react-native-elements/src/icons/Icon";

class LessonList extends React.Component{

    static navigationOptions={title:"Topics",
        headerStyle: { backgroundColor: '#363636' },
        headerTitleStyle: { color: '#fff' },
        headerTintColor: 'white'}

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
                    <View key={index} style={styles.button}>
                        <ListItem title={topic.title} key={index}
                        onPress={()=>this.props.navigation.navigate("WidgetList",{topicId:topic.id})}
                                  titleStyle={{color:'#fff',paddingLeft:5}} chevronColor="#fff"
                                  leftIcon={<Icon
                                      color='#fff'
                                      name='md-bookmark'
                                      type='ionicon'
                                  />}
                        />
                    </View>
                ))}
            </View>
        )
    }
}

export default LessonList;