//Drawing room utils (for fabric.js)
const FLOOR_CIELING_SIZE_FACTOR = 0.75;
const MAGICK_CSS_BACKGROUND_COLOR = "#0e0e0e";

const RoomDrawUtils = {

    /**
     * Draw a room using Veins of the Earth representation system
     * 
     * @param {*} fabricCanvas 
     * @param {*} roomModel 
     */
    drawRoom(fabricCanvas, roomModel) {

        if (!fabricCanvas) {
            throw new Exception("Undefined fabricCanvas");
        }

        if (!fabricCanvas instanceof fabric.Canvas) {
            throw new Exception("Canvas object must be a instance of fabric.Canvas");
        }

        // create a rectangle object
        const rect = new fabric.Rect({
            left: fabricCanvas.width / 2 - 20,
            top: fabricCanvas.height / 2 - 60,
            strokeWidth: 5,
            stroke: 'white',
            fill: 'transparent',
            width: 150,
            height: 150,
            angle: 45,
            centeredRotation: true,
            selectable: false
        });


        // create a cieling for the room
        const cieling = new fabric.Line(
            [
                rect.left - rect.width * FLOOR_CIELING_SIZE_FACTOR,
                rect.top,
                rect.left + rect.width * FLOOR_CIELING_SIZE_FACTOR,
                rect.top
            ],
            {
                strokeWidth: 5,
                stroke: 'white',
                fill: 'transparent',
                selectable: false
            });

        // create a the floor of the room
        const floor = new fabric.Line(
            [
                rect.left - rect.width * FLOOR_CIELING_SIZE_FACTOR,
                (rect.height * 1.45) + rect.top,
                rect.left + rect.width * FLOOR_CIELING_SIZE_FACTOR,
                (rect.height * 1.45) + rect.top,
            ],
            {
                strokeWidth: 5,
                stroke: 'white',
                fill: 'transparent',
                selectable: false
            });

        // "add" rectangle onto canvas
        fabricCanvas.add(rect);
        fabricCanvas.add(cieling);
        fabricCanvas.add(floor);

        this.drawDoors(fabricCanvas, roomModel, rect)


        //North pointer
        const northPointer = new fabric.Textbox('N', {
            left: rect.left + rect.width / 4,
            top: rect.top + rect.height / 4,
            width: 15,
            fontSize: 42,
            fill: 'white',
            backgroundColor: MAGICK_CSS_BACKGROUND_COLOR,
            selectable: false
        });

        fabricCanvas.add(northPointer);

        //Floor pointer
        const floorPointer = new fabric.Textbox('F', {
            left: rect.left * 0.92,
            top: rect.top + rect.height * 1.30,
            width: 15,
            fontSize: 42,
            fill: 'white',
            backgroundColor: MAGICK_CSS_BACKGROUND_COLOR,
            selectable: false
        });

        fabricCanvas.add(floorPointer);
    },

    /**
     * Draws all visible doors of a room 
     * 
     * @param {*} fabricCanvas 
     * @param {*} roomModel 
     * @param {*} roomRenderedRect 
     */
    drawDoors(fabricCanvas, roomModel, roomRenderedRect) {

        if (!fabricCanvas) {
            throw new Exception("Undefined fabricCanvas");
        }

        if (!roomModel) {
            throw new Exception("Undefined roomModel");
        }

        if (!roomRenderedRect) {
            throw new Exception("Undefined roomRenderedRect");
        }

        if (!fabricCanvas instanceof fabric.Canvas) {
            throw new Exception("Canvas object must be a instance of fabric.Canvas");
        }

        const passageRenders = [];
        const doorRenders = [];
        const offset = 100;
        let startX;
        let startY;

        //Draw all doors here
        for (const room of roomModel.adjacentRooms) {

            switch (DoorPosition[room.side]) {
                case DoorPosition.Floor: {

                    startX = roomRenderedRect.left * 0.99;
                    startY = roomRenderedRect.top + roomRenderedRect.height * 1.45;

                    passageRenders.push(this.getLine(startX, startY, startX, startY + offset));
                    doorRenders.push(this.getClickableCircle(startX, startY + offset));
                    break;
                }
                case DoorPosition.Cieling: {

                    startX = roomRenderedRect.left * 0.99;
                    startY = roomRenderedRect.top

                    passageRenders.push(this.getLine(startX, startY, startX, startY - offset));
                    doorRenders.push(this.getClickableCircle(startX, startY - offset));
                    break;
                }
                case DoorPosition.North: {

                    startX = roomRenderedRect.left + roomRenderedRect.width * (0.4);
                    startY = roomRenderedRect.top + roomRenderedRect.height * (0.4);

                    passageRenders.push(this.getLine(startX, startY, startX + offset, startY - (offset / 2)));
                    doorRenders.push(this.getClickableCircle(startX + offset, startY - (offset / 2)));
                    break;
                }
                case DoorPosition.East: {

                    startX = roomRenderedRect.left + roomRenderedRect.width * (0.4)
                    startY = roomRenderedRect.top + roomRenderedRect.height

                    passageRenders.push(this.getLine(startX, startY, startX + offset, startY + (offset / 2)));
                    doorRenders.push(this.getClickableCircle(startX + offset, startY + (offset / 2)));
                    break;
                }
                case DoorPosition.South: {

                    startX = roomRenderedRect.left - roomRenderedRect.width * (0.45)
                    startY = roomRenderedRect.top + roomRenderedRect.height;

                    passageRenders.push(this.getLine(startX, startY, startX - offset, startY + (offset / 2)));
                    doorRenders.push(this.getClickableCircle(startX - offset, startY + (offset / 2)));
                    break;
                }
                case DoorPosition.West: {

                    startX = roomRenderedRect.left - roomRenderedRect.width * (0.4)
                    startY = roomRenderedRect.top + roomRenderedRect.height * (0.4);

                    passageRenders.push(this.getLine(startX, startY, startX - offset, startY - (offset / 2)));
                    doorRenders.push(this.getClickableCircle(startX - offset, startY - (offset / 2)));
                    break;
                }

            }

        }

        passageRenders.forEach(p => fabricCanvas.add(p));
        doorRenders.forEach(d => fabricCanvas.add(d));

    },

    /**
     * 
     * @param {*} startX 
     * @param {*} startY 
     * @param {*} endX 
     * @param {*} endY 
     * @returns fabric.Line with arguments as coordinates
     */
    getLine(startX, startY, endX, endY) {
        return new fabric.Line(
            [
                startX,
                startY,
                endX,
                endY,
            ],
            {
                strokeWidth: 5,
                stroke: 'white',
                fill: 'transparent',
                selectable: false
            })
    },

    /**
     * 
     * @param {*} startX 
     * @param {*} startY 
     * @param {*} endX 
     * @param {*} endY 
     * @returns fabric.Line with arguments as coordinates
     */
    getClickableCircle(x, y, clickCallback) {
        const circle = new fabric.Circle({
            left: x,
            top: y,
            radius: 20, 
            fill: MAGICK_CSS_BACKGROUND_COLOR,
            strokeWidth: 5,
            stroke: 'white',
            originX: 'center',
            originY: 'center',
            hoverCursor: 'pointer',
            selectable: false
        });

        circle.on('mousedown', function () {
            console.log('open door down');
        });


        return circle;
    }
}