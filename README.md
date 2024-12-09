[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/ATV5e7Id)
# Hot-Cold Treasure Hunt  
https://gmt-458-web-gis.github.io/geogame-zeynepaygul/

![geogame](https://github.com/user-attachments/assets/7c51b554-4202-42fc-a663-0343c634becb)


## Game Objective
Geo-Game is an interactive "Hot-Cold" treasure hunting game designed to challenge players to find a hidden treasure on a map using proximity-based clues. The goal is to locate the treasure in as few clicks as possible.

## Requirements
- **HTML, CSS, JavaScript**: Used for developing the game interface and core game logic.
- **OpenLayers**: Map library used to manage the map component and the hidden treasure target.

## Design Elements

### 1. User Interface
- **Map Viewer**: The main game screen where the treasure is hidden at a random location on the map.
- **Clue Area**: Displays clues such as "Hot", "Warm", or "Cold" after each click to indicate proximity to the treasure.
- **Click Counter**: Tracks the number of attempts the player has made.
- **Start Button**: Initiates the game and places the treasure at a random location.

## Game Flow

1. **Hint**: Players can click on the Hint Button to get additional information about the treasure's location.
2. **Guess**: Players click anywhere on the map to search for the treasure. After each guess, they receive a clue in the Clue Area about their proximity to the treasure.
3. **Finding the Treasure**: The game ends when players find the treasure by getting close enough to its location.

## Event Handlers

- **Map Click Event:**  
  When the user clicks on a point on the map, the distance between the clicked location and the treasure is calculated, and hints ("Cold", "Warm", "Congratulations!") are displayed on the screen.

- **Hint Button Click Event:**  
  When the "Hint" button is clicked, a clue is displayed on the screen to help the user locate the hidden treasure.

- **Restart Button Click Event:**  
  When the user clicks the "Restart" button, the game resets, a new treasure location is generated, and counters are reset.

## Use of Closures

Closures were used in the project to protect and encapsulate the hidden treasure's coordinates, ensuring they remain private and are only accessed or modified through specific event handlers.

## Interaction with the DOM

- Hints are dynamically updated based on the distance to the clicked point.  
- A pop-up is displayed when the "Hint" button is clicked or when the treasure is found.  
- The number of user clicks and other game-related information are updated on the DOM.

## Source

[Gpt](https://chatgpt.com/share/67543754-43b4-800c-aa66-4323207de474)  





