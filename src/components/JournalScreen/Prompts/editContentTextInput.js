import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput, Platform,
} from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import commonStyle from '../../Common/commonStyle';
import { editPromptAction } from '../../../actions/editPromptAction';
import styles from '../journalStyle';

const textHeight = 19;

export default class EditContentTextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: this.props.content && this.props.content.answer,
            contentData: this.props.content,
            height: textHeight,
            lines: 1,
        };
    }

    componentDidUpdate() {
        if (this.saveTimeout) clearTimeout(this.saveTimeout);
        this.saveTimeout = setTimeout(this.hitEditPromptAPI, 5000);
    }

    getContentHeight = (event) => {
        const { nativeEvent: { contentSize: { height } } } = event;
        const lines = Math.round(height / textHeight);
        const visibleHeight = textHeight * lines;
        this.setState({
            height: visibleHeight,
            lines
        });
    };

    /**
     * Method to set state of the text input value.
     */
    handleTextChange = field => (text) => {
        const newState = {};
        newState[field] = text;
        this.setState(newState);
    };

    hitEditPromptAPI = () => {
        const { item, journal_id, content } = this.props;
        const { dispatch } = this.props.navigation;
        const body = {
            prompt_id: item._id,
            content_id: content._id,
            answer: this.state.answer,
        };
        if (this.state.contentData && this.state.contentData.answer !== this.state.answer) {
            dispatch(editPromptAction(journal_id, body))
                .then(res => {
                    const promptData = res[0].prompts.find(x => x._id === item._id);
                    const contentData = promptData.content.find(x => x._id === content._id);
                    this.setState({ contentData });
                });
        }
    };

    render() {
        const { content } = this.props;
        const { answer } = this.state;
        return (
            <View style={commonStyle.paddingTop20}>
                <Text style={commonStyle.subHeaderTextStyle}>{content.name}</Text>
                {/* <TextInput */}
                {/* style={[commonStyle.textAreaInput, {padding: 0}]} */}
                {/* value={answer} */}
                {/* autoCorrect={false} */}
                {/* spellCheck={false} */}
                {/* autoCapitalize={'none'} */}
                {/* onChangeText={this.handleTextChange('answer')} */}
                {/* underlineColorAndroid={'transparent'} */}
                {/* /> */}
                <View style={styles.textAreaContainer}>
                    <View style={{ paddingTop: Platform.OS === 'ios' ? 6 : 0 }}>
                        {_.times(this.state.lines, (count) => <View key={count} style={styles.hr} />)}
                    </View>
                    <TextInput
                        style={[styles.textArea, Platform.OS === 'ios' ? '' : { height: this.state.height }]}
                        underlineColorAndroid="transparent"
                        value={answer}
                        multiline
                        autoCorrect
                        spellCheck={false}
                        scrollEnabled={false}
                        autoCapitalCheckize="none"
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        onChangeText={this.handleTextChange('answer')}
                        onContentSizeChange={(event) => this.getContentHeight(event)}
                    />
                </View>
            </View>
        );
    }
}

EditContentTextInput.propTypes = {
    dispatch: PropTypes.func.isRequired,
    content: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    journal_id: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired,
};
