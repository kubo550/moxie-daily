import {Quote} from "../components/Quote.tsx";
import {useState} from "react";
import {ShopRef} from "../components/ShopRef.tsx";

export const Affirmation = () => {
    const [quote] = useState('I am capable, confident, and resilient. Each step I take brings me closer to my dreams.')

    return (
        <div>
            <Quote text={quote} />
            <ShopRef />
        </div>
    );
}