import React from 'react';
import {ListItem,Button} from 'react-native-elements';
import {View,Alert,Text} from 'react-native';

class LessonList extends React.Component{

    static navigationOptions={title:"Widgets"}

    constructor(props){
        super(props);
        this.state={
            topicId:"",
            widgets:[],
            assignments:[]
        }
    }

    componentDidMount(){
        let topicId=this.props.navigation.getParam("topicId");
        this.setState({topicId:topicId})
        fetch("http://localhost:8080/api/topic/"+topicId+"/assignment")
            .then(response=>(
                response.json()
            )).then(assignments=>(
            this.setState({assignments:assignments})
        ))

    }

    render(){
        return(
            <View style={{padding: 15}}>
                {this.state.assignments.map( (assignment, index)=>(
                    <ListItem title={assignment.title} key={index}/>
                ))}
                <Text>{'\n'}</Text>
               <Button title="Add Assignment" onPress={()=>this.props.navigation.navigate("AssignmentWidget")}/>
            </View>
        )
    }
}

export default LessonList;