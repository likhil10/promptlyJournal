import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import Constant from '../../../utility/constants';
import commonStyle from '../../Common/commonStyle';
import styles from '../journalStyle';
import EditPromptItem from './editPropmtItem';
import OptionsPrompt from './promptOptionsPopup';

export default class PromptsItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editPrompt: false,
            isVisible: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && this.state.editPrompt && this.props.editPrompt !== '') {
            this.setState({ editPrompt: false });
        }
        if (nextProps && nextProps.item && !nextProps.item.isPromptSaved && nextProps.item.isAnswer) {
            this.setState({ editPrompt: true });
        }
    }

    buttonToggle = () => {
        const { editPrompt } = this.state;
        this.setState({ editPrompt: !editPrompt });
    };

    openOptionsPopover = () => this.setState({ isVisible: true });

    closeOptionsPopover = () => this.setState({ isVisible: false });

    renderCard = () => {
        const { item, promptId } = this.props;
        const { editPrompt } = this.state;
        if (_.toUpper(item._id) === promptId) {
            this.buttonToggle();
        }
        return (
            <View
                style={!item.isPromptSaved ? styles.listPromptItemContainer : [styles.listPromptItemContainer, commonStyle.backColorFaded]}
            >
                <View style={styles.leftPromptContainer}>
                    <View style={commonStyle.flexRow}>
                        <TouchableOpacity style={styles.promptHeaderContainer} onPress={() => this.buttonToggle()}>
                            <Text
                                style={[commonStyle.subHeaderTextStyle, { fontSize: 14 }]}
                                numberOfLines={(!editPrompt) ? 3 : null}
                            >{_.toUpper(item.name)}
                            </Text>
                        </TouchableOpacity>
                        {
                            !editPrompt &&
                            <View style={styles.flexEndContainer}>
                                <TouchableOpacity onPress={() => this.buttonToggle()}>
                                    <Text
                                        style={[styles.textStyle, { fontSize: 14 }]}
                                    >{item.isAnswer ? 'Edit' : 'Answer'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                    {
                        (editPrompt || (item._id === promptId)) && <EditPromptItem
                            {...this.props}
                            key={item._id}
                            buttonToggle={this.buttonToggle}
                        />
                    }
                </View>
                <View
                    style={!editPrompt ? [styles.rightPromptContainer] : [styles.rightPromptContainer, commonStyle.justifyFlexEnd]}
                >
                    <TouchableOpacity
                        onPress={() => this.openOptionsPopover()}
                        ref={ref => { this.touchable = ref; }}
                    ><EntypoIcons name="dots-three-vertical" size={30} color={Constant.TEXT_COLOR} />
                    </TouchableOpacity>
                    <OptionsPrompt
                        {...this.props}
                        item={item}
                        openImagesModal={this.props.openImagesModal}
                        isVisible={this.state.isVisible}
                        touchable={this.touchable}
                        closeOptionsPopover={this.closeOptionsPopover}
                    />
                </View>
            </View>
        );
    };

    render() {
        const { editPrompt } = this.state;
        return (
            !editPrompt ?
                <TouchableOpacity onPress={() => this.buttonToggle()}>
                    {this.renderCard()}
                </TouchableOpacity> :
                <View>
                    {this.renderCard()}
                </View>
        );
    }
}

PromptsItem.propTypes = {
    closeOptionsPopover: PropTypes.func,
    isPromptSaved: PropTypes.bool,
    touchable: PropTypes.object,
    item: PropTypes.object.isRequired,
    openImagesModal: PropTypes.func.isRequired,
    openPrintedModal: PropTypes.func.isRequired,
    openDuplicatePromptModal: PropTypes.func.isRequired,
    openDeletePromptModal: PropTypes.func.isRequired,
    openWrittenByPromptModal: PropTypes.func.isRequired,
    editPrompt: PropTypes.bool.isRequired,
    openMovePromptModal: PropTypes.func.isRequired,
    promptId: PropTypes.string.isRequired,
    openChangeTimeStampModal: PropTypes.string.isRequired,
};
PromptsItem.defaultProps = {
    touchable: {},
    isPromptSaved: false,
    closeOptionsPopover: () => {},
};
