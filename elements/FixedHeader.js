import React from 'react';
import {Header} from 'react-native-elements';

export const FixedHeader = () => (
    <Header
        leftComponent={{icon:"menu",color:"#fff"}}
        centerComponent={{text:"Title",style:{color:"#fff"}}}
        rightComponent={{icon:"home",color:"#fff"}}
    />
)