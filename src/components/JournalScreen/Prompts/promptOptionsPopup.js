import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import PropTypes from 'prop-types';
import Popover from 'react-native-popover-view';
import Constant from '../../../utility/constants';
import Icon from '../../../utility/iconConstant';
import commonStyle from '../../Common/commonStyle';
import styles from '../journalStyle';


export default class OptionsPrompt extends Component {
    callToAction = (action) => {
        const { item, closeOptionsPopover } = this.props;
        closeOptionsPopover();
        switch (action) {
        case 'PRINTED': {
            if (item.isAnswer) {
                this.props.openPrintedModal(Constant.PRINTED_PROMPT_TEXT);
            } else {
                this.props.openPrintedModal(Constant.NOT_PRINTED_PROMPT_TEXT, Constant.NOT_PRINTED_PROMPT_2ND_TEXT);
            }
            break;
        }
        case 'DUPLICATE': {
            this.props.openDuplicatePromptModal(item);
            break;
        }
        case 'DELETE': {
            this.props.openDeletePromptModal(item);
            break;
        }
        case 'WRITTEN_BY': {
            this.props.openWrittenByPromptModal(item);
            break;
        }
        case 'MOVE': {
            this.props.openMovePromptModal(item);
            break;
        }
        case 'TIMESTAMP': {
            this.props.openChangeTimeStampModal(item);
            break;
        }
        default: {
            // Need to set the default state.
        }
        }
    };

    render() {
        const {
            item, isVisible, touchable, closeOptionsPopover
        } = this.props;
        return (
            <Popover
                isVisible={isVisible}
                fromView={touchable}
                showBackground={false}
                popoverStyle={{ backgroundColor: Constant.TEXT_COLOR, }}
                arrowStyle={{ backgroundColor: Constant.TEXT_COLOR }}
                onClose={closeOptionsPopover}
            >
                <View style={[commonStyle.padding10, commonStyle.flexRow, {
                    backgroundColor: Constant.TEXT_COLOR,
                }]}
                >
                    {item.isAnswer &&
                    <View style={commonStyle.flexDirectionRow}>
                        <TouchableOpacity onPress={() => this.callToAction('TIMESTAMP')}>
                            <Image
                                source={Icon.CALENDAR_ICON}
                                style={styles.optionsIconStyle}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.callToAction('WRITTEN_BY')}>
                            <Image
                                source={Icon.PROFILE_ICON}
                                style={styles.optionsIconStyle}
                            />
                        </TouchableOpacity>
                    </View>
                    }
                    {item.isDuplicate &&
                    <TouchableOpacity onPress={() => this.callToAction('MOVE')}>
                        <Image
                            source={Icon.JOURNAL_ICON_2}
                            style={styles.optionsIconStyle}
                        />
                    </TouchableOpacity>
                    }
                    {(item.isDuplicate || item.isAnswer) &&
                    <TouchableOpacity onPress={() => this.callToAction('DELETE')}>
                        <Image
                            source={Icon.TRASH_ICON}
                            style={styles.optionsIconStyle}
                        />
                    </TouchableOpacity>
                    }
                    <TouchableOpacity
                        onPress={() => this.callToAction('DUPLICATE')}
                    >
                        <Image
                            source={Icon.DUPLICATE_ICON}
                            style={styles.optionsIconStyle}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.callToAction('PRINTED')}
                    >
                        <Image
                            source={item.isAnswer ? Icon.OPEN_BOOK_ICON : Icon.CLOSE_BOOK_ICON}
                            style={styles.optionsIconStyle}
                        />
                    </TouchableOpacity>
                </View>
            </Popover>
        );
    }
}

OptionsPrompt.propTypes = {
    closeOptionsPopover: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
    touchable: PropTypes.object,
    openPrintedModal: PropTypes.func.isRequired,
    openDuplicatePromptModal: PropTypes.func.isRequired,
    openDeletePromptModal: PropTypes.func.isRequired,
    openWrittenByPromptModal: PropTypes.func.isRequired,
    openMovePromptModal: PropTypes.func.isRequired,
    openChangeTimeStampModal: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
};
OptionsPrompt.defaultProps = {
    touchable: {},
};
