import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import commonStyle from '../Common/commonStyle';
import styles from './dashboardStyle';

const FooterItem = (props) => {
    const { item, isButtonEnabled } = props;
    return (
        <View style={commonStyle.horizontalListItemContainer}>
            <TouchableOpacity
                style={[styles.footerTextContainer, { justifyContent: 'center', height: '100%' }]}
                onPress={() => {
                    props.navigation.navigate(item.navigate, item.navigate === 'JournalScreen' ? { openJournalModal: true, count: 0 } : { count: 0, noContent: false, save: false, });
                }}
                disabled={item.navigate === 'JournalScreen' ? isButtonEnabled : false}
            >
                <View>
                    <Text style={[styles.footerBoxTextStyle, commonStyle.padding5]}>
                        {_.toUpper(item.text)}
                    </Text>
                </View>
                <View style={styles.footerIconContainer}>
                    <Image
                        source={item.icon}
                        style={styles.footerIconStyle}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default FooterItem;

FooterItem.propTypes = {
    isButtonEnabled: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
};
