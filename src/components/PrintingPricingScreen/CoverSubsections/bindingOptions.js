import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    Linking
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import PropTypes from 'prop-types';
import style from '../printingStyles';

const SOFTCOVER = require('../../../assets/pricing/soft_cover.jpg');
const HARDCOVER = require('../../../assets/pricing/hard_cover.jpg');

class BindingOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cover: props.softCover ? 'soft' : 'hard',
        };
    }

    setCover = (cover) => {
        this.setState({ cover });
        this.props.toggleCoverCasing(cover);
    };


    render() {
        const { cover } = this.state;
        return (
            <View style={[style.justifyAlign, { marginVertical: 15 }]}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={cover === 'soft' ? style.checkedContainer : style.contentContainer}
                    onPress={() => this.setCover('soft')}
                >
                    <View style={[style.flexRow, style.justifyAligns]}>
                        <View style={{ width: '15%' }}>
                            <CheckBox
                                style={{ width: 20, height: 15 }}
                                checkedColor="#736063"
                                uncheckedColor="#736063"
                                containerStyle={style.containerStyle}
                                checked={cover === 'soft'}
                                onPress={() => this.setCover('soft')}
                            />
                        </View>
                        <View style={[style.flexColumn, style.justifyAlign]}>
                            <Text style={style.unselectedText}>SOFT COVER</Text>
                            <Text style={[style.pagePricing, { fontSize: 15 }]}>$9.99*</Text>
                            <Text style={style.pagePricing}>26 pages ($.25/extra pg.)</Text>
                            <Text style={style.unselectedText}>PRINTED TEXT</Text>
                        </View>
                        <Image
                            source={SOFTCOVER}
                            style={style.bindingImage}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={1}
                    style={cover === 'hard' ? style.checkedContainer : style.contentContainer}
                    onPress={() => this.setCover('hard')}
                >
                    <View style={[style.flexRow, style.justifyAligns]}>
                        <View style={{ width: '15%' }}>
                            <CheckBox
                                style={{ width: 20, height: 15 }}
                                checkedColor="#736063"
                                uncheckedColor="#736063"
                                containerStyle={style.containerStyle}
                                checked={cover === 'hard'}
                                onPress={() => this.setCover('hard')}
                            />
                        </View>
                        <View style={[style.flexColumn, style.justifyAlign]}>
                            <Text style={style.unselectedText}>HARD COVER</Text>
                            <Text style={[style.pagePricing, { fontSize: 15 }]}>$19.99*</Text>
                            <Text style={style.pagePricing}>26 pages ($.25/extra pg.)</Text>
                            <Text style={style.unselectedText}>GOLD FOIL TEXT</Text>
                        </View>
                        <Image
                            source={HARDCOVER}
                            style={style.bindingImage}
                        />
                    </View>
                </TouchableOpacity>
                <Text
                    style={style.textUnderline}
                    onPress={() => Linking.openURL('https://promptlyjournals.com/pages/privacy-policy')}
                >Learn more about printing
                </Text>
            </View>
        );
    }
}

BindingOptions.propTypes = {
    toggleCoverCasing: PropTypes.func.isRequired,
    softCover: PropTypes.bool.isRequired,
};

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(BindingOptions);
