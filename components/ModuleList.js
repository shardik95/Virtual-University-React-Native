import React from 'react';
import {Text,ListItem} from 'react-native-elements';
import {View} from 'react-native';

class ModuleList extends React.Component{

    static navigationOptions={title:"Modules"}

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
                    <ListItem
                        key={index}
                        title={module.title}
                        onPress={() => this.props.navigation.navigate("LessonList", {
                            courseId: this.state.courseId,
                            moduleId: module.id
                        })}
                    />
                ))}
            </View>
        )
    }

}

export default ModuleList;