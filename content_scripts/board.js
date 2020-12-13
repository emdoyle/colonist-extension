const board = document.createElement('div');
board.style.zIndex = "999";
board.id = "colonistHUDPlanningBoard";
document.body.append(board);

const boardUpdates = function() {
    function updateBoard(value) {
      // do something here with the board
    }
    if (window.colonistHUDStatsObservers === undefined) {
        window.colonistHUDStatsObservers = []
    }
    window.colonistHUDStatsObservers.push(updateBoard)
};

injectCode(boardUpdates)
