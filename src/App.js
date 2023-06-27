import logo from './logo.svg';
import './App.css';
import Navbar from './component/Navbar';
import Sidebar from './component/Sidebar';
import {useState} from 'react';
import Addnotes from './component/Addnotes';
import Edited from './component/Edited';
import Deleted from './component/Deleted';

function App() {
    const [side, setSide] = useState(false);
    const [action, setAction] = useState(1);
    return (<div className='parent_container'
        style={
            {
                gridTemplateColumns: side ? "2fr 8fr" : ".5fr 8fr"
            }
    }>
        <div className='app_navbar_container'><Navbar SIDE={side}
                SIDEVALUE={setSide}/></div>
        <div className='app_sidebar_container'><Sidebar SIDE={side}
                ACTIONVALUE={setAction}/></div>
        <div className='app_action_container'> {
            action == 1 ? <Addnotes/>: action == 2 ? <Edited/>: <Deleted/>
        } </div>
    </div>);
}

export default App;
