import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import Popover from 'react-native-popover-view';
import PropTypes from 'prop-types';
import Constant from '../../utility/constants';
import Style from './commonStyle';

export const SearchPopover = (props) => {
    const { openPopover, closePopover } = props;
    return (
        <Popover
            isVisible={openPopover}
            showBackground={false}
            popoverStyle={{ backgroundColor: Constant.TEXT_COLOR, top: 100, borderRadius: 20 }}
            arrowStyle={{ backgroundColor: Constant.TEXT_COLOR }}
            onClose={closePopover}
        >
            <View style={[Style.padding10, Style.flexRow, { backgroundColor: Constant.TEXT_COLOR }]}>
                <Text style={{ color: '#fff', letterSpacing: 1 }}>
                        Copied to Clipboard!
                </Text>
            </View>
        </Popover>
    );
};

SearchPopover.propTypes = {
    openPopover: PropTypes.bool.isRequired,
    closePopover: PropTypes.func.isRequired,
};

SearchPopover.defaultProps = {
};
