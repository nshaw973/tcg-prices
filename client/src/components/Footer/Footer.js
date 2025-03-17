import React from "react"; 
import backgroundImage from "../../images/background/45-degree-fabric-dark.png";

const Footer = () => {
    return (
        <div className="w-screen h-fit flex flex-col">
            <div className="bg-neutral-800" style={{
                backgroundImage: `url(${backgroundImage})`
            }}>
                <h1 className="text-white">Discord Bot Collection / Daily TCG Prices</h1>
            </div>
        </div>
    )
}

export default Footer;