import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    TouchableOpacity,
    Image,
    Image as ImageNative
} from 'react-native';
import PropTypes from 'prop-types';
import style from '../printingStyles';

const HORSES_ART = require('../../../assets/icons/adoption.jpg');
const FALLING_LEAVES = require('../../../assets/icons/leaves.jpg');
const TRAVEL_PATTERN = require('../../../assets/icons/travel.jpg');
const BIRDS = require('../../../assets/icons/birds.jpg');
const GINGHAM = require('../../../assets/icons/gingham.jpg');
const FLORAL = require('../../../assets/icons/floral.jpg');

class CoverColor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            insideCover: props.insideCover ? props.insideCover : { name: 'LEAVES', image: FALLING_LEAVES },
        };
    }

    setInsideCover = (insideCover) => {
        this.setState({ insideCover });
        this.props.setInsideCover(insideCover);
    }

    insideCover = (value, index) => (
        <View style={[style.flexRow, style.insideCoverContainer]} key={index}>
            {
                <TouchableOpacity
                    activeOpacity={1}
                    style={this.state.insideCover.name === value.name ? [style.insideCover, style.colorShadeShadow] : style.insideCover}
                    onPress={() => this.setInsideCover(value)}
                >
                    <Image
                        source={value.image}
                        style={style.buttonFull}
                        resizeMode="stretch"
                    />
                </TouchableOpacity>
            }
        </View>
    )

    renderCoverChoices = () => {
        const INSIDE_COVERS = [
            { name: 'LEAVES', image: FALLING_LEAVES },
            { name: 'ADOPTION', image: HORSES_ART },
            { name: 'BIRDS', image: BIRDS },
            { name: 'TRAVEL', image: TRAVEL_PATTERN },
            { name: 'GINGHAM', image: GINGHAM },
            { name: 'FLORAL', image: FLORAL }];
        return (
            <View style={{
                flexDirection: 'row',
                width: '100%',
                flexWrap: 'wrap',
                alignItems: 'center'
            }}
            >
                {
                    INSIDE_COVERS.map((value, index) => (this.insideCover(value, index)))
                }
            </View>
        );
    };

    render() {
        return (
            <View style={style.justifyAlign}>
                {
                    this.renderCoverChoices()
                }
            </View>
        );
    }
}

CoverColor.propTypes = {
    setInsideCover: PropTypes.func.isRequired,
    insideCover: ImageNative.propTypes.source.isRequired,
};

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(CoverColor);
