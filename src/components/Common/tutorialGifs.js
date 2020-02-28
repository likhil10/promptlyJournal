import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import style from './commonStyle';
import Gif from '../../utility/gifConstant';


const TutorialGifs = (props) => {
    const { index } = props;
    return (
        <Image
            source={{
                1: (
                    Gif.ACCESS_JOURNALS_GIF
                ),
                2: (
                    Gif.NEW_JOURNAL_GIF
                ),
                3: (
                    Gif.CUSTOM_ENTRY_GIF
                ),
                4: (
                    Gif.DASHBOARD_GIF
                ),
                5: (
                    Gif.PRINTING_GIF
                ),
                6: (
                    Gif.SETTINGS_GIF
                ),
                default: (
                    Gif.ACCESS_JOURNALS_GIF
                )
            }[index]}
            style={style.gifsContainer}
        />
    );
};

export default TutorialGifs;

TutorialGifs.propTypes = {
    index: PropTypes.string.isRequired
};
