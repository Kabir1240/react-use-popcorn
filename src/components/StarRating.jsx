import { useState } from "react"
import Star from "./Star"
import PropTypes from "prop-types"

StarRating.propTypes = {
    maxRating: PropTypes.number,
    defaultRating: PropTypes.number, 
    size: PropTypes.number,
    color: PropTypes.string,
    className: PropTypes.string,
    messages: PropTypes.array,
    onSetRating: PropTypes.func,
}

export default function StarRating ({ 
    maxRating = 5,
    defaultRating = 0,
    color = "#FCC419",
    size = 48,
    className = "",
    messages = [],
    onSetRating,
}) {

    const containerStyle = {
        display: "flex",
        alignItems: "center",
        gap: "16px",
    }
    
    const starContainerStyle = {
        display: "flex",
        // gap: "4px",
    }
    
    const textStyle = {
        lineHeight: "1",
        margin: "0",
        color: color,
        fontSize: `${size / 1.5}px`,
    }

    const [rating, setRating] = useState(defaultRating);
    const [tempRating, setTempRating] = useState(0);

    const handleOnRate = (rating) => {
        setRating(rating);
        if(onSetRating) onSetRating(rating);
    }

    return (
        <div style={containerStyle} className={className}>
            <div style={starContainerStyle}>
                {Array.from({ length: maxRating }, (_, i) => (
                    <Star 
                        key={i} 
                        onRate={() => handleOnRate(i + 1)} 
                        full={tempRating >= i + 1 || rating >= i + 1}
                        onHoverIn={() => setTempRating(i + 1)}
                        onHoverOut={() => setTempRating(0)}
                        color={color} />
                ))}
            </div>
            <p style={textStyle}>{messages.length >= maxRating ? messages[tempRating ? tempRating - 1 : rating - 1] 
                    : tempRating || rating || ''}</p>
        </div>
    )
}
