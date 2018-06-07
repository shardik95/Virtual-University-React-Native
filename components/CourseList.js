import React from 'react';
import {View} from 'react-native';
import {Text,ListItem} from 'react-native-elements';
import {styles} from "../App";
import Icon from "react-native-elements/src/icons/Icon";

class CourseList extends React.Component{
    static navigationOptions={
        title:"Courses",
        headerStyle: { backgroundColor: '#363636' },
        headerTitleStyle: { color: '#fff' },
        headerTintColor: 'white'
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
                    <View key={index} style={styles.button}>
                    <ListItem  title={course.title} titleStyle={{color:'#fff',paddingLeft:5}} chevronColor="#fff"
                    onPress={()=>this.props.navigation.navigate("ModuleList",{courseId:course.id})}
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

export default CourseList;