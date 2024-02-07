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
6 For e = (u, v) ∈ E:
7   if Find-Set(u) != Find-Set(v):
8   Add e to T
9   Union(u, v)
 */

export class RandomSpanningTree {
  constructor(graph, density = 2) {
    this.graph = graph;
    const graph_dict = graph.get_graph();
    this.vertices = graph_dict.vertices;
    this.edges = graph_dict.edges;
    this.density = density;
  }

  initialise_rst() {
    /** After ith index is selected, the ith index is then swapped with the last element,
     * perform the function again with length - 1 */
    let uf = new UnionFind(this.vertices);
    uf.make_set();
    const expected_density = this.get_expected_density();
    let error_counter = 1000;
    while (this.edges.length < expected_density && error_counter >= 0) {
      const { vertex_a, vertex_b } = this.#select_two_random_vertices();
      if (uf.find_set(vertex_a.get_id()) != uf.find_set(vertex_b.get_id())) {
        this.graph.add_undirected_edge(vertex_a, vertex_b);
        uf.union(vertex_a.get_id(), vertex_b.get_id());
      }
      error_counter -= 1;
    }
  }

  #select_two_random_vertices() {
    function random_select_two_indicies(list_length) {
      const first_index = Math.round((list_length - 1) * Math.random());
      const second_index = Math.round((list_length - 2) * Math.random());

      return { first: first_index, second: second_index };
    }
    // select two random verticies
    const { first, second } = random_select_two_indicies(this.vertices.length);
    const first_vertex = this.vertices[first];
    // swap selected and last element
    const tmp = this.vertices[this.vertices.length - 1];
    this.vertices[this.vertices.length - 1] = this.vertices[first];
    this.vertices[first] = tmp;
    // randomly select 2nd vertex
    const second_vertex = this.vertices[second];
    return { vertex_a: first_vertex, vertex_b: second_vertex };
  }

  get_expected_density() {
    return this.density * this.vertices.length;
  }
}
/**
 * Union find data structure (Union by rank)
 */
class UnionFind {
  constructor(vertices) {
    this.size = vertices.length;
    this.parent = new Array(this.size);
    this.rank = new Array(this.size).fill(0);
  }

  make_set() {
    for (let i = 0; i < this.size; i++) {
      this.parent[i] = i;
    }
  }
  find_set(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find_set(this.parent[x]);
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
