import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Constant from '../../utility/constants';
import styles from './commonStyle';
import Config from '../../utility/config';
import AlertModal from './AlertModal';
import SearchPopover from '../Common/searchPopover';


const SEARCH_ICON = require('../../assets/icons/icon_3.png');

export default class TabHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openPopover: false,
        };
    }

    closeModal = () => {
        this.setState({
            open: false
        });
    };

    closePopover = () => {
        this.setState({
            openPopover: false
        });
    };


    render() {
        const {
            journalData, displayText, openImage, disabled, subSection, section, openModal
        } = this.props;
        return (
            <View style={styles.headerContainer}>
                <View style={[styles.headerLeftContainer]}>
                    {displayText === '' &&
                            <View style={styles.imageCircle}>
                                <TouchableOpacity
                                    onPress={() => openImage({ uri: journalData && journalData.image ? `${Config.BASE_URL}${journalData.image}` : Constant.DEFAULT_JOURNAL_IMAGE })}
                                    disabled={disabled}
                                >
                                    <Image
                                        source={{ uri: journalData && journalData.image ? `${Config.BASE_URL}${journalData.image}` : Constant.DEFAULT_JOURNAL_IMAGE }}
                                        style={styles.headerImage}
                                    />
                                </TouchableOpacity>
                            </View>
                    }
                    {displayText === '' ?
                        <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => openModal && openModal()}>
                            <Text
                                style={styles.subHeaderTextStyle}
                            >{journalData && _.toUpper(journalData.journalName)}
                            </Text>
                            <Text
                                style={[styles.italicTextStyle, styles.paddingTop3]}
                            >{journalData && journalData.journalType && _.startCase(journalData.journalType + (journalData.journalType === Constant.CHILDHOOD_JOURNAL ? ' History' : ' Journal'))}
                            </Text>
                            <Text style={subSection ? { height: 0 } : [styles.totalYearsStyle, styles.paddingTop3]}>
                                {!subSection && section.toUpperCase()}
                            </Text>
                            <Text style={subSection ? [styles.totalYearsStyle, styles.paddingTop3] : { height: 5 }}>
                                {subSection ? subSection.name ? `${subSection.name.toUpperCase()}` : `${subSection.toUpperCase()}` : ''}
                            </Text>
                            {/* <Text */}
                            {/* style={styles.totalYearsStyle} */}
                            {/* >{journalData && journalData.journalType === Constant.CHILDHOOD_JOURNAL && `${_.toUpper(journalData.journalName)} IS ${_.toUpper(totalYears)} OLD`} */}
                            {/* {journalData && journalData.journalType === Constant.ADOPTION_JOURNAL && `${_.toUpper(journalData.journalName)} IS ${_.toUpper(totalYears)} OLD`} */}
                            {/* {journalData && journalData.journalType === Constant.LOVE_JOURNAL && `YOUR BOND IS ${_.toUpper(totalYears)} STRONG`} */}
                            {/* </Text> */}
                        </TouchableOpacity>
                        :
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                        }}
                        >
                            <Text
                                style={[styles.subHeaderTextStyle, { textAlign: 'center', width: '100%' }]}
                            >{displayText}
                            </Text>
                        </View>
                    }
                </View>
                <View style={styles.headerRightContainer}>
                    <TouchableOpacity
                        onPress={() => this.props.openAlertModal()}
                    >
                        <View style={[styles.headerIconContainer, { position: 'relative' }]}>
                            <Image
                                source={SEARCH_ICON}
                                style={styles.headerIconStyle}
                            />
                            {/* <SearchPopover */}
                            {/* openPopover={this.state.openPopover} */}
                            {/* closePopover={this.closePopover} */}
                            {/* /> */}
                        </View>
                    </TouchableOpacity>
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

TabHeader.propTypes = {
    journalData: PropTypes.object,
    openAlertModal: PropTypes.func.isRequired,
    openImage: PropTypes.func,
    displayText: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    section: PropTypes.string,
    subSection: PropTypes.string,
    openModal: PropTypes.func,
};

TabHeader.defaultProps = {
    journalData: {},
    section: '',
    subSection: '',
    openImage: () => {},
    openModal: () => {},
};
