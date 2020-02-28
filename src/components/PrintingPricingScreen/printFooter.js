import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import style from './printingStyles';

class PrintFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const sectionOptions = ['cover', 'interior', 'preview', 'order'];
        const {
            sectionSelected, setSection, totalNumberOfPages, estimatedAmount
        } = this.props;
        return (
            <View style={style.footer}>
                <View style={style.nextBackButtonView}>
                    {sectionSelected !== 'cover' &&
                    <TouchableOpacity
                        style={style.justifyAlign}
                        onPress={() => setSection(sectionOptions[sectionOptions.indexOf(sectionSelected) - 1], 'prev')}
                    >
                        <View style={[style.nextBackButton, style.justifyAlign]}>
                            <SimpleLineIcons name="arrow-left" size={15} color="#725f62" />
                        </View>
                        <Text style={style.nextBackButtonText}>
                            BACK
                        </Text>
                    </TouchableOpacity>
                    }
                </View>
                <View style={style.middleFooter}>
                    {
                        totalNumberOfPages > 0 ?
                            <Text style={style.pageNumber}>
                                {totalNumberOfPages} PAGES
                            </Text> : null
                    }
                    <Text style={style.nextBackButtonText}>
                        ESTIMATED TOTAL
                    </Text>
                    <Text style={style.printAmount}>
                        ${estimatedAmount && estimatedAmount.toFixed(2)}
                    </Text>
                </View>
                <View style={style.nextBackButtonView}>
                    {sectionSelected !== 'order' &&
                    <TouchableOpacity
                        style={style.justifyAlign}
                        onPress={() => setSection(sectionOptions[sectionOptions.indexOf(sectionSelected) + 1], 'next')}
                    >
                        <View style={[style.nextBackButton, style.justifyAlign]}>
                            {sectionSelected === 'preview' ? <MaterialCommunityIcons name="check" size={15} color="#725f62" />
                                : <SimpleLineIcons name="arrow-right" size={15} color="#725f62" />
                            }
                        </View>
                        <Text style={style.nextBackButtonText}>
                            {sectionSelected === 'preview' ? 'ORDER' : 'NEXT'}
                        </Text>
                    </TouchableOpacity>
                    }
                </View>
            </View>
        );
    }
}

PrintFooter.propTypes = {
    setSection: PropTypes.func.isRequired,
    sectionSelected: PropTypes.string.isRequired,
    estimatedAmount: PropTypes.number.isRequired,
    totalNumberOfPages: PropTypes.number,
};

const mapStateToProps = () => ({
    totalNumberOfPages: 0
});

export default connect(mapStateToProps)(PrintFooter);
