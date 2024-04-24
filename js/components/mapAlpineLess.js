
let canvasRef

const rendererEvent = () => {

    //Cleanup of previous canvas
    if (canvasRef) {
        canvasRef.dispose();
        canvasRef = null;
    }

    const roomToDraw = Alpine.store("currentRoom");

    //If there is a room to draw
    if (roomToDraw) {
        canvasRef = new fabric.Canvas('roomCanvas', {
            width: 400,
            height: 400,
            fireRightClick: true,  // <-- enable firing of right click events
        });

        // Zoom handling
        canvasRef.on('mouse:wheel', function (opt) {
            const delta = opt.e.deltaY;
            let zoom = canvasRef.getZoom();
            zoom *= 0.999 ** delta;
            if (zoom > 20) zoom = 20;
            if (zoom < 0.01) zoom = 0.01;

            canvasRef.setZoom(zoom);

            opt.e.preventDefault();
            opt.e.stopPropagation();
        });

        //Pan handling
        canvasRef.on('mouse:down', function (opt) {
            const evt = opt.e;
            // Left click 
            if (evt.button === 2) {
                this.isDragging = true;
                this.selection = false;
                this.lastPosX = evt.clientX;
                this.lastPosY = evt.clientY;
            }
        });

        canvasRef.on('mouse:move', function (opt) {
            if (this.isDragging) {
                const e = opt.e;
                var vpt = this.viewportTransform;
                vpt[4] += e.clientX - this.lastPosX;
                vpt[5] += e.clientY - this.lastPosY;
                this.lastPosX = e.clientX;
                this.lastPosY = e.clientY;
                this.requestRenderAll();
            }
        });

        canvasRef.on('mouse:up', function (opt) {
            this.setViewportTransform(this.viewportTransform);
            this.isDragging = false;
            this.selection = true;
        });

        //Draw room if canvas is ready
        RoomDrawUtils.drawRoom(canvasRef, roomToDraw)
    }
};

