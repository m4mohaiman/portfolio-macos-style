import gsap from 'gsap'
import { Draggable} from "gsap/Draggable";

import { Dock , Welcome ,Navbar } from "#components"
import {Terminal} from "#windows"

gsap.registerPlugin(Draggable);

const App = () => {
    return (
        <main>
            <Navbar></Navbar>
            <Welcome></Welcome>
            <Dock></Dock>
            <Terminal></Terminal>
        </main>
    )
}
export default App
