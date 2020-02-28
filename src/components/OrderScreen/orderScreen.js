import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    SafeAreaView
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import style from './orderStyle';
import Spinner from '../Common/spinner';
import AlertModal from '../Common/AlertModal';
import commonStyle from '../Common/commonStyle';
import constant from '../../utility/constants';
import { getUserOrders } from '../../actions/getUserOrders';
import OrderItem from './orderItem';
import OrderDetails from './orderDetails';


class OrderScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageAlert: '',
            openAlert: false,
        };
    }

    componentDidMount() {
        this.fetchOrderDetails();
    }


    fetchOrderDetails = () => {
        const { dispatch } = this.props.navigation;
        dispatch(getUserOrders()).then(() => {
        }).catch((err) => {
            this.openAlertModal(err);
        });
    }

    openAlertModal = (message) => {
        this.setState({
            openAlert: true,
            messageAlert: message,
        });
    };

    closeAlert = () => {
        this.setState({
            openAlert: false,
            activeSection: ''
        });
    };

    handleAccording = (activeSection) => {
        this.setState({
            activeSection: (this.state.activeSection !== activeSection) ? activeSection : '',
        });
    };

    renderAccordItem = (data) => {
        const {
            activeSection
        } = this.state;
        const orderItems = data.items;
        return (
            <View style={style.justifyAlign} key={data._id}>
                <View style={style.upperSection}>
                    <View
                        style={style.accordTouchBody}
                        onPress={() => this.handleAccording(data._id)}
                    >
                        <View style={style.width50}>
                            <Text style={[style.subHeadingTextStyle]}>
                                {data.orderCreateDate && moment(data.orderCreateDate).format('MMMM DD, YYYY')}
                            </Text>
                            <Text style={[style.subHeadingTextStyle]}>
                                Status: {data.orderStatus}
                            </Text>
                        </View>
                        <View style={style.width50End}>
                            <TouchableOpacity
                                style={{ alignSelf: 'flex-end' }}
                                onPress={() => this.handleAccording(data._id)}
                            >
                                <Text style={[style.subHeadingTextStyle, { textAlign: 'right', textDecorationLine: 'underline' }]}>
                                    Order Details
                                </Text>
                            </TouchableOpacity>
                            <Text style={[style.subHeadingTextStyle, { textAlign: 'right' }]}>
                                Total: ${data.totalAmount}
                            </Text>
                        </View>
                    </View>
                    {
                        activeSection && activeSection === data._id ?
                            <OrderDetails data={data} /> : null
                    }
                    {
                        orderItems && orderItems.length ? orderItems.map(item => (
                            <OrderItem item={item} key={item._id} />
                        )) : null
                    }
                </View>
                <View style={style.underlines} />
            </View>
        );
    }

    render() {
        const { fetching, ordersData } = this.props;
        const { messageAlert, openAlert } = this.state;
        return (
            <View style={[style.container, style.paddingTopMost]}>
                <SafeAreaView>
                    <KeyboardAwareScrollView
                        keyboardShouldPersistTaps="handled"
                        alwaysBounceVertical={false}
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        viewIsInsideTabBar
                    >
                        <View style={[style.container, style.justifyAlign, commonStyle.paddingHorizontal20]}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => this.props.navigation.goBack()}
                                style={style.linkContainer}
                            >
                                <MaterialIcons name="keyboard-backspace" size={30} color={constant.TEXT_COLOR} />
                            </TouchableOpacity>
                            <View style={style.headerContainer}>
                                <Text style={style.headerTextStyle}>MY ORDERS</Text>
                                <View style={style.headerLine} />
                            </View>
                            <View style={style.orderContainer}>
                                {
                                    ordersData && ordersData.length ? ordersData.map(item => (
                                        this.renderAccordItem(item)
                                    ))
                                        :
                                        !fetching &&
                                        <View style={[style.buttonBox, { borderRadius: 0, paddingHorizontal: 10 }]}>
                                            <Text style={[style.buttonText]}>{'Opps! Looks like you haven\'t ordered anything yet!'}</Text>
                                        </View>
                                }

                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </SafeAreaView>
                <Spinner
                    animating={fetching}
                />
                <AlertModal
                    message={messageAlert}
                    open={openAlert}
                    close={this.closeAlert}
                />
            </View>
        );
    }
}

OrderScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    fetching: PropTypes.bool.isRequired,
    ordersData: PropTypes.array,
};

OrderScreen.defaultProps = {
    ordersData: [],
};

const mapStateToProps = state => ({
    fetching: state.getUserOrders.fetching,
    ordersData: state.getUserOrders.ordersData
});

export default connect(mapStateToProps)(OrderScreen);
