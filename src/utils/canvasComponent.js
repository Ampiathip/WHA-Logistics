import React, { useState, useEffect, Component } from "react";
import clsx from "clsx";
  
export default  class CanvasComponent extends Component {
    state = {
      isDrawing: false,
      // positions: [
      //   {
      //     box: "box1",
      //     x: {
      //       min: "160",
      //       max: "175",
      //     },
      //     y: {
      //       min: "430",
      //       max: "445",
      //     },
      //   },
      //   {
      //     box: "box2",
      //     x: {
      //       min: "170",
      //       max: "185",
      //     },
      //     y: {
      //       min: "440",
      //       max: "450",
      //     },
      //   },
      // ],
    };
  
    canvasRef = React.createRef();
  
    componentDidMount() {
      const canvas = this.canvasRef.current;
      this.context = canvas.getContext("2d");
    }
  
    handleMouseDown = async (event) => {
      this.setState({ isDrawing: true });
      const { offsetX, offsetY } = event.nativeEvent;
      // this.context.beginPath();
      // this.context.moveTo(offsetX, offsetY);
      console.log("handleMouseDown", offsetX, offsetY);
      // await this.setState({
      //   offset: { x: offsetX, y: offsetY },
      // });
      this.props.setOffSet({ x: offsetX, y: offsetY });
      // const clickedBox = this.state.positions.find((box) => {
      //   const xInRange = offsetX >= box.x.min && offsetX <= box.x.max;
      //   const yInRange = offsetY >= box.y.min && offsetY <= box.y.max;
      //   return xInRange && yInRange;
      // });
    };
  
    handleMouseMove = (event) => {
    //   if (!this.state.isDrawing) return;
      const { offsetX, offsetY } = event.nativeEvent;
    //   this.context.lineTo(offsetX, offsetY);
    //   this.context.stroke();
    //   this.setState((prevState) => ({
    //     positions: [...prevState.positions, { x: offsetX, y: offsetY }],
    //   }));
      console.log('handleMouseMove', offsetX, offsetY);
    };
  
    handleMouseUp = () => {
      this.setState({ isDrawing: false });
      console.log("handleMouseUp");
    };
  
    render() {
      const { className } = this.props;
      return (
        <canvas
          ref={this.canvasRef}
          onMouseDown={this.handleMouseDown}
        //   onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
          onTouchStart={this.handleMouseDown}
        //   onTouchMove={this.handleMouseMove}
          onTouchEnd={this.handleMouseUp}
          className={clsx(className.positionAbImg, className.cursorImag)}
        />
      );
    }
}