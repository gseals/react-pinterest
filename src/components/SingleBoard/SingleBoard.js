import React from 'react';
import PropTypes from 'prop-types';

import PinForm from '../PinForm/PinForm';

import boardData from '../../helpers/data/boardData';
import Pin from '../Pins/Pins';
import pinData from '../../helpers/data/pinData';

class SingleBoard extends React.Component {
  static propTypes = {
    seclectedBoardId: PropTypes.string,
    setSingleBoard: PropTypes.func,
  }

  state = {
    board: {},
    pins: [],
  }

  componentDidMount() {
    const { selectedBoardId } = this.props;
    boardData.getSingleBoard(selectedBoardId)
      .then((request) => {
        this.setState({ board: request.data });
        this.getPinData(selectedBoardId);
      })
      .catch((errorFromGetSingleBoard) => console.error({ errorFromGetSingleBoard }));
  }

  getPinData = (selectedBoardId) => {
    pinData.getPinsByBoardId(selectedBoardId)
      .then((pins) => {
        this.setState({ pins });
      })
      .catch((errorFromGetPins) => console.error({ errorFromGetPins }));
  }

  savePinData = (newPin) => {
    pinData.savePin(newPin)
      .then(() => {
        this.getPinData(this.props.selectedBoardId);
      })
      .catch((errorFromSavePin) => console.error({ errorFromSavePin }));
  }

  deleteSinglePin = (pinId) => {
    const { selectedBoardId } = this.props;

    pinData.deletePin(pinId)
      .then(() => {
        this.getPinData(selectedBoardId);
      })
      .catch((errorFromDeletePin) => console.error({ errorFromDeletePin }));
  }

  removeSelectedBoardId = (e) => {
    e.preventDefault();
    const { setSingleBoard } = this.props;
    setSingleBoard(null);
  }

  render() {
    const { board, pins } = this.state;
    const { selectedBoardId } = this.props;

    return (
    <div>
      <button className="btn btn-info" onClick={this.removeSelectedBoardId}>x Close Board View</button>
      <div className="SingleBoard col-8 offset-2">
        <h2>{board.name}</h2>
        <p>{board.description}</p>
        <PinForm savePin={this.savePinData} selectedBoardId={this.selectedBoardId} />
        <div className="d-flex flex-wrap">
          { pins.map((pin) => <Pin key={pin.id} pin={pin} deleteSinglePin={this.deleteSinglePin} />)}
        </div>
      </div>
    </div>
    );
  }
}

export default SingleBoard;
