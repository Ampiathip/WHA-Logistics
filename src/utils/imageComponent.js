import React, { useState, useEffect, Component } from "react";
import clsx from "clsx";
export default class ImageComponent extends Component {
    render() {
      const { className, src } = this.props;
      return (
        <img
          src={src}
          alt="Your Image"
          className={className.positionAbImg}
        />
      );
    }
  }
  