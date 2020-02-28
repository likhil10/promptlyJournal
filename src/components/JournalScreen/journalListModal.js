import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Keyboard, FlatList, Image, NetInfo } from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-simple-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constant from '../../utility/constants';
import commonStyle from '../Common/commonStyle';
import style from './journalStyle';
import JournalListItem from './journalListItem';
import Spinner from '../Common/spinner';
import deleteJournalAction from '../../actions/deleteJournalAction';
import TextBox from '../Common/textBox';

const PLUS_ICON = require('../../assets/icons/plus_transparent.png');

export default class JournalListModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            journalSelected: '',
            sectionSelected: '',
            subSectionSelected: '',
            promptedJournal: '',
            open: false,
            deleteText: '',
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.section && nextProps.journal !== this.props.journal) {
            this.setState({
                promptedJournal: nextProps.journal,
                sectionSelected: nextProps.section,
                subSectionSelected: nextProps.subSection ? nextProps.subSection.name ? nextProps.subSection.name : nextProps.subSection : '',
            });
        }
    }

    getPrompts = (section, subSection) => {
        this.setState({
            promptedJournal: this.state.journalSelected,
            sectionSelected: section,
            subSectionSelected: subSection
        });
        this.props.getPrompts(this.state.journalSelected, section, subSection);
    };
  open =() => {
      this.setState({
          open: true,
      });
  };

    modalDidClose = () => {
        this.props.close();
    };


    /**
     * Method to select journal
     */
    selectJournal = (id) => {
        this.setState({ journalSelected: id });
    };

    /**
     * Method for navigating to AddJournal Screen.
     */
    navigateToAddJournalScreen = () => {
        Keyboard.dismiss();
        const { navigate } = this.props;
        navigate('AddJournalScreen', {
            addJournalFlag: false, count: 0, noContent: false, save: false
        });
    };

  hitDeleteJournalAPI = () => {
      if (this.state.deleteText.trim().toUpperCase() === 'DELETE') {
          this.setState({
              open: false,
          }, () => this.deleteJournalAPI());
      }
  };

  handleTextChange = field => (text) => {
      const newState = {};
      newState[field] = text;
      this.setState(newState);
  };

  deleteJournalAPI = () => {
      const { journalData } = this.props;
      const journal_id = journalData._id;
      const { dispatch } = this.props;
      NetInfo.isConnected.fetch()
          .then(isConnected => {
              if (isConnected) {
                  dispatch(deleteJournalAction(journal_id))
                      .then(() => {
                          // this.setState({
                          // open: true,
                          // message: Constant.DELETE_PROMPT_SUCCESS
                          // })
                      })
                      .catch(() => {
                          this.setState({
                              open: true,
                              // message: err
                          });
                      });
              } else {
                  this.setState({
                      open: true,
                      // message: Constant.NETWORK_ERROR
                  });
              }
          });
  }

  render() {
      const {
          open, close, journalData, fetchingData, navigateToEditJournal,
      } = this.props;
      const {
          journalSelected, sectionSelected, subSectionSelected, promptedJournal
      } = this.state;
      return (
          <Modal
              open={open}
              closeOnTouchOutside={false}
              modalStyle={commonStyle.modalStyle}
              modalDidClose={this.modalDidClose}
          >
              <View style={commonStyle.modelContainer}>
                  <View style={commonStyle.leftContainer}>
                      <TouchableOpacity
                          onPress={close}
                      >
                          <Ionicons name="md-close" size={23} color={Constant.TEXT_COLOR} />
                      </TouchableOpacity>
                  </View>
                  <View style={commonStyle.modalCenterContainer}>
                      <View style={commonStyle.modalContentContainer}>
                          <View style={commonStyle.flexContainer}>
                              {!fetchingData && <FlatList
                                  data={journalData}
                                  extraData={journalSelected}
                                  renderItem={({ item, index }) =>
                                      (<JournalListItem
                                          open={this.open}
                                          customModalJournal={0}
                                          item={item}
                                          index={index}
                                          openDeleteJournalModal={this.props.openDeleteJournalModal}
                                          selectJournal={this.selectJournal}
                                          getPrompts={this.getPrompts}
                                          journalSelected={journalSelected}
                                          promptedJournal={promptedJournal}
                                          sectionSelected={sectionSelected}
                                          subSectionSelected={subSectionSelected}
                                          id={item._id}
                                          navigateToEditJournal={navigateToEditJournal}
                                          hidePencil
                                      />)
                                  }
                                  ListEmptyComponent={() =>
                                      (
                                          <Text
                                              style={[commonStyle.subHeaderTextStyle, commonStyle.textCenter]}
                                          >{Constant.BLANK_JOURNAL_TEXT}
                                          </Text>)
                                  }
                                  bounces={false}
                                  showsHorizontalScrollIndicator={false}
                                  keyExtractor={(item, index) => index.toString()}
                              />}
                          </View>
                          <Spinner
                              animating={fetchingData}
                          />
                      </View>
                      <TouchableOpacity
                          onPress={() => this.navigateToAddJournalScreen()}
                      >
                          <Image
                              source={PLUS_ICON}
                              style={[commonStyle.tabIconStyle, { width: 70, height: 70 }]}
                          />
                      </TouchableOpacity>
                      <Text style={commonStyle.italicTextStyle}>Add new journal</Text>
                  </View>
              </View>
              <Modal
                  open={this.state.open}
                  modalStyle={[{
                      backgroundColor: Constant.WHITE_COLOR, width: '80%', justifyContent: 'center', alignSelf: 'center', height: '40%'
                  }, style.padding10]}
                  modalDidClose={this.modalDidClose}
              >
                  <View style={[style.centeredItems]}>
                      <Text style={[style.textStyle, style.textCenter, style.messageText, { textAlign: 'center' }]}>Journals, once created can not be edited. To change, delete the existing journal and create a new one.</Text>
                      <Text
                          style={[style.subHeaderTextStyle, style.textCenter, style.messageBoldText]}
                      >Type &apos;DELETE&apos; to delete the journal
                      </Text>
                      <View style={style.middleLine} />
                      <View style={{ height: 60 }}><TextBox
                          placeholder=""
                          icon=""
                          style={{
                              height: 50, borderColor: '#000', border: 1, borderRadius: 2
                          }}
                          handleText={this.handleTextChange('deleteText')}
                          value={this.state.deleteText}
                          onSubmitEditing={() => {
                              Keyboard.dismiss();
                          }}
                      />
                      </View>
                      <TouchableOpacity
                          onPress={() => this.hitDeleteJournalAPI()}
                          style={style.okButton}
                      >
                          <Text style={[style.buttonText, { textAlign: 'center', fontSize: 18, letterSpacing: 1 }]}>Delete</Text>
                      </TouchableOpacity>
                  </View>
              </Modal>
          </Modal>
      );
  }
}

JournalListModal.propTypes = {
    journalData: PropTypes.array,
    journal: PropTypes.string.isRequired,
    section: PropTypes.string.isRequired,
    subSection: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired,
    getPrompts: PropTypes.func.isRequired,
    dispatch: PropTypes.func,
    navigateToEditJournal: PropTypes.func.isRequired,
    openDeleteJournalModal: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    fetchingData: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired,
};

JournalListModal.defaultProps = {
    dispatch: () => {},
    journalData: [],
};
