import React from 'react';
import Swiper from 'react-native-swiper';
import PropTypes from 'prop-types';
import {
    Platform,
    View
} from 'react-native';
import style from '../OnBoardingScreens/onBoardingStyle';

const Swipers = (props) => (
    <View style={style.container}>
        <Swiper
            style={[Platform.OS === 'android' && style.heightWidth, props.customStyle]}
            {...props}
            ref={props.inputRef}
        >
            {
                props.children
            }
        </Swiper>
    </View>
);

Swipers.propTypes = {
    children: PropTypes.node.isRequired,
    inputRef: PropTypes.func,
};
Swipers.defaultProps = {
    inputRef: () => {},
};

export default Swipers;
