/*  
Use MST to create randomised undirected acyclic graph,
except there is unweighted without sorting 
*/

/**             Pseudo algorithm
 1 Maintain connected components that have been added to the
MST so far T, in a Union-Find structure
2 Initialize T = ∅
3 for v in V                --implicit defined in make_set()
4   Make-Set(v) 
5 Sort E by weight          --ignore
6 For e = (u, v) ∈ E (in increasing-weight order):
7   if Find-Set(u) = Find-Set(v):
8   Add e to T
9   Union(u, v)
 */

export class MinimumSpanningTree {
  constructor(graph) {
    this.graph = graph;
    const graph_dict = graph.get_graph();
    this.vertices = graph_dict.vertices;
    this.edges = graph_dict.edges;
  }
  gen_edges() {
    for (let i = 0; i < this.vertices.length - 1; i++) {
      for (let j = i + 1; j < this.vertices.length; j++) {
        this.graph.add_undirected_edge(
          this.vertices[i],
          this.vertices[j],
          false
        );
      }
    }
  }

  initialise_mst() {
    this.gen_edges();
    uf = UnionFind(this.vertices);
    uf.make_set();
  }
}
/**
 * Union find data structure
 */
class UnionFind {
  constructor(vertices) {
    const size = vertices.length;
    this.parent = new Array(size);
    this.rank = new Array(size).fill(0);
  }

  make_set() {
    for (let i = 0; i < size; i++) {
      this.parent[i] = i;
    }
  }
  find_set() {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x, y) {
    let rootX = this.find_set(x);
    let rootY = this.find_set(y);

    if (rootX !== rootY) {
      if (this.rank[rootX] < this.rank[rootY]) {
        this.parent[rootX] = rootY;
      } else if (this.rank[rootX] > this.rank[rootY]) {
        this.parent[rootY] = rootX;
      } else {
        this.parent[rootY] = rootX;
        this.rank[rootX]++;
      }
    }
  }
}
