NBA Shot Charts
===
<p align="center">
  <img width="634" alt="nsc-header-github" src="https://github.com/user-attachments/assets/50841c7b-2580-40e7-bbe3-b02a2e08aa7d" />
</p>
<p align="center"> https://www.nbashotcharts.net/ </p>

**NBA Shot Charts** is a React JS website that generates NBA player shot charts. 

A shot chart is a visualization of a player's shooting performance on the court. It shows the location of all the field goals (or shots) attempted by a player over the course of a game (or games). It can be used to analyze player shooting patterns and their effectiveness from specific areas on the floor.

Users enter a player's name and make their game(s) selection which generates a chart of all the player's field goals over that selection period. 

The website is hosted on Vercel with the backend server running with Fly.io. 

Player Selection
---
To choose a player, simply type their name into the search bar and press enter. As you type, a list of names that match your query will be displayed in a drop-down menu. You can click on any name in the menu to make a selection as well.
<p align="center">
  <img width="934" alt="nsc-search" src="https://github.com/user-attachments/assets/5437d3c2-acc5-4282-ab9a-581e27b09732" />
</p>

If you make a typo or misspell a player's name, the website will return the closest match to your query, which can be clicked on.
<p align="center">
  <img width="471" alt="nsc-suggestion" src="https://github.com/user-attachments/assets/803e29a3-b8f3-493b-be08-ffb6f28dbd41" />
</p>

Game Selection
---
There are 4 options for selecting a game:
1. **Recent Games:** Choose from a list of the player's recent games. The list contains all regular season games in which the player appeared in so far.
    <p align="center">
      <img width="1192" alt="nsc-recent-games" src="https://github.com/user-attachments/assets/9aceb110-231f-4ed4-8b5a-48780c9ecb65" />
    </p>

2. **Range of Dates:** Select a range of dates within a single NBA season. The generated chart will display shots from all games played over that time period.
    <p align="center">
      <img width="388" alt="nsc-date-range" src="https://github.com/user-attachments/assets/033ccaa9-7cbc-48f2-9fbf-fa38cacd3627" />
    </p>

3. **Season:** Select a season type (pre-season, regular season, or playoffs) and a season year (e.g. 2024-25). All shots from that season will be displayed.
    <p align="center">
      <img width="392" alt="nsc-season" src="https://github.com/user-attachments/assets/e94d78f4-bc25-476f-8e90-63d491b1edfd" />
    </p>

4. **Game ID:** Enter in a game ID. The NBA assigns every game an ID number which can be found by visiting the official NBA website (https://www.nba.com/). The IDs are located in the URLs for games.
    <p align="center">
      <img width="393" alt="nsc-game-id" src="https://github.com/user-attachments/assets/c24c66b4-e05a-4e1b-9792-4fa6a5a87c61" />
    </p>
    Here's an example of a game ID in a URL:
    <p align="center">
      <img width="900" alt="nsc-game-id" src="https://github.com/user-attachments/assets/b694f4bd-3cf2-4dce-b2a5-c2de7bad5fe8" />
    </p>
  
Viewing Shot Charts
---
There are 2 types of shot charts available:
1. **Makes and Misses Chart:** Displays the location of all field goals attempted over the selection period. A made field goal is represented with a circle and a missed field goal is represneted with an X.
    <p align="center">
      <img width="559" alt="nsc-chart1" src="https://github.com/user-attachments/assets/57ebb496-ff4e-4b5b-b37a-4fd6530eb87b" />
    </p>
2. **Field Goal Percentage vs. League Average chart:** Groups shots into hexagonal bins with each hex containing aggregated values of all shots within that hex. The size of a hex represents how many shots a player takes from that area (the bigger the hex, the more shots they take). The color represents how effecient a player is from that area compared to the league average.
    <p align="center">
      <img width="559" alt="nsc-chart2" src="https://github.com/user-attachments/assets/49046e69-d730-4cf6-bfdc-7ff342cb426a" />
    </p>

Live Demo
---
Here is a demonstration of how the website works.
[Coming soon]

Notes on the API
---
The NBA doesn't have any official docuemntation for their API. The following resource was instrumental to the devlopment of this project: https://github.com/swar/nba_api.

The NBA also blocks certain cloud server IP addresses from accessing its endpoints in deployment. This is a well-documented issue. My solution was to host my backend on Fly.io, which is not on the NBA's blacklist.
