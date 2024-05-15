# Gæludýrasmájá

/ˈcaiːlʏˌtiːraˈsmauːˌsjauː/ \
Gæludýra = pet.PL.GEN \
Smájá = microscope.SG.NOM

## Structure

The website has two components: the panel, in the middle; and the navbar, on the left. The panel is a grid, composed of readouts. Each of these readouts are rectangles that can occupy either one square on the grid, or they can span across multiple. There are three readouts: graph, state, and number. These will be discussed in more detail later on, but essentially the graph readout displays a graph, the state readout displays a textual state, and the number readout displays a number with an optional unit. Data is organized into *keys*, which are at most 8 ASCII characters. Each readout is assigned a key, and will display the data from that key, and data is sent by the pets to a specific key. Unfortunately, data can only be sent as a number, which is why the state readout exists: to map sent numbers into textual states.

For example, if you wanted to display a graph of a pet's compass heading and the amount of times that it has been fed, you could make a graph readout attached to the key `COMPHEAD` and a number readout attached to the key `NUMFED`. Then, on the pet's side, whenever you send the current heading to the key `COMPHEAD`, the new heading will be appended to the graph readout. Usually, you would do this at regular intervals, but this is by no means required. An whenever the pet gets fed, you send the new total feed count to `NUMFED`, and the number readout will automatically update to the most recently sent value.

## The Grid

The grid can be a maximum of 9 cells in either direction. However, if you don't use all 9 cells, it will automatically expand to show your panel as large as it can. Coordinates on the grid are specified with a letter and a number. The letter, from A-I, represents the column. The number, from 1-9, represents the row. However, not that this is different from the coordinate system used in chess: the origin here is in the top left corner. The higher the column number goes, the futher right it will be. The higher the row number goes the futher down it will be.

### Graph Readout

The graph readout presents a graph of the last `max_data_points` values. After so many values are sent, it will remove the oldest one when new ones come in. The x-axis of the graph does not have any inherent meaning, as all received values are place at an equal distant from the other values, and if a team wants the values to be spaced according to time, it is their responsibility to send values at equal intervals.

The y-axis is autoranging by default, but you are able to specify a `max_value` and a `min_value`. Note that these two values are separate: it is possible to have the y-axis always locked at a specific minimum while the maximum is autoranging and vice versa.

### Number Readout

The number readout is the simplest of all the readouts: it simply displays the most recently sent value and will optionally append a unit. If you do not want a unit, then do not specify one. However, if you *do* want a unit, specify it as `unit`. Note that the space is not included, and if you want a space between the number and the unit, you must add it. For example: `" lb"`, not `"lb"`. This unit is fully Unicode compatible, and is therefore compatible with units such as Ohms (Ω) and Ångströms (Å), if you wanted those for whatever reason.

### State Readout

Sometimes you need to convy a text state, but you are only able to send numbers. There is a solution to this: the state readout, which will map the sent numbers to a text state. For example, if our pet could be in three states: happy, sad, and sleeping, then we could map 1 to happy, 2 to sad, and 3 to sleeping. Then if we send 1 to that channel, the state readout will display "happy"; if we send 2, the state readout will display "sad"; and so on. You are also able to specify a default state that will be displayed when the received number doesn't match anything. Like the number readout, the state readout is completely Unicode compliant, allowing you to use other scripts such as "счастливый" (Russian), "ความสุข" (Thai), or "高兴" (Mandarin) instead of "happy".

## The Panel Definition File

The configuration of your panel is determined by a JSON file named the panel definition file. It contains an array of objects, each of which is a readout. We will talk more about the structure of the file later, but first we need to talk about how to actually define these readouts.

### Readouts

Each readout is contained in curly braces, and every entry is separated by commas (it's kinda hard to explain briefly; see the example later). Every value and key is surrounded by quotes.

All readouts have common information that we will describe here, which is combined with type specific information. Each readout has a Unicode compliant `name`, which is displayed at the top in big letters. Then, you need to specify the `key`, which is displayed near the name in smaller letters. Next is `type`, which is `graph`, `state`, or `number`.

The hardest part of this to understand is the position definition. You must specify the upper left corner's grid square in `upper_left`, and the lower right corner's grid square in `lower_right`. If your readout is only one square then these will be the same, but you always need to have both of them. You can place readouts wherever you want in whatever size you want, but do keep in mind that the software will *not* prevent you from creating overlapping readouts.

For example, if we have a number readout on the first row, stretching from the first to the second column, named "Steps" which uses the `stepcnt` key, then we could start the definition with the following.

```json
{
    "name": "Steps",
    "key": "stepcnt",
    "type": "number",
    "upper_left": "A1",
    "lower_right": "B1",
    ...
}
```

#### Graph Readout

Only the `max_data_points` parameter is required. The `min_value` and `max_value` parameters are completely optional, as explained above. For example, say we have a graph readout named "Happiness %" that uses the key `happperc` and stretches from "A1" to "B4" and we want to display the last 300 data points. We know that percentages range from $0$-$100$, so we could write the following.

```json
{
    "name": "Happiness %",
    "key": "happperc",
    "type": "graph",
    "upper_left": "A1",
    "lower_right": "B4",
    "max_data_points": 300,
    "max_value": 100,
    "min_value": 0
}
```

#### Number Readout

Just as the number readout is the simplest readout is has the simplest definition. The only parameter is `unit` and it is optional. Going back to our previous example of a number readout stretching from "A1" to "A2" named "Steps" which uses the `stepcnt` key and using "steps" as the unit, we can write the following.

```json
{
    "name": "Steps",
    "key": "stepcnt",
    "type": "number",
    "upper_left": "A1",
    "lower_right": "A2",
    "unit": " steps"
}
```

#### State Readout

The state readout is the most complicated to configure. The states are listed as an object in the parameter `states` with their code numbers as the key. It also takes the `default` parameter, which will be displayed if the number sent doesn't match any of the specified states or if no numbers have been sent yet. For example, say we wanted a state readout with the name "Emotional State" with the key `emotstat`. It has three states: $1$ means "Unhappy", $2$ means "Meh", and $3$ means "Happy". For this, we can write the following.

```json
{
    "name": "Emotional State",
    "key": "emotstat",
    "type": "state",
    "upper_left": "A1",
    "lower_right": "A1",
    "states": {
        "1": "Unhappy",
        "2": "Meh",
        "3": "Happy"
    },
    "default": "No Match"
}
```