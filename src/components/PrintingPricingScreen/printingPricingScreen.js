import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import commonStyle from '../Common/commonStyle';
import TabHeader from '../Common/tabHeader';
import Constant from '../../utility/constants';
import AlertModal from '../Common/AlertModal';
import style from './printingStyles';
import Styles from '../SubscriptionPlanScreen/subscriptionPlanStyle';
import Swipers from '../Common/swipper';

const TAB_ICON = require('../../assets/icons/print_icon.png');
const TAB_ICON_TRANSPARENT = require('../../assets/icons/print_trasparent.png');
const PRINTING_HEADER = require('../../assets/pricing/promptly-app-birthdayparty-1.jpg');
const SOFT_COVER = require('../../assets/pricing/soft_cover.jpg');
const HARD_COVER = require('../../assets/pricing/hard_cover.jpg');
const PRINTED = require('../../assets/pricing/printed.jpg');
const GOLD_EMBOSSED = require('../../assets/pricing/gold_embrossed.jpg');
const MATERIALS = require('../../assets/pricing/materials.jpg');
const INSIDE_COVER1 = require('../../assets/pricing/inside_cover_1.jpg');
const INSIDE_COVER2 = require('../../assets/pricing/inside_cover_2.jpg');
const COVER_TITLES = require('../../assets/customize/cover_titles.png');
const CUSTOMIZE = require('../../assets/customize/customize.png');
const INSIDE_COVERS = require('../../assets/customize/inside_covers.png');
const JOURNALS = require('../../assets/customize/journals.png');
const PHOTOS = require('../../assets/customize/photos.png');
const PRINTING_ENTRIES = require('../../assets/customize/printing_entries.png');
const FOOTER_1 = require('../../assets/pricing/footer_1.jpg');
const FOOTER_2 = require('../../assets/pricing/footer_2.jpg');

class PrintingPricingScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        tabBarIcon: () => (
            <Image
                source={!navigation.isFocused() ? TAB_ICON_TRANSPARENT : TAB_ICON}
                style={commonStyle.tabIconStyle}
            />
        ),
    });

    constructor(props) {
        super(props);
        this.state = {
            isDisabled: true,
            openAlert: false,
            messageAlert: ''
        };
    }

    openAlertModal = () => {
        this.setState({
            openAlert: true,
            messageAlert: Constant.COMING_SOON,
        });
    };

    closeAlert = () => {
        this.setState({
            openAlert: false,
        });
    };

    render() {
        const { isDisabled } = this.state;
        return (
            <View style={style.container}>
                <TabHeader
                    disabled={isDisabled}
                    openAlertModal={this.openAlertModal}
                    displayText="Print Journals"
                />
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps="handled"
                    alwaysBounceVertical={false}
                    bounces={false}
                >
                    <View style={style.headerContainer}>
                        <Image
                            source={PRINTING_HEADER}
                            style={style.headerImage}
                        />
                    </View>
                    <Text style={style.headerText}>PROMPTLY PRINTING-COMING SOON!</Text>
                    <View style={style.centerContainer}>
                        <View style={[style.paraContainer, style.justifyAlign]}>
                            <Text style={style.paraText}>Relive your meaningful moments.</Text>
                            <Text style={style.paraText}>Print your journal entries into beautiful, heirloom quality book.</Text>
                        </View>
                        <View style={[style.paraContainer, style.justifyAlign]}>
                            <Text style={style.paraText}>Featuring quality paper, integrated photo printing, and customized design options, our journals are the perfect way to honor your memories.</Text>
                        </View>
                        <View style={[style.paraContainer, style.justifyAlign]}>
                            <Text style={style.paraText}>See the printing details below:</Text>
                        </View>
                        <View style={[style.paraContainer, style.justifyAlign, style.marginVertical]}>
                            <Text style={[style.paraText, { fontSize: 12 }]}>PRICING</Text>
                            <View style={[style.underline, style.marginVerticalSmall]} />
                            <View style={style.flexRow}>
                                <View style={style.coverSection}>
                                    <Text style={style.headerText}>SOFT COVER</Text>
                                    <Text style={style.sectionText}>starting at</Text>
                                    <View style={style.moneyContainer}>
                                        <Text style={style.amount}>$</Text>
                                        <Text style={style.money}>9</Text>
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={style.amountUnderlined}>99</Text>
                                            <View style={[Styles.underline, { marginTop: 1, alignSelf: 'center' }]} />
                                        </View>
                                    </View>
                                    <Text style={style.sectionText}>for 26 pages</Text>
                                    <Text style={style.sectionText}>+.25 per extra page</Text>
                                </View>
                                <View style={style.coverSection}>
                                    <Text style={style.headerText}>HARD COVER</Text>
                                    <Text style={style.sectionText}>starting at</Text>
                                    <View style={style.moneyContainer}>
                                        <Text style={style.amount}>$</Text>
                                        <Text style={style.money}>19</Text>
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={style.amountUnderlined}>99</Text>
                                            <View style={[Styles.underline, { marginTop: 1, alignSelf: 'center' }]} />
                                        </View>
                                    </View>
                                    <Text style={style.sectionText}>for 26 pages</Text>
                                    <Text style={style.sectionText}>+.25 per extra page</Text>
                                </View>
                            </View>
                            <View style={[style.paraContainer, style.justifyAlign, { marginTop: 20 }]}>
                                <Text style={style.paraText}>You can print your story, your way. Choose the journal you&apos;d like to print and specify the desired range (by date) of entries from a single journal. Take a glance at the final cost calculated for you in the app and make any desired changes. Flip through your journal in preview mode to refine the little things before sending your memories to print.</Text>
                            </View>
                        </View>
                        <View style={[style.paraContainer, style.justifyAlign, style.marginVertical]}>
                            <Text style={[style.paraText, { fontSize: 12 }]}>COVER</Text>
                            <View style={[style.underline, style.marginVerticalSmall]} />
                            <View style={style.flexColumn}>
                                <View style={[style.flexRow, { justifyContent: 'space-between', width: '100%' }]}>
                                    <View style={[style.coverSection, style.coverSectionHeight]}>
                                        <Image
                                            source={SOFT_COVER}
                                            style={style.coverImage}
                                        />
                                        <View style={[style.paraContainer, style.justifyAlign]}>
                                            <Text style={style.paraText}>Our soft cover option features a perfect bound book with a thick, leatherette-textured cover.</Text>
                                        </View>
                                    </View>
                                    <View style={[style.coverSection, style.coverSectionHeight]}>
                                        <Image
                                            source={HARD_COVER}
                                            style={style.coverImage}
                                        />
                                        <View style={[style.paraContainer, style.justifyAlign]}>
                                            <Text style={style.paraText}>Our premium hardcover book is designed to last-making it a timeless gift to you and yours both now and forever.</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={[style.flexRow, { justifyContent: 'space-between', width: '100%' }]}>
                                    <View style={[style.coverSection, { width: '48%' }]}>
                                        <Image
                                            source={PRINTED}
                                            style={style.coverImage}
                                        />
                                        <View style={[style.paraContainer, style.justifyAlign]}>
                                            <Text style={style.paraText}>PRINTED.</Text>
                                        </View>
                                    </View>
                                    <View style={[style.coverSection, { width: '48%' }]}>
                                        <Image
                                            source={GOLD_EMBOSSED}
                                            style={style.coverImage}
                                        />
                                        <View style={[style.paraContainer, style.justifyAlign]}>
                                            <Text style={style.paraText}>GOLD EMBOSSED.</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={[style.paraContainer, style.justifyAlign]}>
                                <Text style={style.paraText}>Give your journal the name that fits. Out styled fonts across all journals (soft and hardcore) gives you a beautifully uniform aesthetic. You find the words, we will take care of the rest.</Text>
                            </View>
                        </View>
                        <View style={[style.paraContainer, style.justifyAlign, style.marginVertical]}>
                            <Text style={[style.paraText, { fontSize: 12 }]}>MATERIALS</Text>
                            <View style={[style.underline, style.marginVerticalSmall]} />
                            <View style={[style.paraContainer, style.justifyAlign]}>
                                <Text style={style.paraText}>With our luxuriously soft leatherette cover material, crisp white paper, and vivid printed images featured in both options, either journal will print as a beautiful final product.</Text>
                            </View>
                            <Image
                                source={MATERIALS}
                                style={[style.coverImage, style.marginVerticalSmall]}
                            />
                        </View>
                        <View style={[style.paraContainer, style.justifyAlign, style.marginVertical]}>
                            <Text style={[style.paraText, { fontSize: 12 }]}>INSIDE COVER</Text>
                            <View style={[style.underline, style.marginVerticalSmall]} />
                            <View style={[style.flexRow, { justifyContent: 'space-between', width: '100%' }]}>
                                <View style={[style.coverSection, { width: '48%' }]}>
                                    <Image
                                        source={INSIDE_COVER1}
                                        style={style.coverImage}
                                    />
                                </View>
                                <View style={[style.coverSection, { width: '48%' }]}>
                                    <Image
                                        source={INSIDE_COVER2}
                                        style={style.coverImage}
                                    />
                                </View>
                            </View>
                            <View style={[style.paraContainer, style.justifyAlign]}>
                                <Text style={style.paraText}>Created with elevated design in mind, all of our journals include your choice of illustrated endpaper patterns. Softcover journals include one endpaper (on the backside of the front cover), while our hardcover product includes a full spread in the endpaper design of your choice.</Text>
                            </View>
                        </View>
                        <View style={[style.paraContainer, style.justifyAlign, style.marginVertical]}>
                            <Text style={[style.paraText, { fontSize: 12 }]}>SIZE</Text>
                            <View style={[style.underline, style.marginVerticalSmall]} />
                            <View style={[style.flexRow, { justifyContent: 'space-between', width: '100%' }]}>
                                <View style={[style.coverSection, { width: '48%' }]}>
                                    <View style={[style.paraContainer, style.justifyAlign]}>
                                        <Text style={[style.paraText, { fontFamily: Constant.PARAGRAPH_TEXT_FONT }]}>6&quot;x9&quot;</Text>
                                    </View>
                                </View>
                                <View style={[style.coverSection, { width: '48%' }]}>
                                    <View style={[style.paraContainer, style.justifyAlign]}>
                                        <Text style={[style.paraText, { fontFamily: Constant.PARAGRAPH_TEXT_FONT }]}>6.125&quot;x9.25&quot;</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={[style.paraContainer, style.justifyAlign]}>
                                <Text style={style.paraText}>Sized perfectly for you to hold your memories in your hands. Wile we have set a standard height and width, the thickness of your journal is up to you. Print small chapters of life with a narrow date range, or wait to print the larger narrative that spans across the years. Your journal length depends on the story you want it to tell.</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[style.paraContainer, { justifyContent: 'flex-start' }, style.marginVertical]}>
                        <View style={style.swiperStyle}>
                            <View style={[style.paraContainer, style.justifyAlign, { marginVertical: 0, width: '80%', height: '20%' }]}>
                                <Text style={[style.headerText, { fontSize: 25, letterSpacing: 2, marginVertical: 0 }]}>CUSTOMIZE YOUR JOURNAL</Text>
                            </View>
                            <Swipers
                                showsPagination={false}
                                autoplay={false}
                                showsButtons
                                nextButton={<SimpleLineIcons name="arrow-right" size={40} color="#725f62" />}
                                prevButton={<SimpleLineIcons name="arrow-left" size={40} color="#725f62" />}
                                customStyle={{ backgroundColor: '#f3f3f3' }}
                            >
                                <View style={[style.swiperSection, style.justifyAlign]}>
                                    <Image
                                        source={CUSTOMIZE}
                                        style={style.icons}
                                    />
                                    <View style={[style.paraContainer, { marginVertical: 0 }]}>
                                        <Text style={[style.headerText, { letterSpacing: 2, marginVertical: 10 }]}>COVER COLOR</Text>
                                    </View>
                                    <View style={[style.paraContainer, { marginVertical: 0 }]}>
                                        <Text style={style.customText}>All printed journals will be available in our entire collection of cover colors. No need to be limited to color choice by journal theme</Text>
                                    </View>
                                </View>
                                <View style={[style.swiperSection, style.justifyAlign]}>
                                    <Image
                                        source={INSIDE_COVERS}
                                        style={style.icons}
                                    />
                                    <View style={[style.paraContainer, { marginVertical: 0 }]}>
                                        <Text style={[style.headerText, { letterSpacing: 2, marginVertical: 10 }]}>INSIDE COVERS</Text>
                                    </View>
                                    <View style={[style.paraContainer, { marginVertical: 0 }]}>
                                        <Text style={style.customText}>Choose from our artfully illustrated endpaper designs. Mix and match patterns to your liking.</Text>
                                    </View>
                                </View>
                                <View style={[style.swiperSection, style.justifyAlign]}>
                                    <Image
                                        source={COVER_TITLES}
                                        style={style.icons}
                                    />
                                    <View style={[style.paraContainer, { marginVertical: 0 }]}>
                                        <Text style={[style.headerText, { letterSpacing: 2, marginVertical: 10 }]}>COVER TITLES</Text>
                                    </View>
                                    <View style={[style.paraContainer, { marginVertical: 0 }]}>
                                        <Text style={style.customText}>Make your journal your own with a title of your choice.</Text>
                                    </View>
                                </View>
                                <View style={[style.swiperSection, style.justifyAlign]}>
                                    <Image
                                        source={PRINTING_ENTRIES}
                                        style={style.icons}
                                    />
                                    <View style={[style.paraContainer, { marginVertical: 0 }]}>
                                        <Text style={[style.headerText, { letterSpacing: 2, marginVertical: 10 }]}>PRINTING ENTRIES</Text>
                                    </View>
                                    <View style={[style.paraContainer, { marginVertical: 0 }]}>
                                        <Text style={style.customText}>You determine which memories to include in each journal. Select your desired date-range and let the app sort through and compile those entries for you.</Text>
                                    </View>
                                </View>
                                <View style={[style.swiperSection, style.justifyAlign]}>
                                    <Image
                                        source={PHOTOS}
                                        style={style.icons}
                                    />
                                    <View style={[style.paraContainer, { marginVertical: 0 }]}>
                                        <Text style={[style.headerText, { letterSpacing: 2, marginVertical: 10 }]}>PHOTOS</Text>
                                    </View>
                                    <View style={[style.paraContainer, { marginVertical: 0 }]}>
                                        <Text style={style.customText}>Gone are the days of inserting prints, sticking on photo corners, or adding a bulky folder to the backcover. No need to order prints and glue them in yourself. Your photos will be printed right into the journal. A clean, classy look to last.</Text>
                                    </View>
                                </View>
                                <View style={[style.swiperSection, style.justifyAlign]}>
                                    <Image
                                        source={JOURNALS}
                                        style={style.icons}
                                    />
                                    <View style={[style.paraContainer, { marginVertical: 0 }]}>
                                        <Text style={[style.headerText, { letterSpacing: 2, marginVertical: 10 }]}>ALL THE JOURNALS</Text>
                                    </View>
                                    <View style={[style.paraContainer, { marginVertical: 0 }]}>
                                        <Text style={style.customText}>Life is full of so many stories. Love stories, childhood, travel narratives and more. Our app allows you to tell each story with a different journal -- and print each one whenever you choose. You can print a beautiful book to represent each stage of life.</Text>
                                        <Text style={style.customText}>Note: Entries from various journals cannot be combined into one book</Text>
                                    </View>
                                </View>
                            </Swipers>
                        </View>
                        <View style={[style.paraContainer, style.justifyAlign, style.marginVertical]}>
                            <View style={[style.flexRow, { justifyContent: 'space-evenly', width: '100%' }]}>
                                <View style={[style.coverSection, { width: '48%' }]}>
                                    <Image
                                        source={FOOTER_1}
                                        style={style.coverImage}
                                    />
                                </View>
                                <View style={[style.coverSection, { width: '48%' }]}>
                                    <Image
                                        source={FOOTER_2}
                                        style={style.coverImage}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
                <AlertModal
                    message={this.state.messageAlert}
                    open={this.state.openAlert}
                    close={this.closeAlert}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    isConnected: state.checkNetworkReducer.isConnected,
    journalSelected: state.selectedJournalReducer.journalSelected,
});

export default connect(mapStateToProps)(PrintingPricingScreen);
