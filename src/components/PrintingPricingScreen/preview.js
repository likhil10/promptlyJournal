import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Text,
    ActivityIndicator
} from 'react-native';
import Pdf from 'react-native-pdf';
import PropTypes from 'prop-types';
import _ from 'lodash';
import style from './printingStyles';
import Config from '../../utility/config';
import Constants from '../../utility/constants';


class Preview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPages: 0,
            currentPage: 0
        };
    }

    render() {
        const { totalPages, currentPage } = this.state;
        const { journalPrintUrl, projectName } = this.props;
        const url = journalPrintUrl || `${Config.BASE_URL}/public/pdf/journals/childhood.pdf`;
        const source = { uri: url, cache: false };
        return (
            <View style={style.previewContainer}>
                <View style={style.pagingContainer}>
                    <Text style={[style.pageNumber, { color: '#725f62' }]}>
                        {projectName}
                    </Text>
                </View>
                <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages) => {
                        this.setState({ totalPages: numberOfPages });
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        this.setState({ currentPage: page, totalPages: numberOfPages });
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    activityIndicatorProps={{ color: '#725f62', progressTintColor: '#725f62' }}
                    activityIndicator={
                        <View style={style.activityContainer}>
                            <ActivityIndicator
                                size="large"
                                color="#FFF"
                            />
                            <Text style={style.previewText}>
                                {Constants.PDF_LOADING_TEXT}
                            </Text>
                        </View>
                    }
                    style={style.pdfContainer}
                    horizontal
                    enablePaging
                />
                <View style={style.pagingContainer}>
                    <Text style={[style.pageNumber, { color: '#725f62' }]}>
                        Showing page {currentPage} of {totalPages}
                    </Text>
                </View>
            </View>
        );
    }
}

Preview.propTypes = {
    journalPrintUrl: PropTypes.string.isRequired,
    projectName: PropTypes.string.isRequired
};

Preview.defaultProps = {
};

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(Preview);
