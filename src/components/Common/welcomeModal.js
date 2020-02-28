import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Modal from 'react-native-simple-modal';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import style from './commonStyle';
import TutorialGifs from '../Common/tutorialGifs';


const { width } = Dimensions.get('window');


export default class WelcomeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSlide: 0
        };
    }


    renderItem = ({ item, index }) => (
        <View style={style.carouselItem} key={index}>
            {/* <Text style={style.subHeaderTextStyle}>{"TUTORIAL GIF #"}{item}</Text> */}
            <TutorialGifs
                index={item}
            />
        </View>
    );

    render() {
        const { open, close } = this.props;
        return (
            <Modal
                open={open}
                closeOnTouchOutside={false}
                modalStyle={style.welcomeModalStyle}
            >
                <View style={style.modelContainer}>
                    <View style={style.leftContainer}>
                        <TouchableOpacity
                            onPress={close}
                        >
                            <Ionicons name="md-close" size={40} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <View style={style.modalCenterContainer}>

                        <Text style={[style.welcomeHeaderTextStyle]}>WELCOME</Text>
                        <Text style={[style.welcomeHeaderTextStyle]}>LET US SHOW YOU AROUND...</Text>
                        <View style={[style.flexContainer, { marginTop: 7 }]}>
                            <View>
                                <Carousel
                                    firstItem={0}
                                    data={[1, 2, 3, 4, 5, 6]}
                                    renderItem={this.renderItem}
                                    sliderWidth={width * 0.8}
                                    itemWidth={width * 0.8}
                                    onSnapToItem={(index) => this.setState({ activeSlide: index })}
                                    autoplay
                                    autoplayDelay={100}
                                    autoplayInterval={6000}
                                    loop
                                />
                                <Pagination
                                    dotsLength={6}
                                    activeDotIndex={this.state.activeSlide}
                                    dotStyle={style.dotStyle}
                                    inactiveDotStyle={style.inactiveDotStyle}
                                    inactiveDotOpacity={1}
                                    inactiveDotScale={0.8}
                                />
                            </View>
                        </View>
                    </View>

                </View>
            </Modal>
        );
    }
}

WelcomeModal.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired
};
