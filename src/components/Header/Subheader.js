import React from "react";

export default function Subheader(props) {
    return <div className="w-100 bg-less-dark d-flex flex-row">
        <h5 className="text-light ms-5 mt-1">{props.subheader}</h5>
    </div>
}