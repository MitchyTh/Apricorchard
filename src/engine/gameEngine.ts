export interface GameState
{
    apricorns: number;
    pokeballs: number;
    pokedollars: number;
    trees: ApricornTree[];
}

export interface ApricornTree {
    id: string;
    growthProgress: number; // seconds elapsed since last harvest
    growthDuration: number; // seconds required to grow a batch of Apricorns
    yieldAmount: number; // Apricorns granted when harvested
    isReady: boolean;
  }

export const INITIAL_STATE: GameState = {
    apricorns: 0,
    pokeballs: 0,
    pokedollars: 0,
    trees: [
        {
        id: "tree-1",
        growthProgress: 0,
        growthDuration: 3, // grows every 3 seconds
        yieldAmount: 1,
        isReady: false,
      },
    ],
};

export function collectApricorn(state: GameState): GameState {
    return {
        ...state,
        apricorns: state.apricorns + 1,
    };
}

export function tick(state: GameState, deltaSeconds: number): GameState {
    if (deltaSeconds <= 0) {
      return state;
    }
  
    let changed = false;
  
    const nextTrees = state.trees.map((tree) => {
      // Once ready, hold at growthDuration until the player clicks to harvest
      if (tree.isReady) {
        return tree;
      }
  
      const updatedProgress = tree.growthProgress + deltaSeconds;
      if (updatedProgress >= tree.growthDuration) {
        changed = true;
        return {
          ...tree,
          growthProgress: tree.growthDuration,
          isReady: true,
        };
      }
  
      changed = true;
      return {
        ...tree,
        growthProgress: updatedProgress,
      };
    });
  
    if (!changed) {
      return state;
    }
  
    return {
      ...state,
      trees: nextTrees,
    };
  }
  
  export function harvestTree(state: GameState, treeId: string): GameState {
    const targetTree = state.trees.find((tree) => tree.id === treeId);
    if (!targetTree || !targetTree.isReady) {
      return state;
    }
  
    const nextTrees = state.trees.map((tree) => {
      if (tree.id !== treeId) {
        return tree;
      }
      return {
        ...tree,
        growthProgress: 0,
        isReady: false,
      };
    });
  
    return {
      ...state,
      apricorns: state.apricorns + targetTree.yieldAmount,
      trees: nextTrees,
    };
  }
