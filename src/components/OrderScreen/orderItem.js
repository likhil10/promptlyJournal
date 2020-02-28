import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Text,
    ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import style from './orderStyle';
import Constant from '../../utility/constants';
import { isEmpty } from '../../utility/helperComponent';

const SOFTCOVER = require('../../assets/icons/softcover.png');
const HARDCOVER = require('../../assets/icons/hardcover.png');


class OrderItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { item } = this.props;
        const isHardCover = item.coverSection && item.coverSection.cover === 'hard-cover';
        const coverText = item.coverSection && item.coverSection.coverText;
        const textColor = !isHardCover ? '#cfc57c' : (item.coverSection && item.coverSection.coverColor === '#f4f4f4' ? '#5f5f61' : '#fff');
        return (
            <View style={style.itemContainer}>
                <View style={{ width: '40%' }} >
                    <View style={style.cartBookContainer}>
                        <ImageBackground
                            source={isHardCover ? HARDCOVER : SOFTCOVER}
                            style={style.bookImage}
                            resizeMode="stretch"
                        >
                            <View style={[style.overlayView, { backgroundColor: `${item.coverSection.coverColor}` }]}>
                                <View style={[style.coverTextContainer, style.justifyAlign]}>
                                    <Text style={[style.firstLine, { color: textColor }]}>
                                        {coverText && coverText.firstLine.trim().toUpperCase()}
                                    </Text>
                                    <Text style={[style.secondLine, { color: textColor }]}>
                                        {coverText && coverText.secondLine.trim().toUpperCase()}
                                    </Text>
                                    {
                                        coverText && !isEmpty(coverText.thirdLine.trim()) ? <View style={[style.bookLine, { borderColor: textColor }]} /> : null
                                    }
                                    <Text style={[style.thirdLine, { color: textColor }]}>
                                        {coverText && coverText.thirdLine.trim()}
                                    </Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                </View>
                <View style={{ width: '60%', padding: 10 }} >
                    <Text style={style.textStyle}>{item.coverSection.projectName}</Text>
                </View>
            </View>
        );
    }
}

OrderItem.propTypes = {
    item: PropTypes.object.isRequired,
};

OrderItem.defaultProps = {
};

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(OrderItem);
