import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    FlatList,
    Platform,
    Image,
    AsyncStorage
} from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import moment from 'moment';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Constant from '../../../utility/constants';
import commonStyle from '../../Common/commonStyle';
import styles from '../journalStyle';
import { editPromptAction } from '../../../actions/editPromptAction';
import EditContentTextInput from './editContentTextInput';
import PromptsImageItem from './promptImageItem';
import AlertModal from '../../Common/AlertModal';
import { mixpanelTrackWithProperties } from '../../../utility/mixpanelHelperComponent';

const IMAGE_ICON = require('../../../assets/icons/image-icon-transparent.png');

const textHeight = 19;

export default class EditPromptItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: this.props.item && this.props.item.answer,
            promptData: this.props.item,
            height: textHeight,
            lines: 1,
            open: false,
            message: '',
            email: '',
            journalType: '',
        };
    }

    componentDidUpdate() {
        if (this.saveTimeout) {
            clearTimeout(this.saveTimeout);
        }
        this.saveTimeout = setTimeout(this.hitEditPromptAPI, 1000);
    }

    getEmail = () => {
        AsyncStorage.getItem(Constant.EMAIL).then((email) => {
            this.setState({
                email,
            }, () => mixpanelTrackWithProperties(this.state.email, 'Prompt Image Uploaded', { 'Journal Type': this.state.journalType }));
        });
    };

    getContentHeight = (event) => {
        const { nativeEvent: { contentSize: { height } } } = event;
        const lines = Math.round(height / textHeight);
        const visibleHeight = textHeight * lines;
        this.setState({
            height: visibleHeight,
            lines
        });
    };

    savePrompt = () => {
        const { item } = this.props;
        this.props.hitSavePromptAPI(item._id);
        this.props.buttonToggle();
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
        const { item, journal_id, hitGetPromptsAPI } = this.props;
        const { dispatch } = this.props.navigation;
        const body = {
            prompt_id: item._id,
            answer: this.state.answer,
        };
        if (this.state.promptData && this.state.promptData.answer !== this.state.answer) {
            dispatch(editPromptAction(journal_id, body))
                .then(res => {
                    hitGetPromptsAPI && hitGetPromptsAPI(true);
                    const promptData = res[0].prompts.find(x => x._id === item._id);
                    this.setState({ promptData });
                });
        }
    };

    closeModal = () => {
        this.setState({
            open: false
        });
    }

    render() {
        const items = this.props.item;
        const { answer } = this.state;
        return (
            <View style={styles.paddingTop10}>
                {
                    items.content.length > 0 ?
                        <View>
                            {
                                items.content.map((content) => (
                                    <EditContentTextInput
                                        {...this.props}
                                        content={content}
                                        key={content._id}
                                        item={items}
                                    />
                                ))
                            }
                        </View> :
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

                }
                {
                    items.isAnswer && items.answeredBy && items.answeredDate &&
                    <View style={[commonStyle.paddingTop20, commonStyle.marginTop10]}>
                        <Text style={[styles.textStyle, commonStyle.textFont16]}>
                            {moment(items.answeredDate)
                                .format('MMMM DD, YYYY')}{' / Written by '}{_.startCase(items.answeredBy.writtenBy)}
                        </Text>
                    </View>
                }
                <View style={[commonStyle.flexRow, commonStyle.paddingTop30]}>
                    <View style={[styles.promptHeaderContainer, { flex: 5 }]}>
                        <View style={[commonStyle.flexContainer]}>
                            {
                                (items.content.length === 0 || items.content.length > 0) && <FlatList
                                    bounces
                                    ref={ref => { this.flatList = ref; }}
                                    data={items.images}
                                    horizontal
                                    alwaysBounceHorizontal={false}
                                    renderItem={({ item }) =>
                                        (<PromptsImageItem
                                            key={item._id}
                                            {...this.props}
                                            image={item}
                                        />)
                                    }
                                    keyExtractor={(item, index) => index.toString()}
                                    ListFooterComponent={() =>
                                        (items.images.length < Constant.JOURNAL_IMAGE_LIMIT ?
                                            <TouchableOpacity
                                                onPress={() => this.props.showActionSheet(items)}
                                                style={[styles.horizontalListItemContainer]}
                                            >
                                                <View style={{
                                                    alignItems: 'center',
                                                    marginVertical: 5
                                                }}
                                                >
                                                    <Image
                                                        source={IMAGE_ICON}
                                                        style={{
                                                            height: 40, width: 40, resizeMode: 'contain'
                                                        }}
                                                    />
                                                    <Text
                                                        style={[commonStyle.subHeaderTextStyle, commonStyle.textAlignCenter, { fontSize: 12 }]}
                                                    >{'UPLOAD'}
                                                    </Text>
                                                    <Text
                                                        style={[commonStyle.subHeaderTextStyle, commonStyle.textAlignCenter, { fontSize: 12 }]}
                                                    >{'PICTURES'}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity> : <View />)
                                    }
                                />

                            }

                        </View>
                    </View>
                    {
                        (items.content.length === 0 || items.content.length > 0) && items.images.length > 0 &&
                        <View style={[styles.flexEndContainer]}>

                            <TouchableOpacity
                                onPress={() => this.flatList.scrollToEnd({ animated: true })}
                                style={commonStyle.padding10}
                            >
                                <SimpleLineIcons name="arrow-right" size={25} color={Constant.TEXT_COLOR} />
                            </TouchableOpacity>

                        </View>
                    }
                    <View style={[styles.flexEndContainer, commonStyle.justifyFlexEnd]}>
                        <TouchableOpacity
                            onPress={() => {
                                this.savePrompt();
                            }}
                        >
                            <Text style={styles.textStyle}>{items.isPromptSaved ? 'Done' : 'Save'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <AlertModal
                    message={this.state.message}
                    open={!!this.state.open}
                    close={this.closeModal}
                />
            </View>
        );
    }
}

EditPromptItem.propTypes = {
    dispatch: PropTypes.func.isRequired,
    close: PropTypes.func,
    showActionSheet: PropTypes.func.isRequired,
    hitGetPromptsAPI: PropTypes.func.isRequired,
    hitSavePromptAPI: PropTypes.func.isRequired,
    buttonToggle: PropTypes.func.isRequired,
    journal_id: PropTypes.string.isRequired,
    open: PropTypes.bool,
    showSpinner: PropTypes.bool,
    hideSpinner: PropTypes.bool,
    fetching: PropTypes.bool.isRequired,
    imageSelected: PropTypes.object,
    item: PropTypes.object.isRequired,
    openAlertModalMessage: PropTypes.object,
    editPromptSelected: PropTypes.object,
    navigation: PropTypes.object.isRequired,
};
EditPromptItem.defaultProps = {
    editPromptSelected: {},
    openAlertModalMessage: {},
    imageSelected: {},
    hideSpinner: false,
    showSpinner: false,
    open: false,
    close: () => {},
};
