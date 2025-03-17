import {Fab, Action} from 'react-tiny-fab';
import {useNavigate, useParams} from "react-router-dom";
import 'react-tiny-fab/dist/styles.css';
import {CiCircleMore} from "react-icons/ci";
import {FaLeaf, FaRunning, FaSmile} from "react-icons/fa";
import {buttonStyle} from "./styles.ts";


const menuOptions = [
    {
        text: 'Affirmation',
        path: '/affirmation',
        icon: <FaSmile/>
    },
    {
        text: 'Motivation',
        path: '/devotional',
        icon: <FaRunning/>
    },
    {
        text: 'Meditation',
        path: '/meditation',
        icon: <FaLeaf/>
    }
];

export const FloatingMenu: React.FC<{ fetchRandomQuote: () => void }> = ({fetchRandomQuote}) => {
    const navigate = useNavigate();
    const {type} = useParams();

    return (
        <>
            <Fab
                style={{
                    position: 'fixed',
                    bottom: '18%',
                    left: '6px',
                    fontSize: '1.5em',
                    zIndex: 10
                }}
                mainButtonStyles={{
                    ...buttonStyle,
                    width: '45px',
                    height: '45px',
                    fontSize: '1em',
                }}
                icon={<CiCircleMore/>}
                alwaysShowTitle={true}
            >
                {menuOptions.map(option => (
                    <Action
                        key={option.path}
                        style={{...buttonStyle}}
                        text={option.text}
                        onClick={() => {
                            if (option.path === `/${type}`) {
                                return fetchRandomQuote();
                            }
                            return navigate(option.path);
                        }}
                    >
                        {option.icon}
                    </Action>
                ))}

            </Fab>
        </>
    );
}