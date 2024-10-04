import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Button=({onClick,texto})=>{
    return(
        <button class="btn btn-outline-success" type="submit" onClick={onClick} itemType="submit">{texto}</button>
    )
}


export default Button;