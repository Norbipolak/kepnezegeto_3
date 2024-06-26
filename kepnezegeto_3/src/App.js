import "./styles/style.scss";
import Gallery from './comonents/Gallery';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown, faChevronUp, faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { faCircleLeft } from "@fortawesome/free-regular-svg-icons";
library.add(
    faCircleRight, faCircleLeft, faChevronUp, faChevronDown
);

function App() {
    return(
        <Gallery/>
    );
}

export default App;
