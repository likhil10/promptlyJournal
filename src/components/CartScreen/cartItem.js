import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import IonIcons from 'react-native-vector-icons/Ionicons';
import style from './cartStyle';
import Constant from '../../utility/constants';
import { isEmpty } from '../../utility/helperComponent';

const SOFTCOVER = require('../../assets/icons/softcover.png');
const HARDCOVER = require('../../assets/icons/hardcover.png');


class CartItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { item, deleteCartItem } = this.props;
        const isHardCover = item.coverSection && item.coverSection.cover === 'hard-cover';
        const coverText = item.coverSection && item.coverSection.coverText;
        const textColor = !isHardCover ? '#cfc57c' : (item.coverSection && item.coverSection.coverColor === '#f4f4f4' ? '#5f5f61' : '#fff');
        return (
            <View style={style.itemContainer}>
                <View style={{ width: '5%' }}>
                    <TouchableOpacity onPress={() => deleteCartItem(item._id)}>
                        <IonIcons name="md-close" size={23} color={Constant.TEXT_COLOR} />
                    </TouchableOpacity>
                </View>
                <View style={{ width: '35%' }} >
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
                    <View style={style.amountContainer}>
                        <Text style={[style.textStyle, { fontSize: 14 }]}>{item.totalAmount}  X  </Text>
                        <TextInput
                            style={style.textInput}
                            value={item.quantity}
                            autoCorrect
                            spellCheck={false}
                            scrollEnabled={false}
                            bounces={false}
                            keyboardType="numeric"
                            showsVerticalScrollIndicator={false}
                            editable={false}
                            returnKeyType="go"
                            maxLength={2}
                        />
                    </View>
                    <Text style={[style.textStyle, { fontSize: 18, fontWeight: 'bold' }]}>{item.totalAmount}</Text>
                </View>
            </View>
        );
    }
}

CartItem.propTypes = {
    item: PropTypes.object.isRequired,
    deleteCartItem: PropTypes.func.isRequired,
};

CartItem.defaultProps = {
};

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(CartItem);
