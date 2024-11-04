[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/ATV5e7Id)
# Hot-Cold Treasure Hunt

![geogame](https://github.com/user-attachments/assets/7c51b554-4202-42fc-a663-0343c634becb)


## Game Objective
Geo-Game is a "Hot-Cold" treasure hunt game where the player uses hints to locate a hidden treasure on the map in the fewest possible clicks or in the shortest time. With each click, the player receives feedback on their proximity to the treasure in the form of "Hot," "Warm," or "Cold" hints.

## Requirements
- **HTML, CSS, JavaScript**: Used for developing the game interface and core game logic.
- **OpenLayers**: Map library used to manage the map component and the hidden treasure target.

## Design Elements

### 1. User Interface
- **Map Viewer**: The main game screen where the treasure is hidden at a random location on the map.
- **Hint Area**: Displays hints ("Hot," "Warm," or "Cold") about the treasure's proximity after each click.
- **Click Counter**: A counter showing the number of clicks made by the player.
- **Start Button**: Button to start the game, which hides the treasure at a random position on the map.

## Game Flow

1. **Start**: The player clicks the "Start" button to begin the game. A treasure is hidden at a random location on the map.
2. **Making Guesses**: The player clicks anywhere on the map in an attempt to find the treasure. After each click, a hint about the proximity of the treasure ("Hot," "Warm," or "Cold") is shown in the hint area.
3. **Finding the Treasure**: The game ends and the player wins once they click close enough to the treasure's location.

