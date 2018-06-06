import React from 'react';
import {Text,ListItem} from 'react-native-elements';
import {View} from 'react-native';
import {styles} from "../App";
import Icon from "react-native-elements/src/icons/Icon";

class ModuleList extends React.Component{

    static navigationOptions={
        title:"Modules",
        headerStyle: { backgroundColor: '#363636' },
        headerTitleStyle: { color: '#fff' },
        headerTintColor: 'white'
    }

    constructor(props){
        super(props)
        this.state={
            courseId:"",
            modules:[]
        }
    }

    componentDidMount(){
        let courseId = this.props.navigation.getParam("courseId",2)
        this.setState({courseId:courseId})
        fetch("http://localhost:8080/api/course/"+courseId+"/module")
            .then(response =>(
                response.json()
            )).then(modules=>(
                this.setState({modules:modules})
        ))
    }

    render(){
        return(
            <View style={{padding: 15}}>
                {this.state.modules.map((module,index)=>(
                    <View key={index} style={styles.button}>
                        <ListItem
                            key={index}
                            title={module.title}
                            onPress={() => this.props.navigation.navigate("LessonList", {
                                courseId: this.state.courseId,
                                moduleId: module.id
                            })}
                            titleStyle={{color:'#fff',paddingLeft:5}} chevronColor="#fff"
                            leftIcon={<Icon
                                color='#fff'
                                name='open-book'
                                type='entypo'
                            />
                            }
                        />
                    </View>
                ))}
            </View>
        )
    }

}

export default ModuleList;