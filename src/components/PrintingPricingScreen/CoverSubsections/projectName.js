import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Text,
    TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import style from '../printingStyles';


class ProjectName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: props.projectName ? props.projectName : ''
        };
    }

    handleTextChange = field => (text) => {
        this.props.handleTextChange(field, text);
        const newState = {};
        newState[field] = text;
        this.setState(newState);
    };

    render() {
        return (
            <View style={style.coverTextContent}>
                <TextInput
                    style={[style.coverText, style.inputStyle, { marginBottom: 20 }]}
                    value={this.state.projectName}
                    autoCorrect
                    spellCheck={false}
                    scrollEnabled={false}
                    autoCapitalize="words"
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    onChangeText={this.handleTextChange('projectName')}
                    maxLength={30}
                />
            </View>
        );
    }
}

ProjectName.propTypes = {
    handleTextChange: PropTypes.func.isRequired,
    projectName: PropTypes.string.isRequired,
};

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(ProjectName);
