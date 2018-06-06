import React from 'react';
import {Header} from 'react-native-elements';

export const FixedHeader = ({name}) => (
    <Header
        leftComponent={{icon:"menu",color:"#fff"}}
        centerComponent={{text:name,style:{color:"#fff",fontSize:16}}}
        rightComponent={{icon:"home",color:"#fff"}}
        backgroundColor='#363636'
    />
)
