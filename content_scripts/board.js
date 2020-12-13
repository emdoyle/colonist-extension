const board = document.createElement('div');
board.style.position = "absolute";
board.style.zIndex = "9999";
board.id = "colonistHUDPlanningBoard";
document.body.append(board);

const boardUpdates = function() {
    const hexCornerPoints = [
      [150, 20],
      [260, 75],
      [260, 225],
      [150, 280],
      [40, 225],
      [40, 75]
    ]
    const hexCornerPointsAttr = hexCornerPoints.map(([x, y]) => `${x},${y}`).join(" ")

    function buildHex() {
        const hex = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        hex.setAttribute("width", "300")
        hex.setAttribute("height", "300")
        hex.style.backgroundColor = "white"
        const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon")
        polygon.setAttribute("points", hexCornerPointsAttr)
        polygon.style.backgroundColor = "black"
        hex.appendChild(polygon)
        document.getElementById("colonistHUDPlanningBoard").appendChild(hex)
        return hex
    }

    function addCornerCircles(hexSVG) {
        hexCornerPoints.forEach(([x, y]) => {
          const corner = document.createElementNS("http://www.w3.org/2000/svg", "circle")
          corner.setAttribute("cx", x)
          corner.setAttribute("cy", y)
          corner.setAttribute("r", 18)
          corner.setAttribute("stroke", "green")
          corner.setAttribute("stroke-width", "4")
          corner.setAttribute("fill", "yellow")
          hexSVG.appendChild(corner)
        })
    }

    function updateBoard(value) {
      // do something here with the board
    }
    if (window.colonistHUDStatsObservers === undefined) {
        window.colonistHUDStatsObservers = []
    }
    window.colonistHUDStatsObservers.push(updateBoard)
};

injectCode(boardUpdates)
