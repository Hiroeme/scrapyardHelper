# GMS MapleStory Scrapyard Helper

## Description

Reads a pasted image of Scrapyard Weeklies, and displays the difficult and reroll chances based on source information criteria.

## Source Information

Quest names and difficulty ratings were pulled from

- [u/GyroBallMetagross Google Sheets](https://docs.google.com/spreadsheets/d/1FJcMQHfhsDNsRQW_KhrmR3uyWmudv8e8Y_nY5uawKAg/edit?gid=0#gid=0)
- [StrategyWiki](https://strategywiki.org/wiki/MapleStory/Towns/Scrapyard)
- [Maplestory Wiki](https://maplestorywiki.net/w/Quests/105/(Weekly_Quest)_Haven_Weekly_Mission)

## Motivation

I made this project initially because I found it tedious to look through every Scrapyard quest to determine if I should reroll it. I don't play the game often enough to memorize it enough, so I figured I could create a web application that can streamline the process. It saves me a couple minutes every time I use it!

Also, do let me know if something can be better implemented, because I know I probably did not follow best coding practices. I'm always willing to learn :)

Thank you for understanding!

## Quick Start & Usage

1. Go to the [Maplestory Scrapyard Helper](https://scrapyard-helper.vercel.app/).
2. Open the in-game Scrapyard Quests window.
3. Use the [Windows built-in screenshot feature](https://www.microsoft.com/en-us/windows/learning-center/how-to-screenshot-windows-11).
4. Paste into the helper.
5. Choose which quests you would like to reroll!

## Contributing

If you'd like you contribute, you can fork the repository and open a pull request to the `main` branch!

## To Do List

### Main Quests

- [x] Basic OCR Functionality w/tesseract.js
- [x] Preprocessing Image w/opencv.js
- [x] Fuzzy Search Text With Quests w/fuse.js
- [x] Information
- [x] Verify Quest Names
- [x] Reroll Recommender

### Side Quests

- [x] Basic Styling
- [x] How to Copy and Paste Guide
- [x] Replace opencv.js with an alternative
- [] Dark mode toggle
