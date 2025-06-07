from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Dict, Any
from collections import defaultdict

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str
    data: Dict[str, Any] = Field(default_factory=dict)

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "id": "node-1",
                    "type": "textNode",
                    "data": {"text": "Sample text"}
                }
            ]
        }
    }

class Edge(BaseModel):
    source: str
    target: str

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "source": "node-1",
                    "target": "node-2"
                }
            ]
        }
    }

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "nodes": [
                        {"id": "node-1", "type": "textNode", "data": {"text": "Input"}},
                        {"id": "node-2", "type": "outputNode", "data": {}}
                    ],
                    "edges": [
                        {"source": "node-1", "target": "node-2"}
                    ]
                }
            ]
        }
    }

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Check if the graph is a Directed Acyclic Graph (DAG) using DFS.
    """
    # Create adjacency list
    graph = defaultdict(list)
    for edge in edges:
        graph[edge.source].append(edge.target)

    # Keep track of visited nodes and nodes in current path
    visited = set()
    path = set()

    def has_cycle(node: str) -> bool:
        """
        DFS helper function to detect cycles.
        """
        if node in path:
            return True
        if node in visited:
            return False

        visited.add(node)
        path.add(node)

        for neighbor in graph[node]:
            if has_cycle(neighbor):
                return True

        path.remove(node)
        return False

    # Check each node for cycles
    node_ids = [node.id for node in nodes]
    for node_id in node_ids:
        if node_id not in visited:
            if has_cycle(node_id):
                return False

    return True

def validate_pipeline(pipeline: Pipeline) -> None:
    """
    Validate the pipeline structure.
    """
    # Create a set of node IDs for quick lookup
    node_ids = {node.id for node in pipeline.nodes}
    
    # Check if all edge endpoints exist in nodes
    for edge in pipeline.edges:
        if edge.source not in node_ids:
            raise HTTPException(
                status_code=400,
                detail=f"Edge source node '{edge.source}' does not exist"
            )
        if edge.target not in node_ids:
            raise HTTPException(
                status_code=400,
                detail=f"Edge target node '{edge.target}' does not exist"
            )

@app.post("/pipelines/parse")
async def parse_pipeline(pipeline: Pipeline):
    """
    Analyze the pipeline structure and return metrics.
    """
    try:
        # Validate pipeline structure
        validate_pipeline(pipeline)

        # Count nodes and edges
        num_nodes = len(pipeline.nodes)
        num_edges = len(pipeline.edges)

        # Check if the graph is a DAG
        is_dag_result = is_dag(pipeline.nodes, pipeline.edges)

        return {
            "num_nodes": num_nodes,
            "num_edges": num_edges,
            "is_dag": is_dag_result
        }
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)