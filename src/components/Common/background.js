import React from 'react';
import { ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import style from './commonStyle';
import Constant from '../../utility/constants';

const TRAVEL = require('../../assets/backgroundImages/travel.jpg');
const ADOPTION = require('../../assets/backgroundImages/adoption.jpg');
const CHILDHOOD = require('../../assets/backgroundImages/childhood.jpg');
const LOVE_STORY = require('../../assets/backgroundImages/love_story1.jpg');
const EVERYDAY = require('../../assets/backgroundImages/everyday.jpg');

const Background = (props) => {
    const { journalType } = props;
    return (
        <ImageBackground
            source={{
                [Constant.TRAVEL_JOURNAL]: (
                    TRAVEL
                ),
                [Constant.CHILDHOOD_JOURNAL]: (
                    CHILDHOOD
                ),
                [Constant.ADOPTION_JOURNAL]: (
                    ADOPTION
                ),
                [Constant.LOVE_JOURNAL]: (
                    LOVE_STORY
                ),
                [Constant.EVERYDAY_JOURNAL]: (
                    EVERYDAY
                ),
                default: (
                    CHILDHOOD
                )
            }[journalType]}
            style={style.flexContainer}
            resizeMode="stretch"
        >
            {props.children}
        </ImageBackground>
    );
};

export default Background;

Background.propTypes = {
    journalType: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};
