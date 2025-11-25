import gsap from 'gsap'
import { Draggable} from "gsap/Draggable";

import { Dock , Welcome ,Navbar } from "#components"
import {Terminal , Safari} from "#windows"

gsap.registerPlugin(Draggable);

const App = () => {
    return (
        <main>
            <Navbar></Navbar>
            <Welcome></Welcome>
            <Dock></Dock>
            <Terminal></Terminal>
            <Safari></Safari>
        </main>
    )
}
export default App
