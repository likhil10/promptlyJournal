import React, { Component } from 'react';
import {
    View,
    Image,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../journalStyle';
import Spinner from '../../Common/spinner';

export default class CustomPromptsImageItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            calculatedWidth: 100,
            loading: false
        };
    }

    componentDidMount() {
        const { image } = this.props;
        Image.getSize(image.image, (width, height) => {
            this.setState({ calculatedWidth: 100 * (width / height) });
        }, () => {
            this.setState({ calculatedWidth: 100 });
        });
    }

    render() {
        const { image } = this.props;
        return (
            <View style={[styles.customImageContainer, { width: this.state.calculatedWidth }]}>
                <Image
                    source={{ uri: image.image }}
                    style={[styles.customPromptImage]}
                    onLoadStart={() => this.setState({ loading: true })}
                    onLoadEnd={() => {
                        this.setState({ loading: false });
                    }}
                />
                <Spinner
                    animating={this.state.loading}
                    backgroundColor="transparent"
                />
            </View>
        );
    }
}

CustomPromptsImageItem.propTypes = {
    image: PropTypes.object.isRequired,
};
