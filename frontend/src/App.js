import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import { PipelineUI } from './ui';
import { Sidebar } from './Sidebar';
import './nodes/node.css';

// Styles
const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f8fafc',
    overflow: 'hidden'
  },
  mainContent: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
    position: 'relative'
  },
  flowContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  }
};

function App() {
  return (
    <ReactFlowProvider>
      <div className="flex h-screen bg-dark bg-opacity-95 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex-grow flex flex-col h-full overflow-hidden relative">
          {/* Flow container */}
          <div className="flex-1 relative bg-dark bg-opacity-95 overflow-hidden flex flex-col">
            <PipelineUI />
          </div>
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default App;
