///// Readout Types:
// Graph - Graphs the data
// Number - Displays the most recently received value
// State - Maps the most recently received value to a text state

import { ref } from "vue";
import type { Ref } from "vue";

// Universal readout information:
// Position
// | Column Start
// | Row Start
// | Column End
// | Row End
// Name
// Type
// Key

// Graph specific information:
// Max Data Points
// Max Value
// Min Value

// Number specific information:
// Unit

// State specific information:
// Mapping of Numbers to States
// Default

interface ReadoutPosition {
    cs: number;
    rs: number;
    ce: number;
    re: number;
}

interface Readout {
    name: string;
    key: string;
    type: "graph" | "number" | "state";
    position: ReadoutPosition;
}

export interface GraphReadout extends Readout {
    type: "graph";
    max_data_points: number;
    max_value?: number;
    min_value?: number;
}

export interface NumberReadout extends Readout {
    type: "number";
    unit?: string;
}

export interface StateReadout extends Readout {
    type: "state";
    states: Record<number, string>;
    default?: string;
}

export const rows: Ref<number> = ref(3);
export const columns: Ref<number> = ref(3);
// export const readouts: Readout[] = [{name: "test", key: "test", type: "graph", position: {cs: 0, rs: 0, ce: 1, re: 2}}];
export const readouts: (GraphReadout | NumberReadout | StateReadout)[] = [
    {
        name: "Test Graph",
        key: "testing",
        type: "graph",
        position: {
            cs: 0,
            rs: 0,
            ce: 0,
            re: 0,
        },
        max_data_points: 200,
    },
    {
        name: "Test Number",
        key: "testing",
        type: "number",
        position: {
            cs: 1,
            rs: 1,
            ce: 1,
            re: 1,
        },
        unit: " lb"
    },
    {
        name: "Test State",
        key: "testing",
        type: "state",
        position: {
            cs: 2,
            rs: 2,
            ce: 2,
            re: 2,
        },
        states: {
            1: "angry",
            2: "furious",
            3: "happy",
            4: "scared",
            5: "lpk"
        },
        default: "no match"
    },
]
