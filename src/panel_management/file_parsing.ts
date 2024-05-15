import type { GraphReadout, NumberReadout, Readout, ReadoutPosition, StateReadout } from "./panel_definition";
import { readouts, rows, columns } from "./panel_definition";

interface Corner {
    column: number;
    row: number;
}

interface JSONPositionedGraphReadout extends GraphReadout {
    upper_left: string;
    lower_right: string;
}

interface JSONPositionedNumberReadout extends NumberReadout {
    upper_left: string;
    lower_right: string;
}

interface JSONPositionedStateReadout extends StateReadout {
    upper_left: string;
    lower_right: string;
}

type JSONPositionedReadout = (JSONPositionedGraphReadout | JSONPositionedNumberReadout | JSONPositionedStateReadout);
type MultiReadout = (GraphReadout | NumberReadout | StateReadout);

export async function constructPanel(description: JSONPositionedReadout[]) {
    let [panel, bounds] = await convertPanel(description);
    columns.value = bounds.ce - bounds.cs + 1;
    rows.value = bounds.re - bounds.rs + 1;
    readouts.value = panel;
}

async function convertPanel(description: JSONPositionedReadout[]): Promise<[MultiReadout[], ReadoutPosition]> {
    let converted_description = description.map(convertReadoutPosition);
    let panel_bounds = converted_description.reduce(
        (current_bound: ReadoutPosition, next: Readout) => {
            return {
                cs: Math.min(current_bound.cs, next.position.cs),
                rs: Math.min(current_bound.rs, next.position.rs),
                ce: Math.max(current_bound.ce, next.position.ce),
                re: Math.max(current_bound.re, next.position.re)
            }
        },
        { cs: Infinity, rs: Infinity, ce: -Infinity, re: -Infinity }
    )
    let shifted_panel = description.map((r) => {
        r.position.cs -= panel_bounds.cs;
        r.position.rs -= panel_bounds.rs;
        r.position.ce -= panel_bounds.cs;
        r.position.re -= panel_bounds.rs;
        return r;
    });
    return [shifted_panel, panel_bounds];
}

function convertReadoutPosition(readout: JSONPositionedReadout): MultiReadout {
    let upper_left_corner = parseLocation(readout.upper_left);
    let lower_right_corner = parseLocation(readout.lower_right);
    let converted_readout = readout;
    converted_readout.position = {
        cs: upper_left_corner.column,
        rs: upper_left_corner.row,
        ce: lower_right_corner.column,
        re: lower_right_corner.row
    };
    return converted_readout;
}

function parseLocation(loc: string): Corner {
    if (loc.length != 2) {
        throw Error(`loc must have two characters. I was given ${loc}.`)
    }
    let x_coord = loc[0].toUpperCase().charCodeAt(0) - 65;
    if (x_coord < 0 || x_coord > 9) {
        throw Error(`The x-coord in loc must be a letter from A-I. I was given ${loc[0]}, ${x_coord}`);
    }
    let y_coord = loc[1].charCodeAt(0) - 49;
    if (y_coord < 0 || y_coord > 9) {
        throw Error(`The y-coord in loc must be a number from 1-9. I was given ${loc[1]}`);
    }
    return {
        column: x_coord,
        row: y_coord
    }
}