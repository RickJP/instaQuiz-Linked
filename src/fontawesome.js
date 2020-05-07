// import the library
import { library } from '@fortawesome/fontawesome-svg-core';

// import your icons
// regular icons
// npm i -S @fortawesome/free-regular-svg-icons

// solid icons
// npm i -S @fortawesome/free-solid-svg-icons

// brand icons
// npm i -S @fortawesome/free-brands-svg-icons

import { faGem } from '@fortawesome/free-regular-svg-icons';
import { faAdjust, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faAccusoft } from '@fortawesome/free-brands-svg-icons';


library.add(
  faCoffee,
  faAdjust,
  faGem,
  faAccusoft
);