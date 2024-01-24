import { CSSProperties } from "react";
import PropTypes from "prop-types";


interface PropsType  {
    src: string;
    altText?: string;
    imgWrapperStyle?: CSSProperties;
    imgStyle?: CSSProperties;
}


const SquarePhotoCard = (props: PropsType) => {
    const { src, altText, imgWrapperStyle, imgStyle } = props;

        const defaultStyle = {
        width: "50px",
        height: "50px",
        border: "none",
        position: "absolute",
        top: "18px",
        left: "10px",
        bottom: "150px",
        borderRadius: "8px",
        cursor: "pointer",
        objectFit: "cover",
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

