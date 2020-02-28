import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    ImageBackground,
    Text,
    Image as ImageNative,
    Dimensions,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import PropTypes from 'prop-types';
import ToggleSwitch from 'toggle-switch-react-native';
import style from './printingStyles';
import CoverOptions from './coverOptions';
import { isEmpty } from '../../utility/helperComponent';

const { width } = Dimensions.get('window');
const SOFTCOVER = require('../../assets/icons/softcover.png');
const HARDCOVER = require('../../assets/icons/hardcover.png');


class Cover extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const {
            toggleCoverCasing, openAlertModal, handleTextChange, thirdLine, secondLine, firstLine, chooseColor, toggleCover, setInsideCover, selected, softCover, color, insideCover, projectName, sectionSelected, setSection
        } = this.props;
        const textColor = !softCover ? '#cfc57c' : (color === '#f4f4f4' ? '#5f5f61' : '#fff');
        return (
            <View style={style.container}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={[style.justifyAlign, { flex: 3, backgroundColor: '#f5f5f5' }]}>
                        <View style={[style.bookImageContainer, selected && { width: width / 1.4 }]}>
                            <ImageBackground
                                source={selected ? insideCover.image : softCover ? SOFTCOVER : HARDCOVER}
                                style={style.bookImage}
                                resizeMode="stretch"
                            >
                                {!selected &&
                                <View style={[style.overlayView, { backgroundColor: color }]}>
                                    <View style={[style.coverTextContainer, style.justifyAlign]}>
                                        <Text style={[style.firstLine, { color: textColor }]}>
                                            {firstLine.trim().toUpperCase()}
                                        </Text>
                                        <Text style={[style.secondLine, { color: textColor }]}>
                                            {secondLine.trim().toUpperCase()}
                                        </Text>
                                        {
                                            !isEmpty(thirdLine.trim()) ? <View style={[style.bookLine, { borderColor: textColor }]} /> : null
                                        }
                                        <Text style={[style.thirdLine, { color: textColor }]}>
                                            {thirdLine.trim()}
                                        </Text>
                                    </View>
                                </View>
                                }
                            </ImageBackground>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={[style.container, style.justifyAlign, { flex: 4 }]}>
                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                        <View style={[style.coverPreview, style.justifyAlign]}>
                            <View style={style.unselectedButton}>
                                <Text style={style.unselectedText}>COVER</Text>
                            </View>
                            <ToggleSwitch
                                isOn={selected}
                                onColor="#725f62"
                                offColor="#725f62"
                                size="medium"
                                onToggle={() => toggleCover(selected ? 'outer' : 'inner')}
                            />
                            <View style={style.unselectedButton}>
                                <Text style={style.unselectedText}>INSIDE</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <CoverOptions
                        toggleCoverCasing={toggleCoverCasing}
                        softCover={softCover}
                        chooseColor={chooseColor}
                        color={color}
                        setInsideCover={setInsideCover}
                        insideCover={insideCover}
                        handleTextChange={handleTextChange}
                        firstLine={firstLine}
                        secondLine={secondLine}
                        thirdLine={thirdLine}
                        projectName={projectName}
                        sectionSelected={sectionSelected}
                        setSection={setSection}
                        openAlertModal={openAlertModal}
                        toggleCover={toggleCover}
                    />
                </View>
            </View>
        );
    }
}

Cover.propTypes = {
    toggleCoverCasing: PropTypes.func.isRequired,
    chooseColor: PropTypes.func.isRequired,
    openAlertModal: PropTypes.func.isRequired,
    toggleCover: PropTypes.func.isRequired,
    setInsideCover: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
    softCover: PropTypes.bool.isRequired,
    color: PropTypes.string.isRequired,
    insideCover: ImageNative.propTypes.source.isRequired,
    handleTextChange: PropTypes.func.isRequired,
    firstLine: PropTypes.string.isRequired,
    secondLine: PropTypes.string.isRequired,
    thirdLine: PropTypes.string.isRequired,
    projectName: PropTypes.string.isRequired,
    setSection: PropTypes.func.isRequired,
    sectionSelected: PropTypes.string.isRequired,
};

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(Cover);
