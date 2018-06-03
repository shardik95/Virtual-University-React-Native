import React from 'react';
import {View} from 'react-native';
import {Text,ListItem} from 'react-native-elements';

class CourseList extends React.Component{
    static navigationOptions={
        title:"Courses"
    }

    constructor(props){
        super(props);
        this.state={
            courses:[]
        }
    }

    componentDidMount(){
        fetch("http://localhost:8080/api/course")
            .then(response =>(
                response.json()
            )).then(courses=>(
            this.setState({courses:courses})
        ))
    }

    render(){
        return(
            <View style={{padding: 15}}>
                {this.state.courses.map( (course,index)=>(
                    <ListItem key={index} title={course.title}
                    onPress={()=>this.props.navigation.navigate("ModuleList",{courseId:course.id})}
                    />
                ))}
            </View>
        )
    }

}

export default CourseList;