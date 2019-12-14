import React from 'react';

import authData from '../../helpers/data/authData';
import boardData from '../../helpers/data/boardData';

class BoardsContainer extends React.Component {
  state = {
    boards: [],
  }

  componentDidMount() {
    boardData.getBoardsByUid(authData.getUid())
      .then((boards) => {
        this.setState({ boards });
      })
      .catch((errFromBoardsContainer) => console.error({ errFromBoardsContainer }));
  }

  render() {
    return (<div>{this.state.boards.map((board) => <h6>{board.name}</h6>)}</div>);
  }
}

export default BoardsContainer;
