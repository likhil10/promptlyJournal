import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    Keyboard,
    InteractionManager,
    NetInfo,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AlertModal from '../Common/AlertModal';
import style from './printingStyles';
import commonStyle from '../Common/commonStyle';
import Constant from '../../utility/constants';
import Cover from './cover';
import Interior from './interior';
import Preview from './preview';
import Order from './order';
import PrintFooter from './printFooter';
import { getJournalsAction } from '../../actions/getJournalsAction';
import Spinner from '../Common/spinner';
import { printingJournalSelect } from '../../actions/printingJournalSelect';
import { addToCartAction } from '../../actions/addToCartAction';
import { getCartAction } from '../../actions/getCartAction';

const TAB_ICON = require('../../assets/icons/print_icon.png');
const TAB_ICON_TRANSPARENT = require('../../assets/icons/print_trasparent.png');
const CART_ICON = require('../../assets/icons/shoppingCart.png');
const FALLING_LEAVES = require('../../assets/icons/leaves.jpg');

class PrintScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        tabBarIcon: () => (
            <Image
                source={!navigation.isFocused() ? TAB_ICON_TRANSPARENT : TAB_ICON}
                style={commonStyle.tabIconStyle}
            />
        ),
        tabBarVisible: navigation.state && navigation.state.params && navigation.state.params.showTabBar,
        tabBarOnPress({ defaultHandler }) {
            navigation.state.params.resetSate();
            defaultHandler();
        }
    });

    constructor(props) {
        super(props);
        this.state = {
            sectionSelected: 'cover',
            openAlert: false,
            messageAlert: '',
            softCover: true,
            selected: false,
            color: '#5f5f61',
            insideCover: { name: 'LEAVES', image: FALLING_LEAVES },
            firstLine: '',
            secondLine: '',
            thirdLine: '',
            projectName: '',
            fromDate: '',
            toDate: '',
            printBy: '',
            selectedJournal: '',
            itemId: '',
            journalPrintUrl: '',
            hideFooter: false,
            totalNumberOfPages: 0,
            estimatedAmount: 9.99
        };
        this.resetSate = this.state;
    }

    async componentWillMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.navigation.setParams({
                showTabBar: true,
            });
        });
        Keyboard.addListener('keyboardDidShow', () => this.keyboardDidShowAndHide(true));
        Keyboard.addListener('keyboardDidHide', () => this.keyboardDidShowAndHide(false));
    }

    componentDidMount() {
        const { dispatch } = this.props.navigation;
        dispatch(getCartAction()).then(() => {
        }).catch((err) => {
            this.openAlertModal(err);
        });
        InteractionManager.runAfterInteractions(() => {
            this.props.navigation.setParams({
                resetSate: this.clearState
            });
        });
    }

    setInsideCover = (insideCover) => {
        this.setState({ insideCover });
    }

    setSection = (section, type) => {
        const {
            firstLine, projectName, printBy, selectedJournal, toDate, fromDate, sectionSelected,
            estimatedAmount
        } = this.state;
        const { dispatch } = this.props.navigation;
        if (type === 'next') {
            NetInfo.isConnected.fetch().then(isConnected => {
                if (isConnected) {
                    if (firstLine.trim() === '' || projectName.trim() === ''
                            || ((printBy.trim() === '' || selectedJournal.trim() === '' ||
                                (printBy === 'date' && (toDate.trim() === '' || fromDate.trim() === ''))) && sectionSelected === 'interior')) {
                        this.openAlertModal(Constant.FILL_FULL_ENTRY);
                    } else if (section === 'interior') {
                        dispatch(getJournalsAction())
                            .then(res => {
                                if (res && res.length) {
                                    this.setState({ sectionSelected: section });
                                } else {
                                    this.openAlertModal(Constant.NO_JOURNAL_PRINT);
                                }
                            })
                            .catch(err => {
                                this.openAlertModal(err);
                            });
                    } else if (section === 'preview') {
                        const data = {
                            journal_id: selectedJournal,
                            end_date: toDate,
                            is_print_all_entries: printBy === 'all',
                            is_print_date_range_entries: printBy === 'date',
                            start_date: fromDate
                        };
                        dispatch(printingJournalSelect(data))
                            .then(res => {
                                this.setState({
                                    sectionSelected: section,
                                    itemId: res._id,
                                    journalPrintUrl: res.journalPrintUrl,
                                    totalNumberOfPages: res.totalNumberOfPages,
                                    estimatedAmount: res.pdfCost ? estimatedAmount + res.pdfCost : estimatedAmount
                                });
                            })
                            .catch(err => {
                                this.openAlertModal(err);
                            });
                    } else if (section === 'order') {
                        this.addToCart(section);
                    }
                } else {
                    this.openAlertModal(Constant.NETWORK_ERROR);
                }
            });
        } else {
            this.setState({ sectionSelected: section, totalNumberOfPages: 0 });
        }
    };

    keyboardDidShowAndHide = (state) => {
        InteractionManager.runAfterInteractions(() => {
            this.props.navigation.setParams({
                showTabBar: !state,
            });
        });
        this.setState({ hideFooter: state });
    }

    addToCart = (section) => {
        const {
            firstLine, secondLine, thirdLine, projectName, softCover, selectedJournal, color, insideCover, itemId
        } = this.state;

        const { dispatch } = this.props.navigation;
        const data = {
            journal_id: selectedJournal,
            cover_section: {
                cover: !softCover ? 'hard-cover' : 'soft-cover',
                coverColor: color,
                insideCoverDesign: insideCover.name,
                projectName: projectName.trim(),
                coverText: {
                    firstLine: firstLine.trim().toUpperCase(),
                    secondLine: secondLine.trim().toUpperCase(),
                    thirdLine: thirdLine.trim()
                }
            },
            quantity: '1',
            item_id: itemId
        };
        dispatch(addToCartAction(data))
            .then(() => {
                dispatch(getCartAction()).then(() => {
                }).catch((err) => {
                    this.openAlertModal(err);
                });
                this.setState({
                }, () => this.setState({ sectionSelected: section }));
            })
            .catch(err => {
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
        });
    };

    toggleCover = (preview) => {
        this.setState({ selected: preview === 'inner' });
    };

    chooseColor = (color) => {
        this.setState({ color });
    }

    toggleCoverCasing = (cover) => {
        this.setState({ softCover: cover === 'soft', estimatedAmount: cover === 'soft' ? 9.99 : 19.99 });
    };

    handleTextChange = (field, text) => {
        const newState = {};
        newState[field] = text;
        this.setState(newState);
    };

    togglePrintByOption = (type) => {
        this.setState({ printBy: type });
        if (type === 'all') {
            this.setState({ fromDate: '', toDate: '' });
        }
    };

    toggleSelectJournal = (journal) => {
        this.setState({ selectedJournal: journal });
    }
    clearState = () => {
        this.setState(this.resetSate);
    }

    navigateToCartScreen = () => {
        Keyboard.dismiss();
        this.props.navigation.navigate('CartScreen');
    }


    displayNotification = (CartItemCount) => (
        <View style={[style.countIcon]}>
            <Text
                style={[style.navItemStyle]}
            >{CartItemCount > 9 ? '9+' : CartItemCount}
            </Text>
        </View>
    );


    render() {
        const {
            softCover, selected, insideCover, color, firstLine, secondLine, thirdLine, projectName, sectionSelected,
            fromDate, toDate, printBy, selectedJournal, hideFooter, journalPrintUrl, totalNumberOfPages, estimatedAmount
        } = this.state;
        const cartFullData = this.props.cartData && this.props.cartData.data;
        const cartItems = cartFullData && cartFullData.items;
        const CartItemCount = cartItems ? cartItems.length : 0;
        return (
            <View style={[style.container, style.paddingTopMost]}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={style.topHeader}>
                        <View style={style.headerContent}>
                            <Text style={style.topHeaderText}>COVER</Text>
                            {sectionSelected === 'cover' && <View style={style.smallUnderline} />}
                        </View>
                        <View style={style.headerContent}>
                            <Text style={style.topHeaderText}>INTERIOR</Text>
                            {sectionSelected === 'interior' && <View style={style.smallUnderline} />}
                        </View>
                        <View style={style.headerContent}>
                            <Text style={style.topHeaderText}>PREVIEW</Text>
                            {sectionSelected === 'preview' && <View style={style.smallUnderline} />}
                        </View>
                        <View style={style.headerContent}>
                            <Text style={style.topHeaderText}>ORDER</Text>
                            {sectionSelected === 'order' && <View style={style.smallUnderline} />}
                        </View>
                        <View style={style.cartContent}>
                            <TouchableOpacity style={[{ position: 'relative' }]} onPress={() => this.navigateToCartScreen()}>
                                <Image
                                    source={CART_ICON}
                                    style={style.cartIconStyle}
                                />
                            </TouchableOpacity>
                            {
                                CartItemCount > 0 ? this.displayNotification(CartItemCount) : <View />
                            }
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                {sectionSelected === 'cover' &&
                <Cover
                    openAlertModal={this.openAlertModal}
                    closeAlert={this.closeAlert}
                    softCover={softCover}
                    selected={selected}
                    insideCover={insideCover}
                    color={color}
                    setInsideCover={this.setInsideCover}
                    toggleCover={this.toggleCover}
                    chooseColor={this.chooseColor}
                    toggleCoverCasing={this.toggleCoverCasing}
                    handleTextChange={this.handleTextChange}
                    firstLine={firstLine}
                    secondLine={secondLine}
                    thirdLine={thirdLine}
                    projectName={projectName}
                    sectionSelected={sectionSelected}
                    setSection={this.setSection}
                />}
                {sectionSelected === 'interior' &&
                    <Interior
                        handleTextChange={this.handleTextChange}
                        togglePrintByOption={this.togglePrintByOption}
                        toggleSelectJournal={this.toggleSelectJournal}
                        selectedJournal={selectedJournal}
                        printBy={printBy}
                        fromDate={fromDate}
                        toDate={toDate}
                    />
                }
                {sectionSelected === 'preview' &&
                <Preview journalPrintUrl={journalPrintUrl} projectName={projectName} />
                }
                {sectionSelected === 'order' &&
                <Order
                    firstLine={firstLine}
                    secondLine={secondLine}
                    thirdLine={thirdLine}
                    projectName={projectName}
                    softCover={softCover}
                    color={color}
                    clearState={this.clearState}
                    estimatedAmount={estimatedAmount}
                    {...this.props}
                />
                }
                {sectionSelected !== 'order' && !hideFooter &&
                    <PrintFooter
                        sectionSelected={sectionSelected}
                        softCover={softCover}
                        setSection={this.setSection}
                        totalNumberOfPages={totalNumberOfPages}
                        estimatedAmount={estimatedAmount}
                    />
                }
                <AlertModal
                    message={this.state.messageAlert}
                    open={this.state.openAlert}
                    close={this.closeAlert}
                />
                <Spinner
                    animating={this.props.fetching}
                    loadingText={this.props.printingJournalFetching ? Constant.PDF_LOADING_TEXT : ''}
                />
            </View>
        );
    }
}

PrintScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    fetching: PropTypes.bool,
    printingJournalFetching: PropTypes.bool,
    isConnected: PropTypes.bool,
    cartData: PropTypes.object,
};

PrintScreen.defaultProps = {
    fetching: false,
    printingJournalFetching: false,
    isConnected: false,
    cartData: {}
};

const mapStateToProps = (state) => ({
    fetching: state.getJournalReducer.fetching || state.printingJournalSelect.fetching || state.addToCartReducer.fetching,
    printingJournalFetching: state.printingJournalSelect.fetching,
    isConnected: state.checkNetworkReducer.isConnected,
    cartData: state.getCartReducer.cartData
});

export default connect(mapStateToProps)(PrintScreen);
