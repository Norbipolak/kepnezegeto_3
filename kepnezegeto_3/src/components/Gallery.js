import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Gallery() {
    const [index, setIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(1);
    const [direction, setDirection] = useState("");
    const [images, setImages] = useState([
        {
            title: "Kép 1",
            src: require("../images/image1.jpg")
        },
        {
            title: "Kép 2",
            src: require("../images/image2.jpg")
        },
        {
            title: "Kép 3",
            src: require("../images/image3.jpg")
        },
        {
            title: "Kép 4",
            src: require("../images/image4.jpg")
        }
    ]);
    const [disabledBtns, setDisabledBtns] = useState(false);
    const [titleHided, setTitleHided] = useState(false);

    const nextImg = useRef();
    const currentImg = useRef();

    const forward = (nextIndex = -1) => {
        setDisabledBtns(true);
        nextImg.current.classList.remove("right-100p");
        nextImg.current.classList.remove("left-100p")
        currentImg.current.classList.add("prev-image-forward");
        nextImg.current.classList.add("current-image-forward");
        setDirection("forward");

        setTimeout(() => {
            if(index < images.length - 1) {
                if(nextIndex === -1) {
                    setIndex(i => ++i);
                } else {
                    setIndex(nextIndex);
                }
            } else {
                setIndex(0);
            }
            nextImg.current.classList.add("left-100p");
            currentImg.current.classList.remove("prev-image-forward");
            nextImg.current.classList.remove("current-image-forward");
            setDisabledBtns(false);
        }, 1000);
    };

    const backward = (nextIndex = -1) => {
        nextImg.current.classList.remove("right-100p");
        nextImg.current.classList.remove("left-100p");
        currentImg.current.classList.add("prev-image-backward");
        nextImg.current.classList.add("current-image-backward");
        setDirection("backward");

        setTimeout(() => {
    
            if(index > 0) {
                if(nextIndex === -1) {
                    setIndex(i => --i); 
                } else {
                    setIndex(nextIndex);
                }
            } else {
                setIndex(images.length-1);
            }
            nextImg.current.classList.add("right-100p");
            currentImg.current.classList.remove("prev-image-backward");
            nextImg.current.classList.remove("current-image-backward");
        }, 1000);
    };

    useEffect(() => {
        if(direction === "forward") {
            if(index < images.length-1) {
                setNextIndex(index+1);
            } else {
                setNextIndex(0);
            } 
        } else {
            if(index > 0) {
                setNextIndex(index-1);
            } else {
                setNextIndex(images.length-1);
            }
        }
    }, [index]);

    useEffect(() => {
        if(direction === "forward") {
            if(index < images.length-1) {
                setNextIndex(index+1);
            } else {
                setNextIndex(0);
            } 
        } else {
            if(index > 0) {
                setNextIndex(index-1);
            } else {
                setNextIndex(images.length-1);
            }
        }
    }, [direction]);

    const pointImgChange = (i)=> {
        if(i < index) {
            backward(i)
        } else if(i > index) {
            forward(i);
        }
    }

    return (
        <div className="img-gallery">
            <div className="title-holder" style={{top:!titleHided ? 0 : "-32px"}}>
                {images[index].title}
            </div>
            <div className="hide-show-title" style={{top:!titleHided ? "32px" : "0"}}
            onClick={()=>setTitleHided(!titleHided)}>
                    <FontAwesomeIcon icon={"fa solid " + (!titleHided ? "fa-chevron-up" : "fa-chevron-down")} /> 
            </div>
            <img ref={currentImg} className="pos-absolute" src={images[index].src} />
            <img ref={nextImg} className="left-100p pos-absolute" src={images[nextIndex].src} />

            <div className="right-icon" onClick={!disabledBtns ? ()=>forward() : ()=>{}}>
                <FontAwesomeIcon icon="fa-solid fa-circle-right" />
            </div>
            <div className="left-icon" onClick={!disabledBtns ? ()=>backward() : ()=>{}}>
                <FontAwesomeIcon icon="fa-solid fa-circle-left" />
            </div>

            <div className="img-counter" style={{width:(25 *images.length) + "px"}}>
                {
                    images.map((img, i)=> 
                        <div className="point" onClick={()=> pointImgChange(i)}
                    style={{background: i === index ? "black" : ""}} ></div>
                    )
                }
            </div>
        </div>
    );
}

export default Gallery;

/*
Gyakorlatilag két képet cserélgetünk itt, hogy azt a hatást keltsük, hogy mintha egy szalag lenne és átpörögnének egymáson

Csak annyit csinálunk, hogy be van a kép bal oldalon vagy ha visszafele pörgetünk, akkor jobb oldalon, de overflow: hidden-vel!
ha előre megyünk, akkor a jelenlegi kép az fogja magát és jobbra bemegy, a következő kép az szintén balról jobbra, az elöző kép helyére 
és most már látható lesz!! 

és amikor ez az animáció lejátszodott, akkor leváltjuk a képeket, az indexekkel és visszahelyezzük hirtelen az eredeti pozicióban ha már 
megtörtént a képcsere, ami azt jelenti, hogy úgy néz ki, mintha ilyen végtelen dolog lenne 

Amit még meg kellene csinálni, hogy most bevillan valami, amikor betöltödik a kép, a mögötte lévő kép
és erre egy megoldás lehet, hogy a z-indexet beállítjuk 

De viszont azért furcsa ez a villanás, mert nem kéne, hogy egy pozicióban legyenek 
***
Most meg van adva mondkét osztály a ennek a div-nek a right meg a leftp100-as is és mindegyik a forward meg a backward függvényben is 
amikor bemegyünk, akkor remove-olni kell mindkét class-t 
->
    const forward = () => {
        currentImg.current.classList.add("prev-image-forward");
        nextImg.current.classList.add("current-image-forward");
        nextImg.current.classList.remove("right-100p");
        nextImg.current.classList.remove("left-100p")

Meg lehet, hogy az a probláma, hogy hol adjuk hozzá a left-et meg a right-ot, amikor lefutott a képcsere 
mert most azután adtuk hozzá, hogy remove-oltuk a prev-image-forward meg ezeket a class-okat, amelyek megcsinálják az animációt 
-> 
    const forward = () => {
        nextImg.current.classList.remove("right-100p");
        nextImg.current.classList.remove("left-100p")
        currentImg.current.classList.add("prev-image-forward");
        nextImg.current.classList.add("current-image-forward");
        setDirection("forward");

        setTimeout(() => {
            if(index < images.length - 1) {
                setIndex(i => ++i);
            } else {
                setIndex(0);
            }
            nextImg.current.classList.add("left-100p");
            currentImg.current.classList.remove("prev-image-forward");
            nextImg.current.classList.remove("current-image-forward");
        }, 1000);

Tehát itt a setTimeout-ban történt a csere, hogy a classList.add-os most elöbb lett, mint a remove-osak 

De ez sem oldja meg a problémánkat, megpróbáljuk az z-indexes dolgot meg előtte egy opacity-s dolgot, amit megadunk, hogy amikor még nincsen 
csere, akkor legyen opacity 1, de viszont ha már megtörtént, akkor legyen opacity 0 az a kép ami bejön, tehát a nextImage-nek adjuk meg 
ezt egy style-val a forward függvényben csináljuk ezt 
->
    nextImg.current.style.opacity = 1;
    setDirection("forward");

    setTimeout(() => {
        if(index < images.length - 1) {
            setIndex(i => ++i);
        } else {
            setIndex(0);
        }
        nextImg.current.style.opacity = 0;
        nextImg.current.classList.add("left-100p"); 
    
De ez sem volt jó megoldás, megprobáljuk, hogy egy minimálisat késleltetnénk, hogy levegyük az osztályokat 
-> 

        setTimeout(() => {
            if(index > 0) {
                setIndex(i => --i);
            } else {
                setIndex(images.length-1);
            }
            nextImg.current.classList.add("right-100p");

            setTimeout(() => {
                currentImg.current.classList.remove("prev-image-backward");
                nextImg.current.classList.remove("current-image-backward");
            }, 50);
        }, 1000);
    };

Ez sem jó, de viszont itt az időzítésekkel lesz a probléma!!! 
mert animation, ami meg van adva a class-oknak pl. a .current-image-forward ott is az animation-duration az 1s, mint itt a setTimeout 
a megoldás, hogy egy kicsit kevesebb lesz az animation és amikor beér, akkor egy nagyon kis időt várunk, hogy kicserélje a képet és levegye 
az osztályt 
-> 
.current-image-backward {
    animation-name: setToCurrentBackward;
    animation-duration: 0.9s;
    left: 100%;
}

.prev-image-backward {
    animation-name: setToPreviousBackward;
    animation-duration: 0.9s;
    left: 0;
}

ezért itt a style-ban mind a 4 osztályt, ami ezt az animációt csinálja átírjuk, hogy csak 0.9s legyen az animation-duration!!! 

Ahogy levesszük ezeket az animation class-eket, akkor egy pillanatra visszaáll az eredeti állapotba, amikor még nem váltottuk át 
és ha ez kevesebb idő alatt fut le, akkor van ennek ideje golndolkodni 

tehét 0.1s-val kevesebb idejig fut le az animáció és csak utána vesszük az animációhoz tartozó class-eket!!!!!! 
Nem lehet ugyananyi mindkettő, mert nem tud teljesen pontosan váltani, időzíteni!! 
******
Egy másik probléma, mi van ha megnyomjuk gyorsan egymás után a gombot!! akkor nem tudja követni és 
erre a megoldás, hogy egy olyan védelmet berakunk, hogy addig amíg vált, addig letiltani a gombot vagyis ikont 
Csinálunk egy ilyen useState-s változót, hogy disabledBtns 
-> 
const [disabledBtns, setDisabledBtns] = useState(false);
és alapból false-on van de ha megnyomjuk bármelyik gombot, akkor már az elején az lesz, hogy true 
majd a legvégén, amikor már lefutott minden, akkor azt mondjuk, hogy újra legyen false!!! 
->
    const forward = () => {
        setDisabledBtns(true);
        nextImg.current.classList.remove("right-100p");
        nextImg.current.classList.remove("left-100p")
        currentImg.current.classList.add("prev-image-forward");
        nextImg.current.classList.add("current-image-forward");
        setDirection("forward");

        setTimeout(() => {
            if(index < images.length - 1) {
                setIndex(i => ++i);
            } else {
                setIndex(0);
            }
            nextImg.current.classList.add("left-100p");
            currentImg.current.classList.remove("prev-image-forward");
            nextImg.current.classList.remove("current-image-forward");
            setDisabledBtns(false);
        }, 1000);
    };

tehát az elején true, a végén false lesz a disabledBtns, persze ezt teljesen ugyanígy be kell állítani a másik backward függvényre!!! 

Nagyon fontos, hogy megadjuk az ikonnak (return-ben), van egy olyan attributum, hogy disabled és akkor attól függően, hogy mi lesz majd a useState-s
állapotváltozónak az értéke, ez disabled true vagy false lesz!!!! 
-> 
    <div className="right-icon" disabled={disabledBtns ? true : false}
    onClick={() => forward}>
        <FontAwesomeIcon icon="fa-solid fa-circle-right" />
    </div>

Tehát ha disabledBtns az true, akkor ez is legyen true és tiltsa le, de viszont ha az false, akkor ez is legyen false és ne tiltsa le!!! 
Ezt megadjuk ugye a másik ikonnak is!!! 

Tehát, hogy amig vár, addig ne lehessen megnyomni, illetve meg lehet nyomni de nem fog semmit érni, mert nem érzékeli, nem fog lefutni ott semmi

De ez nem lesz jó, mert ez a disabled ez müködik gombok esetében, de viszont itt nekünk egy ikon van és arra ez nem jó!!!!! 

De a függvényekkel is meg lehet ezt oldani, itt ahol a onClick-re itt lefut vagy a forward vagy backward függvény, attól függően, hogy melyik ikon
-> 
onClick={() => forward}
ez lesz belőle
-> 
onClick={!disabledBtns ? ()=>forward() : ()=>{}}>

Tehát ha a disabledBtns az false, akkor fusson le a forward függvény és tudjuk váltani, de viszont ha disabledBtns az true, akkor csak egy üres 
arrow function fusson le és akkor ugy nem fog történni semmi!!! 
Backward-nál ugyanez 

Ez egy nagyon jó megoldás, hogyha nem akarjuk, hogy valami lefusson, akkor létrehozunk egy useState-s true vagy false változót 
és ha true, akkor lefutatjuk amit szeretnénk, de viszont ha false, akkor meg egy üres arrow function-t!!!!!!!!!!
*****
Van még egy probléma, ha rákattitunk a képre, akkor az egész kép kék lesz, ezzel jelzi, hogy ki van jelölve, de viszont ezt nem szeretnénk
erre van egy css property, ez lesz a user-select, aminek itt none-nak kell hogy legyen 

és akkor van itt ez az img-nek kell megadni ezt a user-select: none-t 
->
img{
    -khtml-user-select: none;
    -o-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
}

és akkor ezt így bemásoljuk a style-ba!!!!! 

de ugyanezt talán meg lehet oldani a :focus-os dologgal is, hogy outline ott nulla legyen 
valami ilyesmi is megoldás erre 
->
        img {
            user-select: none;   Prevent text selection 
            -webkit-user-drag: none;  Prevent image dragging in WebKit browsers 
            -moz-user-drag: none;  Prevent image dragging in Mozilla browsers 
            -ms-user-drag: none;   Prevent image dragging in Microsoft browsers 
            outline: none;
        }

        img:focus {
            outline: none;
        }

és akkor ezért jobb a második, mert ezzel meg lehet oldani a drag and drop-os dolgot, hogy ne tudjuk elvinni a képet a helyéről!!!! 
******
azt oldjuk meg, hogy kiírjuk, hogy hány kép van összesen és, hogy éppen hányadik képnél tartunk 
Ehhez kell két dolog, hogy hányadik indexű képen vagyunk és, hogy összesen mennyi van az meg az images.length!!! 

És nagyon fontos, hogy index az nulláról indul, tehát itt mindig az index+1-diket írjuk ki 
-> 
    <div className="img-counter">
        {index+1}/{images.length}
    </div>

ez még nem is fog látszani, de adunk egy stíluskészletet a img-counter-nek 
-> 
.img-counter {
    width: 60px;
    //itt nem is adunk meg egy height-ot inkább kap helyette egy padding-et 
    padding: 5px;
    text-align: center;
    background-color: rgba(255,255, 255, 0.8);
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    bottom: 15px;
    border-radius: 4px;
}

fontos, hogy legyen egy width-je, meg adhatunk neki egy padding-et is, ugyanigy lehet, hogy adunk neki egy background-color-t 
fontos, hogyha azt akarjuk, akkor az rgba-t használjuk, mert itt be lehet állítani egy alpha-t is, tehát az opacity-t 
text-align: center kell, mert akkor középen lesz majd, hogy 1/4 
és ahhoz, hogy ezt a img-counter-t ezt a képre tudjuk majd helyezni, a kép az egy position: relative 
ennek meg megadunk egy position: absolute-ot 
és hogy hol helyezkedjen el, horizontálisan 3 dologgal tudjuk középre helyezni 
->
left: 0, right: 0, margin: auto;
és még, hogy egy kicsit felette legyen a kép aljától, ezért megadunk neki egy bottom: 15px-t, fontos, hogyha bottom: -15px-t 
adtunk volna meg neki akkor nem a képen lett volna 15px-re az aljától felfele, hanem nem a képen 15px-vel lejjebb 
******
és még azt is megcsináljuk, hogy a képeknek címet adunk, tehát az is hasonló lesz, mint ez csak kiírjuk, hogy mi a kép címe 
itt pl. csak annyi, hogy kép-1 utána váltunk, akkor kép-2 

Csak az a kérdés, hogy hova tesszük ezt majd, mert most az van alul, amit elöbb csináltunk 

Meg az adatszerkezetet egy kicsit módosítjuk, hogy az images az nem csak az elérési útvonalat kapja meg 
hanem objektumok lesznek ebben a tömbben amiben az elérési útvonal mellett van egy title is amit majd itt meg fogunk csinálni 
tehát ebből
->
    const [images, setImages] = useState([
        require("../images/image1.jpg"),
        require("../images/image2.jpg"),
        require("../images/image3.jpg"),
        require("../images/image4.jpg")
    ]);
lesz majd ez 
-> 
    const [images, setImages] = useState([
        {
            title: "Kép 1",
            src: require("../images/image1.jpg")
        },
        {
            title: "Kép 2",
            src: require("../images/image2.jpg")
        },
        {
            title: "Kép 3",
            src: require("../images/image3.jpg")
        },
        {
            title: "Kép 4",
            src: require("../images/image4.jpg")
        }
    ]);

és fontos, hogy néhány helyen ahol hívatkoztunk erre ott már máshogy kell pl. itt 
-> 
<img ref={currentImg} className="pos-absolute" src={images[index]} />
<img ref={nextImg} className="left-100p pos-absolute" src={images[nextIndex]} /
-> 
<img ref={currentImg} className="pos-absolute" src={images[index].src} />
<img ref={nextImg} className="left-100p pos-absolute" src={images[nextIndex].src} /

és itt az src-ben majd az images.src-t fogjuk megjeleníteni!!!!!!!! 

megcsináljuk a return-ben felülre a dolgokat, lesz egy div ami kep egy title-holder class-t és ebbe lesz majd benne a title
a title-hodler fent egy fekete csík lesz 
.title-holder {
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    width: 100%;
    top: 0;
    left: 0;
    //kap egy left: 0 meg top:0 hogy biztos, hogy ott legyen felül!
    padding: 5px;
    position: absolute;
    z-index: 1; //mert alapból bent van a kép alatt 
    text-align: center;
}

ez meg a return-ben ahogy megjelenítjük
->
<div className="title-holder">
    {images[index].title}
</div>
******
még azt lehetne megcsinálni, nagyon jó ötlet, hogy van egy le-felfele (ez majd változni fog attól függően, hogy mutatjuk-e a dolgokat vagy sem)
nyíl és akkor azzal el lehet majd tüntetni ezt a title-t 
->
library.add(
    faCircleRight, faCircleLeft, faChevronUp, faChevronDown
);

<div className="title-holder">
    {images[index].title}
    <div className="hide-show-title">
        <FontAwesomeIcon icon="fa-solid fa-chevron-up" /> 
    </div>
</div>

Beraktuk ide az alá, ahol megjeletjük a title-t és adtunk neki egy class-t a div-nek amiben beleraktuk
->  
.hide-show-title {
    position: absolute;
    bottom: -22px;
    background-color: rgba(0, 0, 0, 0.645);
    color: white;
    left: 0;
    right: 0;
    margin: auto;
    width: 20px; //lesz neki egy width-je, hogy ez ne a 100%-ot vegye fel, hanem csak 20px-es lesz 
    cursor: pointer;
}

és majd attól fog függeni, hogy chevron up vagy chevron down lesz, hogy csinálunk egy useState-s változót és true vagy false 
tehát azt mondja meg hogy hided vagy nem és akkor ha hided akkor megkapja a down, másik esetben pedig a up-ot!! 
-> 
const [titleHided, setTitleHided] = useState(false);

2 dolog van
1. az egész title-holder-es nek meg kell adni, hozzáfüzni class-ban, hogyha ez a titleHided az true, akkor legyen d-none
itt nem kell a ? : lehet csak egy &&!!!! 

div className={"title-holder " + (titleHided && d-none)}>
ami nagyon fontos, hogy ilyenkor a className-t, az egészet bele kell rakni egy {}-be és majd ahol több dolog lesz azt meg egy ()-be!!!! 

egy onClick-vel pedig megadjuk, hogy set-elje a titleHided-ot mindig az ellenkezőére 
->
onClick={()=>setTitleHided(!titleHided)}>
-> 
    <div className={"title-holder " + (titleHided && d-none)}>
        {images[index].title}
        <div className="hide-show-title" onClick={()=>setTitleHided(!titleHided)}>
            <FontAwesomeIcon icon="fa-solid fa-chevron-up" /> 
        </div>
    </div>

Most az a probléma, hogy ez a fontawesome-os ikon is el fog tünni, mert benne van abba a div-be, aminek megadtuk a d-none-os osztályt 
Kiszedjük belőle és alá rakjuk 
->
    <div className={"title-holder " + (titleHided && d-none)}>
        {images[index].title}
    </div>
    <div className="hide-show-title" onClick={()=>setTitleHided(!titleHided)}>
        <FontAwesomeIcon icon="fa-solid fa-chevron-up" /> 
    </div>

nagyon fontos, mert így most méshogy fog viszonyulni az egész img-gallery-hez és nem az kell, hogy bottom, hanem egy kicsit nagyobb top, mint 
ahol megjelenítjük a title-t!!! 
ez nagyon fontos!!! 
és majd ennek a pozicióját is meg kell változtatni, mert a top valamiről ha eltünik a title, akkor top: 0 kell, hogy legyen 

.hide-show-title {
    position: absolute;
    top: 32px;
    background-color: rgba(0, 0, 0, 0.645);
    color: white;
    left: 0;
    right: 0;
    margin: auto;
    width: 20px; //lesz neki egy width-je, hogy ez ne a 100%-ot vegye fel, hanem csak 20px-es lesz 
    cursor: pointer;
    text-align: center;
}

meg azt is meg kell változtatni, hogy amikor el van tünve a title, akkor a down ikon kell majd, ha meg látható, akkor meg az up 
Így oldjuk meg, hogy változzon az ikon!!! 
->
<FontAwesomeIcon icon={"fa solid " + (!titleHided ? "fa-chevron-up" : "fa-chevron-down")} /

azt hogy lemenjen azt meg csak egy style-val tudjuk itt megoldani
->
style={{top:titleHided ? "32px" : "0"}}
-> 
        <div className="img-gallery">
            <div className={"title-holder " + (titleHided && d-none)}>
                {images[index].title}
            </div>
            <div className="hide-show-title" style={{top:!titleHided ? "32px" : "0"}}
            onClick={()=>setTitleHided(!titleHided)}>
                    <FontAwesomeIcon icon={"fa solid " + (!titleHided ? "fa-chevron-up" : "fa-chevron-down")} /> 
            </div>

Megadtunk egy transition-t neki 

.hide-show-title {
    position: absolute;
    top: 32px;
    background-color: rgba(0, 0, 0, 0.645);
    color: white;
    left: 0;
    right: 0;
    margin: auto;
    width: 20px; //lesz neki egy width-je, hogy ez ne a 100%-ot vegye fel, hanem csak 20px-es lesz 
    cursor: pointer;
    text-align: center;
    transition: all 1s ease;
}

de az baj, hogy ezt a display: none-nál nem csinálja jól emiatt -> (titleHided && d-none)}>

de a d-none helyett megadunk style-val 
egy olyat, hogy nem titleHided akkor legyen top: 0 mint alapból ha viszont titleHided akkor menjen fel 32px-t 
mert akkora ez az egész és akkor felette lesz, de nem fog látszani az overflow: hidden miatt 
-> 
<div className="title-holder" style={{top:!titleHided ? 0 : "-32px"}}>

de viszont ezt be kell rakni a másiknak is, mert akkor az is ha bármit csinál, akkor ilyen transition-nal fog megjelenni 
->
.title-holder {
    background-color: rgba(0, 0, 0, 0.645);
    color: white;
    width: 100%;
    top: 0;
    left: 0;
    //kap egy left: 0 meg top:0 hogy biztos, hogy ott legyen felül!
    padding: 5px;
    position: absolute;
    z-index: 1; //mert alapból bent van a kép alatt 
    text-align: center;
    transition: all 0.4s ease;
}

.hide-show-title {
    position: absolute;
    top: 32px;
    background-color: rgba(0, 0, 0, 0.645);
    color: white;
    left: 0;
    right: 0;
    margin: auto;
    width: 20px; //lesz neki egy width-je, hogy ez ne a 100%-ot vegye fel, hanem csak 20px-es lesz 
    cursor: pointer;
    text-align: center;
    transition: all 0.4s ease;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    //ezzel meg az alsó radius-t lehet beállítani!!! 
    font-size: 12px;
    //ezzel tudjuk beállítani, hogy kisebb legyen az egész, mert nincs megadva semmi height, szóval ennek a font-size-ja fogja meghatározni 
    //hogy milyen magas legyen az egész 

Most a title-holder és a hide-show-title-re is kell egy transition!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
és akkor együtt mozog mindkettő!! 
******
megcsináljuk azt, hogy vannak pontok a kép alatt és mindig az lesz kijelölve, amelyiken rajta vagyunk 
ugye annyi pont kell amennyi kép van és majd index alapján fogunk kijelölni!!! 

most az img-counter-ben ahol csak megjelenítjük, hogy hol vagyunk azt fogjuk majd átalakítani erre 

és akkor majd ebbe lesznek a pontok, de majd fontos, hogy egymás mellett legyenek, ezért majd az img-counter az display: flex kell hogy legyen 
és justify-content pedig space-evenly!!!
->
    <div className="img-counter">
        <div className="point"></div>
    </div>

de ez majd más lesz itt egy map-val végigmegyünk a images-en és azon belül fogjuk elkészíteni ezt a div-et className point-osat és 
majd annyit amennyi indexe van az images tömbnek!!! 
-> 
.point {
.img-counter {
    width: 60px;
    //itt nem is adunk meg egy height-ot inkább kap helyette egy padding-et 
    padding: 5px;
    text-align: center;
    background-color: rgba(255,255, 255, 0.8);
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    bottom: 15px;
    border-radius: 4px;
    display: flex;  !!!
    justify-content: space-evenly; !!!
}

.point {
    background-color: rgba(72, 72, 72, 0.7);
    width: 15px;
    height: 15px;
    border-radius: 15px;
    //ha akkora a radius, mint a width meg a height, akkor lesz ez egy kör!!!
    cursor: pointer; 
}

Akkor itt annyi pötty kell, amennyi elem van -> map
majd a szélességet ugy kell megadni, hogy itt kiszámoljuk egy style-ban, mert a 60px, ami meg volt adva az img-counter-nek!! 
-> 
<div className="img-counter" style={{width:(25 *images.length) + "px"}}>
-> 
            <div className="img-counter" style={{width:(25 *images.length) + "px"}}>
                {
                    images.map((img, i)=> 
                        <div className="point"></div>
                    )
                }
            </div>

és itt az lesz a lényeg, hogy melyik lesz kijelölve, ezt is megadjuk style background-nak 
itt nagyon fontos, hogy itt vannak i-k meg van index-ek is egy useState-s változóban és ha ezek egyenlőek, akkor 
az kap egy másfajta háttérszínt!!! 
->
    {
        images.map((img, i)=> 
            <div className="point" style={{background: i === index ? "black" : ""}} ></div>
        )
    }
és ha ez megegyezik, akkor fekete lesz háttérszín, amugy meg semmi és marad az eredeti!! 
**
Azt is szeretnénk, hogy rákattintunk egy pötty-re, akkor arra a képre menjen rá!!! 
ezt úgy tudjuk, hogy point-ra rakunk egy onClick-et és a setIndex-nek megadjuk az i-t!!!!!! 
->
    images.map((img, i)=> 
        <div className="point" onClick={()=> setIndex(i)}
        style={{background: i === index ? "black" : ""}} ></div>
    )
    
így rá is megy a képre, csak az a baj, hogy így az animáció az nem fog lejátszodni!!!! 
hanem csak simán odaváltja, mert itt csak az index módosul!!! 
Tehát itt ami nem fut le az a forward meg a backward függvény!!! 

csinálunk egy pointImgChange függvényt erre ami kér egy i-t, amit majd meghívásnál megadunk!!! 

const pointImgChange = (i)=> {
        
}

de ehhez a forward meg backward-nál is kell megadni egy olyan paramétert, amit nem kell kötelezően megadni!!! 
->
    const forward = (nextIndex = -1) => {
        setDisabledBtns(true);
        nextImg.current.classList.remove("right-100p");
        nextImg.current.classList.remove("left-100p")
        currentImg.current.classList.add("prev-image-forward");
        nextImg.current.classList.add("current-image-forward");
        setDirection("forward");

        setTimeout(() => {
            if(index < images.length - 1) {
                if(nextIndex === -1) {  itt ezt hozzáadtuk 
                    setIndex(i => ++i);
                } else {
                    setIndex(nextIndex); meg ezt is 
                }
            } else {
                setIndex(0);
            }

és itt biztos, hogy léteznek majd ezek az indexek, mert ezek a map-ből származnak!!!! 
ugyanezt megoldjuk a backward-nál is 

Tehát itt azt csináltuk, hogyha a nextIndex az minusz egy, tehát nem létezik, akkor menjen úgy mint eddig, de ha viszont van ilyen 
index, akkor meg setIndex-nek megadjuk és akkor oda megy majd 

pointImgChange-nél meg azt nézzük meg, hogy amennyiben az i az kisebb, mint az index-ünk, tehát ha hátrafele lépünk akkor 
meg kell hívni a backward-ot és megadjuk neki az i-t!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
else if-ben pedig a forward-ot és ugyanúgy megadjuk neki az i-t 
és különben nem csinálunk semmit, mert ha ugyanarra akar lépni, akkor ott marad és kész!!!  
->
    const pointImgChange = (i)=> {
        if(i < index) {
            backward(i)
        } else if(i > index) {
            forward(i);
        }
    }

és akkor onClick-re meg a pointImgChange fusson le!!! 
-> 
    images.map((img, i)=> 
        <div className="point" onClick={()=> pointImgChange(i)}
        style={{background: i === index ? "black" : ""}} ></div>
    )

ez még így nem jó azért mert a setNextIndex-et mindig úgy állítjuk be, hogy index+1 legyen 
de nem feltétlen ez kell mert lehet ez az index is ami itt van onClick={()=> pointImgChange(i), tehát az i!! 

Úgy kéne megcsinálni a két useEffect-et, hogy az egyik most a direction-t nézi a másik meg az index-et!! 
és ezek gyakorlatilag egymás másolatai az a két useEffect

de ezt így nem is lehet megoldani!!! 

*/

