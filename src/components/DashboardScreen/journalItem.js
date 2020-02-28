import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import commonStyle from '../Common/commonStyle';
import Config from '../../utility/config';
import constants from '../../utility/constants';
import NotificationPopOver from './notificationPopOver';


class JournalItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false
        };
    }

    openOptionsPopover = () => this.setState({ isVisible: true });

    closeOptionsPopover = () => this.setState({ isVisible: false });


    render() {
        const { item } = this.props;
        const { isVisible } = this.state;
        return (
            <View style={commonStyle.listItemContainer}>
                <View style={commonStyle.imageCircle}>
                    <Image
                        source={{ uri: `${Config.BASE_URL}${item.image}` }}
                        style={commonStyle.imageCircle}
                    />
                </View>
                <View style={commonStyle.contentCenter}>
                    <Text style={commonStyle.subHeaderTextStyle}>{_.toUpper(item.journalName)}</Text>
                    <Text
                        style={[commonStyle.italicTextStyle, commonStyle.paddingTop5]}
                    >{_.startCase(item.journalType + (item.journalType === constants.CHILDHOOD_JOURNAL ? ' History' : ' Journal'))}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => this.openOptionsPopover()}
                    ref={ref => {
                        this.touchable = ref;
                    }}
                    style={{
                        justifyContent: 'center',
                        paddingRight: 10
                    }}
                >
                    <EntypoIcons name="dots-three-vertical" size={30} color={constants.TEXT_COLOR} />
                </TouchableOpacity>
                <NotificationPopOver
                    {...this.props}
                    item={item}
                    isVisible={isVisible}
                    touchable={this.touchable}
                    closeOptionsPopover={this.closeOptionsPopover}
                />
            </View>
        );
    }
}

export default JournalItem;

JournalItem.propTypes = {
    item: PropTypes.object.isRequired
};

