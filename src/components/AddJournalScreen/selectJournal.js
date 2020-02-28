import React, { Component } from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    FlatList
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import style from './addJournalStyles';
import commonStyle from '../Common/commonStyle';
import constants from '../../utility/constants';

export default class SelectJournal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataBlob: [
                { type: constants.EVERYDAY_JOURNAL },
                { type: constants.CHILDHOOD_JOURNAL },
                { type: constants.LOVE_JOURNAL },
                { type: constants.TRAVEL_JOURNAL },
                { type: constants.ADOPTION_JOURNAL },
            ],
        };
    }

    renderItem = (item) => {
        const { typeSelected } = this.props;
        return (
            <View style={style.listItemContainer}>
                <TouchableOpacity
                    onPress={() => typeSelected(item.type)}
                >
                    <View style={style.itemContainer}>
                        <Text
                            style={commonStyle.subHeaderTextStyle}
                        >{_.toUpper(item.type + (item.type === constants.CHILDHOOD_JOURNAL ? ' History' : ' Journal'))}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    render() {
        return (
            <View style={commonStyle.paddingTop5}>
                <View style={style.centerContainer}>
                    <Text style={[commonStyle.subHeaderTextStyle, commonStyle.paddingVertical20]}>SELECT A JOURNAL
                        TYPE
                    </Text>
                    <View style={commonStyle.listContainer}>
                        <FlatList
                            data={this.state.dataBlob}
                            bounces={false}
                            extraData={this.state.dataBlob.length}
                            renderItem={({ item }) => this.renderItem(item)}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>

            </View>
        );
    }
}

SelectJournal.propTypes = {
    typeSelected: PropTypes.func.isRequired
};
