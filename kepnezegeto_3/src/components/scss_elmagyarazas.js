/*
hogyan lehet compile-olni 

ez egy sima css file 
->

body {
    font-size: 16px;
    color: #333;
  }
  
  .header {
    background-color: #f5f5f5;
    padding: 20px;
  }
  
  .header .title {
    font-size: 24px;
    color: #000;
  }

és így néz ki a scss-es megfelelője, hogy létrehozunk kulcs-értékpárokat és azokat megadjuk a megfelelő helyen 
meg itt meg van a beágyazásra is a példa!!! 
->
$font-size: 16px;
$text-color: #333;
$header-bg: #f5f5f5;
$title-font-size: 24px;
$title-color: #000;

body {
  font-size: $font-size;
  color: $text-color;
}

.header {
  background-color: $header-bg;
  padding: 20px;

  .title {
    font-size: $title-font-size;
    color: $title-color;
  }
}
**********************************************
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
nagyon fontos ezeket kell majd beírni a terminálba 
3 lépés
1. fel kell telepíteni a sass-t -> npm install -g sass 
2. compile-olás -> sass style.scss style.css (az fontos, hogy mi a scss file neve, de viszont azt adunk meg amit akarunk majd a css-nek) 
    mert akkor egy olyan nevű css file-ba fogja lefordítani a scss-es dolgokat!! 
3. watch (ez opcionális, itt alapból lefordítja a scss file-t css file-ra)
    sass --watch style.scss:style.css

de nagyon fontos, hogy ehhez még fel is kell majd telepíteni egy Live Sass Compiler-t!! az extensions-nál!! 
*/
