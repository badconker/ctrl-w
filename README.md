Ctrl+W
======

UserScript created for Mush, a browser game.
Mush (French) : http://www.mush.vg
Mush (English) : http://mush.twinoid.com
Mush (Spanish) : http://mush.twinoid.es

Initially created by kill0u, now maintained by badconker.

How to install
======

CTRL+W works with Firefox(GreaseMonkey) or Chrome(TamperMonkey).

 - In Firefox, install the [GreaseMonkey](https://addons.mozilla.org/firefox/addon/greasemonkey/) Add-On
 - In Chrome, install the [TamperMonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) extension

After you've added the script, you can install CTRL+W by opening one of the following files :

<ul>
	<li><strong><a href="https://github.com/badconker/ctrl-w/raw/release/CTRLW.user.js">Last stable release (with absolute urls)</a></strong></li>
	<li><a href="https://github.com/badconker/ctrl-w/raw/beta/CTRLW.user.js">Last beta version </a></li>
	<li><a href="https://github.com/badconker/ctrl-w/raw/master/CTRLW.user.js">Last stable release (with relative urls)</a></li>
	<li><a href="https://github.com/badconker/ctrl-w/raw/dev/CTRLW.user.js">Development branch (Pull your requests here please)</a></li>
</ul>

Enjoy!


Translators
======

I you want to help me to translate the script in English and Spanish, you have only to edit the .po file in translations directory with .po editor (like poedit : http://www.poedit.net/)
Thank you. :)



Developers
======

First make sure you have gulp installed - you can install it by running the following commands from the root directory ( provided you have `npm` installed )
```
npm install
npm install gulp-cli -g
```

After making your changes in the `src` folder, build the latest CTRLW.user.js with :
```
gulp
```

Finally submit your PR requests to the `dev` branch.