import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import style from '../printingStyles';


class CoverColor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: props.color ? props.color : '#5f5f61',
        };
    }

    chooseColor = (color) => {
        this.setState({ color });
        this.props.chooseColor(color);
    }

    colors = (value) => (
        <View style={style.flexRow} key={value}>
            {
                <TouchableOpacity
                    activeOpacity={1}
                    style={this.state.color === value ? [style.colorShade, style.colorShadeShadow, { backgroundColor: value }] : [style.colorShade, { backgroundColor: value }]}
                    onPress={() => this.chooseColor(value)}
                />
            }
        </View>
    )

    renderColorShades = () => {
        const color = ['#5f5f61', '#f4f4f4', '#e7c057', '#9baa9d', '#41425a', '#d89d95', '#87a0af', '#e2ddcb', '#f2cccb'];
        return (
            <View style={{
                flexDirection: 'row',
                width: '100%',
                flexWrap: 'wrap',
                marginTop: 10
            }}
            >
                {
                    color.map((value) => (this.colors(value)))
                }
            </View>
        );
    };

    render() {
        return (
            <View style={style.justifyAlign}>
                {
                    this.renderColorShades()
                }
            </View>
        );
    }
}

CoverColor.propTypes = {
    chooseColor: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
};

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(CoverColor);
