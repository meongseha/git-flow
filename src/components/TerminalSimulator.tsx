import React, { useState, useEffect, useRef } from 'react';

interface Command {
  command: string;
  output: string;
}

interface TerminalSimulatorProps {
  commands: Command[];
}

export const TerminalSimulator: React.FC<TerminalSimulatorProps> = ({ commands }) => {
  const [displayedCommands, setDisplayedCommands] = useState<Command[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showingOutput, setShowingOutput] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Function to type the command character by character
  useEffect(() => {
    if (currentIndex >= commands.length) return;
    
    if (!isTyping && !showingOutput) {
      const cmd = commands[currentIndex].command;
      let charIndex = 0;
      setIsTyping(true);
      
      const typingInterval = setInterval(() => {
        if (charIndex <= cmd.length) {
          setTypingText(cmd.substring(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          setShowingOutput(true);
        }
      }, 50);
      
      return () => clearInterval(typingInterval);
    }
  }, [commands, currentIndex, isTyping, showingOutput]);
  
  // Function to show command output after typing is complete
  useEffect(() => {
    if (showingOutput) {
      const timeoutId = setTimeout(() => {
        setDisplayedCommands([...displayedCommands, {
          command: commands[currentIndex].command,
          output: commands[currentIndex].output
        }]);
        setTypingText('');
        setShowingOutput(false);
        setCurrentIndex(currentIndex + 1);
      }, 500);
      
      return () => clearTimeout(timeoutId);
    }
  }, [commands, currentIndex, displayedCommands, showingOutput]);
  
  // Scroll to bottom when new content appears
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayedCommands, typingText]);

  return (
    <div 
      className="terminal text-green-400 p-4 overflow-auto max-h-60"
      ref={terminalRef}
    >
      <div className="font-mono text-sm">
        {displayedCommands.map((cmd, index) => (
          <div key={index} className="mb-2">
            <div className="flex">
              <span className="text-blue-400 mr-2">$</span>
              <span>{cmd.command}</span>
            </div>
            {cmd.output && (
              <pre className="mt-1 text-gray-300 whitespace-pre-wrap">{cmd.output}</pre>
            )}
          </div>
        ))}
        
        {typingText && (
          <div className="flex">
            <span className="text-blue-400 mr-2">$</span>
            <span>{typingText}</span>
            <span className="animate-pulse ml-0.5">|</span>
          </div>
        )}
      </div>
    </div>
  );
};