import {
  INITIAL_STATE,
  tick,
  harvestTree,
} from "./gameEngine.js";

let state = INITIAL_STATE;

// 1. Try clicking before enough time has passed (0s elapsed) -> no Apricorns
state = harvestTree(state, "tree-1");
console.log("After premature click:", state.apricorns, state.trees[0]);

// 2. Advance 2 seconds out of 3 -> still not ready
state = tick(state, 2);
state = harvestTree(state, "tree-1");
console.log("After 2s + click:", state.apricorns, state.trees[0]);

// 3. Advance 1.5 more seconds (3.5s total >= 3s) -> ready! Click to harvest
state = tick(state, 1.5);
console.log("Before harvest at 3.5s:", state.trees[0]);
state = harvestTree(state, "tree-1");
console.log("After harvest:", state.apricorns, state.trees[0]);

// 4. Advance another 3 seconds -> ready for second harvest
state = tick(state, 3);
state = harvestTree(state, "tree-1");
console.log("After second growth & harvest:", state.apricorns, state.trees[0]);