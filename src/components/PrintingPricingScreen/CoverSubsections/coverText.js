import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Text,
    TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import style from '../printingStyles';

class CoverText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstLine: props.firstLine ? props.firstLine : '',
            secondLine: props.secondLine ? props.secondLine : '',
            thirdLine: props.thirdLine ? props.thirdLine : '',
        };
    }

    handleTextChange = field => (text) => {
        this.props.handleTextChange(field, text);
        const newState = {};
        newState[field] = text;
        this.setState(newState);
    };

    render() {
        const { firstLine, secondLine, thirdLine } = this.state;
        return (
            <View style={style.coverTextContent}>
                <Text style={style.coverText}>
                    FIRST LINE*
                </Text>
                <TextInput
                    style={[style.coverText, style.inputStyle]}
                    value={firstLine}
                    autoCorrect
                    spellCheck={false}
                    scrollEnabled={false}
                    autoCapitalize="words"
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    onChangeText={this.handleTextChange('firstLine')}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                        this.secondLine.focus();
                    }}
                    maxLength={30}
                />
                <Text style={style.coverText}>
                    SECOND LINE
                </Text>
                <TextInput
                    ref={el => { this.secondLine = el; }}
                    style={[style.coverText, style.inputStyle]}
                    value={secondLine}
                    autoCorrect
                    spellCheck={false}
                    scrollEnabled={false}
                    autoCapitalize="words"
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    onChangeText={this.handleTextChange('secondLine')}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                        this.thirdLine.focus();
                    }}
                    maxLength={30}
                />
                <Text style={style.coverText}>
                    THIRD LINE
                </Text>
                <TextInput
                    ref={el => { this.thirdLine = el; }}
                    style={[style.coverText, style.inputStyle]}
                    value={thirdLine}
                    autoCorrect
                    spellCheck={false}
                    scrollEnabled={false}
                    autoCapitalize="words"
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    onChangeText={this.handleTextChange('thirdLine')}
                    returnKeyType="go"
                    maxLength={30}
                />
            </View>
        );
    }
}

CoverText.propTypes = {
    handleTextChange: PropTypes.func.isRequired,
    firstLine: PropTypes.string.isRequired,
    secondLine: PropTypes.string.isRequired,
    thirdLine: PropTypes.string.isRequired,
};

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(CoverText);
