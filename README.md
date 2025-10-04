NBA Shot Charts
===
<p align="center">
  <img width="600" alt="nsc-header-github" src="https://github.com/user-attachments/assets/50841c7b-2580-40e7-bbe3-b02a2e08aa7d" />
</p>
<p align="center"> https://www.nbashotcharts.net/ </p>

**NBA Shot Charts** is a React JS website that generates interactive NBA player shot charts. 

A shot chart is a visualization of a player's shooting performance on the court. It shows the location of all the field goals (i.e., shots) attempted by a player over the course of a game or multiple games. It can be used to analyze player shooting patterns and their effectiveness from specific areas on the floor. NBA shot charts were invented by Kirk Goldsberry, an NBA analyst and NYT best-selling author, in 2012.

To use the website, enter a player's name and select one or more games to generate a chart showing all of their field goal attempts during the selection period.

The website is hosted on Vercel with the backend server deployed on Fly.io. 

Player Selection
---
To choose a player, simply type their name into the search bar and press enter. As you type, a list of names that match your query will be displayed in a drop-down menu. You can click on any name in the menu to make a selection as well.
<p align="center">
  <img width="650" alt="nsc-search" src="https://github.com/user-attachments/assets/5437d3c2-acc5-4282-ab9a-581e27b09732" />
</p>

If you make a typo or misspell a player's name, the website will return the closest match to your query, which can be clicked on.
<p align="center">
  <img width="450" alt="nsc-suggestion" src="https://github.com/user-attachments/assets/803e29a3-b8f3-493b-be08-ffb6f28dbd41" />
</p>

Game Selection
---
There are 4 options for selecting a game:
1. **Recent Games:** Choose from a list of the player's recent games. The list contains all regular season games the player has appeared in so far.
    <p align="center">
      <img width="800" alt="nsc-recent-games" src="https://github.com/user-attachments/assets/9aceb110-231f-4ed4-8b5a-48780c9ecb65" />
    </p>
    <p align="center"><em>In the image above, the NYK @ MIA game has been selected which is why it's outlined in white.</em></p>


2. **Range of Dates:** Select a range of dates within a single NBA season. You can type in the dates or use a Calendar popover to make the selection. The generated chart will display shots from all games played over that time period.
    <p align="center">
      <img width="300" alt="nsc-date-range" src="https://github.com/user-attachments/assets/033ccaa9-7cbc-48f2-9fbf-fa38cacd3627" />
    </p>

3. **Season:** Select a season type (pre-season, regular season, or playoffs) and a season year (e.g., 2024-25). All shots from that season will be displayed.
    <p align="center">
      <img width="300" alt="nsc-season" src="https://github.com/user-attachments/assets/e94d78f4-bc25-476f-8e90-63d491b1edfd" />
    </p>

4. **Game ID:** Enter in a game ID. The NBA assigns every game an ID number which can be found by visiting the official [NBA website](https://www.nba.com/). The IDs are located in the URLs for games.
    <p align="center">
      <img width="300" alt="nsc-game-id" src="https://github.com/user-attachments/assets/c24c66b4-e05a-4e1b-9792-4fa6a5a87c61" />
    </p>
    Here's an example of a game ID in a URL:
    <p align="center">
      <img width="800" alt="nsc-game-id" src="https://github.com/user-attachments/assets/b694f4bd-3cf2-4dce-b2a5-c2de7bad5fe8" />
    </p>
  
Viewing Shot Charts
---
There are 2 types of shot charts available:
1. **Makes and Misses chart:** Displays the location of all field goals attempted over the selection period. A made field goal is represented with a circle and a missed field goal is represented with an X.
    <p align="center">
      <img width="500" alt="nsc-chart1" src="https://github.com/user-attachments/assets/57ebb496-ff4e-4b5b-b37a-4fd6530eb87b" />
    </p>

    #### Options Menu
    The make and miss symbols are synced with each player's team's primary and secondary colors. However, some team colors make the symbols difficult to discern. Therefore, in the options menu in the top right corner, you can toggle between team colors and default colors (blue and red). This makes it easier to distinguish between the two symbols.
    <p align="center">
      <img width="425" alt="nsc-chart3" src="https://github.com/user-attachments/assets/5a2a4d7b-a987-4477-b6a6-c9f159509465" />
      <img width="425" alt="nsc-chart4" src="https://github.com/user-attachments/assets/6d6fdd6f-687f-41a4-bc88-6a4470cfd945" />
    </p>

    You can also toggle off makes and misses.
    <p align="center">
      <img width="425" alt="nsc-chart5" src="https://github.com/user-attachments/assets/ead1ba4e-51da-43df-8387-d4aad519a414" />
      <img width="425" alt="nsc-chart6" src="https://github.com/user-attachments/assets/17ba9bf2-701a-4505-8170-4296cce43969" />

    </p>

   
3. **Field Goal Percentage vs. League Average chart:** Groups shots into hexagonal bins with each hex containing aggregated values of all shots within that hex. The size of a hex represents how many shots a player takes from that area (the bigger the hex, the more shots they take). The color represents how efficient a player is from that area compared to the league average.
    <p align="center">
      <img width="500" alt="nsc-chart2" src="https://github.com/user-attachments/assets/49046e69-d730-4cf6-bfdc-7ff342cb426a" />
    </p>

    The color scale is as follows:
    <p align="center">
       <img width="300" alt="nsc-hex-legend" src="https://github.com/user-attachments/assets/b2390ac0-7dfc-48a0-8584-7e09dad06c3a" />
    </p>

    You can also hover over each of the 14 different zones on display in the chart. This reveals information about that zone including:
    * the player's field goal percentage 
    * shots made out of shots attempted
    * the league average field goal percentage
    <p align="center">
      <img width="425" alt="nsc-hexchart1" src="https://github.com/user-attachments/assets/38d0b7b9-6000-4d0a-9924-6d3e9298c6e3" />
      <img width="425" alt="nsc-hexchart2" src="https://github.com/user-attachments/assets/2bcb64ed-b6e3-4cac-9555-1c80c9736def" />
    </p>

Downloading A Chart
---
You can download any chart by simply clicking the download button in the top right corner.
    <p align="center">
      <img width="500" alt="nsc-download" src="https://github.com/user-attachments/assets/723c78e0-f6aa-4082-9251-624ddd5b6c7b" />
    </p>

Website Demo
---
Here's a quick demonstration of how the website works:

https://github.com/user-attachments/assets/a323d604-0ec6-4e26-84ca-3a437545f6e5
    
Notes on the API
---
The NBA doesn't have any official documentation for their API. However, the team behind the `nba_api` API client package for Python have extensively documented the API endpoints which I found immensely helpful for this project. Their work can be found [here](https://github.com/swar/nba_api).

The NBA also blocks some cloud server IP addresses from accessing its endpoints, likely due to high traffic from commonly used servers. This is a [well-documented issue](https://github.com/bttmly/nba/issues/41). My solution was to host the project's backend on Fly.io, which is less widely used and therefore not on the NBA's blacklist.
