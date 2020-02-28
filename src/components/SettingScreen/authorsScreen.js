import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import styles from './settingStyle';

export default class AuthorScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View>
                <View>
                    <Text style={[styles.headerTextStyle, { fontSize: 16 }]}>STARTER</Text>
                    <Text style={styles.textStyle}>$2.99 per/month</Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'white', marginVertical: 20, width: '30%', borderColor: '#736063', borderWidth: 1, borderRadius: 30, height: 40, justifyContent: 'center', alignItems: 'center'
                        }}
                    >
                        <Text style={[styles.linkTextStyle, { alignSelf: 'center' }]}>Change Plan</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
