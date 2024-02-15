import { CSSProperties } from "react";
import React from "react";
import PropTypes from "prop-types";


interface PropsType2 {
    src: string;
    altText?: string;
    imgWrapperStyle?: CSSProperties;
    imgStyle?: CSSProperties;
};


const SquarePhotoCard = (props: PropsType2) => {
    const { src, altText, imgWrapperStyle, imgStyle } = props;

        const defaultStyle = {
        width: "60px",
        height: "62px",
        border: "1px solid #ccc",
        position: "absolute",
        top: "20px",
        left: "20px",
        bottom: "150px",
        borderRadius: "100%",
        cursor: "pointer",
        // objectFit: "cover",
    } as CSSProperties;

    return (
        <div style={imgWrapperStyle ? imgWrapperStyle : undefined}>
            <img
                src={src}
                alt={altText ? altText : ""}
                style={imgStyle ? imgStyle : defaultStyle}
            />
        </div>
    );
};
export default SquarePhotoCard;

