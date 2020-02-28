import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    TouchableOpacity,
    Text,
    SafeAreaView,
    Image as ImageNative
} from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import style from './printingStyles';
import BindingOptions from './CoverSubsections/bindingOptions';
import CoverColor from './CoverSubsections/coverColor';
import InsideCover from './CoverSubsections/insideCover';
import CoverText from './CoverSubsections/coverText';
import ProjectName from './CoverSubsections/projectName';
import constant from '../../utility/constants';

class CoverOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSection: '',
        };
    }

    handleAccording = (activeSection, showCover) => {
        this.props.toggleCover(showCover);
        this.setState({
            activeSection: (this.state.activeSection !== activeSection) ? activeSection : '',
        });
    };

    render() {
        const { activeSection } = this.state;
        const {
            toggleCoverCasing, openAlertModal, chooseColor, softCover, projectName, color, insideCover, setInsideCover, firstLine, secondLine, thirdLine, handleTextChange, sectionSelected, setSection
        } = this.props;
        return (
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps="handled"
                alwaysBounceVertical={false}
                bounces={false}
                showsVerticalScrollIndicator={false}
                viewIsInsideTabBar
                extraScrollHeight={-40}
            >
                <SafeAreaView>
                    <View style={style.upperSection}>
                        <TouchableOpacity
                            style={{
                                marginVertical: 15,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onPress={() => this.handleAccording('bindingOptions', 'outer')}
                        >
                            <Text style={style.headerTextStyle}>BINDING OPTIONS</Text>
                            <FontAwesome
                                name={activeSection === 'bindingOptions' ? 'angle-up' : 'angle-down'}
                                size={30}
                                color={constant.TEXT_COLOR}
                            />
                        </TouchableOpacity>
                        <View style={style.underlines} />
                        {
                            activeSection === 'bindingOptions' &&
                            <BindingOptions
                                toggleCoverCasing={toggleCoverCasing}
                                softCover={softCover}
                            />
                        }
                    </View>
                    <View style={style.upperSection}>
                        <TouchableOpacity
                            style={{
                                marginVertical: 20,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onPress={() => this.handleAccording('coverColor', 'outer')}
                        >
                            <Text style={style.headerTextStyle}>COVER COLOR</Text>
                            <FontAwesome
                                name={activeSection === 'coverColor' ? 'angle-up' : 'angle-down'}
                                size={30}
                                color={constant.TEXT_COLOR}
                            />
                        </TouchableOpacity>
                        <View style={style.underlines} />
                        {activeSection === 'coverColor' &&
                        <CoverColor
                            chooseColor={chooseColor}
                            color={color}
                        />
                        }
                    </View>
                    <View style={style.upperSection}>
                        <TouchableOpacity
                            style={{
                                marginVertical: 20,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onPress={() => {
                                this.handleAccording('insideCover', 'inner');
                            }}
                        >
                            <Text style={style.headerTextStyle}>INSIDE COVER DESIGN</Text>
                            <FontAwesome
                                name={activeSection === 'insideCover' ? 'angle-up' : 'angle-down'}
                                size={30}
                                color={constant.TEXT_COLOR}
                            />
                        </TouchableOpacity>
                        <View style={style.underlines} />
                        {activeSection === 'insideCover' &&
                            <InsideCover
                                setInsideCover={setInsideCover}
                                insideCover={insideCover}
                            />
                        }
                    </View>
                    <View style={style.upperSection}>
                        <TouchableOpacity
                            style={{
                                marginVertical: 20,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onPress={() => this.handleAccording('coverText', 'outer')}
                        >
                            <Text style={style.headerTextStyle}>COVER TEXT</Text>
                            <FontAwesome
                                name={activeSection === 'coverText' ? 'angle-up' : 'angle-down'}
                                size={30}
                                color={constant.TEXT_COLOR}
                            />
                        </TouchableOpacity>
                        <View style={style.underlines} />
                        {activeSection === 'coverText' &&
                        <CoverText
                            firstLine={firstLine}
                            secondLine={secondLine}
                            thirdLine={thirdLine}
                            handleTextChange={handleTextChange}
                            openAlertModal={openAlertModal}
                        />
                        }
                    </View>
                    <View style={style.upperSection}>
                        <TouchableOpacity
                            style={{
                                marginVertical: 20,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onPress={() => this.handleAccording('projectName', 'outer')}
                        >
                            <Text style={style.headerTextStyle}>NAME THIS PROJECT</Text>
                            <FontAwesome
                                name={activeSection === 'projectName' ? 'angle-up' : 'angle-down'}
                                size={30}
                                color={constant.TEXT_COLOR}
                            />
                        </TouchableOpacity>
                        <View style={[style.underlines, { marginBottom: 20 }]} />
                        {activeSection === 'projectName' &&
                        <ProjectName
                            projectName={projectName}
                            handleTextChange={handleTextChange}
                        />
                        }
                    </View>
                </SafeAreaView>
            </KeyboardAwareScrollView>
        );
    }
}

CoverOptions.propTypes = {
    toggleCoverCasing: PropTypes.func.isRequired,
    openAlertModal: PropTypes.func.isRequired,
    setInsideCover: PropTypes.func.isRequired,
    chooseColor: PropTypes.func.isRequired,
    softCover: PropTypes.bool.isRequired,
    color: PropTypes.string.isRequired,
    insideCover: ImageNative.propTypes.source.isRequired,
    handleTextChange: PropTypes.func.isRequired,
    toggleCover: PropTypes.func.isRequired,
    firstLine: PropTypes.string.isRequired,
    secondLine: PropTypes.string.isRequired,
    thirdLine: PropTypes.string.isRequired,
    projectName: PropTypes.string.isRequired,
    setSection: PropTypes.func.isRequired,
    sectionSelected: PropTypes.string.isRequired,
};

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(CoverOptions);
