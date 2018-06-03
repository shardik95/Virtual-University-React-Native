import React from 'react';
import {ListItem} from 'react-native-elements';
import {View} from 'react-native';

class LessonList extends React.Component{

    static navigationOptions={title:"Widgets"}

    constructor(props){
        super(props);
        this.state={
            topicId:"",
            widgets:[]
        }
    }

    componentDidMount(){
        let topicId=this.props.navigation.getParam("topicId");
        this.setState({topicId:topicId})
        fetch("http://localhost:8080/api/topic/"+topicId+"/widget")
            .then(response=>(
                response.json()
            )).then(widgets=>(
            this.setState({widgets:widgets})
        ))
    }

    render(){
        return(
            <View style={{padding: 15}}>
                {this.state.widgets.map((widget,index)=>(
                    <ListItem title={widget.widgetName} key={index}
                    />
                ))}
            </View>
        )
    }
}

export default LessonList;