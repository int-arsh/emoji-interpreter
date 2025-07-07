// Import React hooks for state management and side effects
import { useState, useEffect } from 'react'
// Import CSS styles for this component
import './App.css'
// Import emoji database and utility functions from separate file
import { emojiDatabase, getRandomEmoji, getEmojiCount } from './emojiDatabase.js'

// Main App component - this is the root component of our application
function App() {
  // State to store the user's input text
  const [inputText, setInputText] = useState('')
  // State to store the interpreted emoji meanings
  const [interpretations, setInterpretations] = useState([])
  // State to track if we're currently processing (for loading states)
  const [isProcessing, setIsProcessing] = useState(false)

  // Function to interpret emojis in the input text
  const interpretEmojis = (text) => {
    // Create an array to store found emojis and their meanings
    const foundEmojis = []
    
    // Use Array.from to handle multi-codepoint emojis
    for (const [i, char] of Array.from(text).entries()) {
      // Check if this character exists in our emoji database
      if (emojiDatabase[char]) {
        // Add the emoji and its meaning to our results
        foundEmojis.push({
          emoji: char,
          meaning: emojiDatabase[char],
          position: i // Track where in the text this emoji was found
        })
      }
    }
    
    return foundEmojis
  }

  // Function to handle input changes
  const handleInputChange = (event) => {
    // Get the new text value from the input field
    const newText = event.target.value
    // Update the input text state
    setInputText(newText)
    
    // If there's text, process it immediately
    if (newText.trim()) {
      // Set processing state to true (for potential loading indicators)
      setIsProcessing(true)
      
      // Use setTimeout to simulate processing and avoid blocking the UI
      setTimeout(() => {
        // Interpret the emojis in the text
        const results = interpretEmojis(newText)
        // Update the interpretations state with the results
        setInterpretations(results)
        // Set processing to false since we're done
        setIsProcessing(false)
      }, 100) // Small delay to show processing state
    } else {
      // If text is empty, clear the interpretations
      setInterpretations([])
      setIsProcessing(false)
    }
  }

  // Function to clear all input and results
  const handleClear = () => {
    setInputText('')
    setInterpretations([])
    setIsProcessing(false)
  }

  // Function to copy results to clipboard
  const handleCopyResults = () => {
    // Create a formatted string of all interpretations
    const resultsText = interpretations
      .map(item => `${item.emoji}: ${item.meaning}`)
      .join('\n')
    
    // Copy to clipboard using the browser's clipboard API
    navigator.clipboard.writeText(resultsText)
      .then(() => {
        // Show a brief success message (you could add a toast notification here)
        alert('Results copied to clipboard!')
      })
      .catch(err => {
        console.error('Failed to copy: ', err)
        alert('Failed to copy results')
      })
  }

  // Function to get a random emoji for demonstration
  const handleRandomEmoji = () => {
    // Get a random emoji from our database
    const randomEmoji = getRandomEmoji()
    console.log(randomEmoji)
    // Add it to the current input text
    const newText = inputText + randomEmoji
    setInputText(newText)
    
    // Manually trigger emoji interpretation since onChange won't fire
    if (newText.trim()) {
      setIsProcessing(true)
      setTimeout(() => {
        const results = interpretEmojis(newText)
        console.log(results)
        setInterpretations(results)
        setIsProcessing(false)
      }, 100)
    } else {
      setInterpretations([])
      setIsProcessing(false)
    }
  }

  // Calculate statistics for display
  const totalEmojis = interpretations.length
  const uniqueEmojis = new Set(interpretations.map(item => item.emoji)).size

  // Main component render
  return (
    <div className="app">
      {/* Header section with title and description */}
      <header className="app-header">
        <h1>🎭 Emoji Interpreter</h1>
        <p>Type or paste text with emojis to see their meanings!</p>
      </header>

      {/* Main content area */}
      <main className="app-main">
        {/* Input section */}
        <section className="input-section">
          {/* Text input area */}
          <div className="input-container">
            <label htmlFor="emoji-input" className="input-label">
              Enter text with emojis:
            </label>
            <textarea
              id="emoji-input"
              className="emoji-input"
              value={inputText}
              onChange={handleInputChange}
              placeholder="Type or paste text with emojis here... 😀 🎉 🚀"
              rows={4}
            />
          </div>

          {/* Action buttons */}
          <div className="button-group">
            <button 
              onClick={handleRandomEmoji}
              className="btn btn-secondary"
              title="Add a random emoji to your text"
            >
              🎲 Add Random Emoji
            </button>
            <button 
              onClick={handleClear}
              className="btn btn-danger"
              title="Clear all text and results"
            >
              🗑️ Clear All
            </button>
          </div>
        </section>

        {/* Results section */}
        <section className="results-section">
          {/* Statistics display */}
          {totalEmojis > 0 && (
            <div className="stats">
              <span>📊 Found {totalEmojis} emoji{totalEmojis !== 1 ? 's' : ''}</span>
              <span>🎯 {uniqueEmojis} unique emoji{uniqueEmojis !== 1 ? 's' : ''}</span>
            </div>
          )}

          {/* Processing indicator */}
          {isProcessing && (
            <div className="processing">
              🔍 Analyzing emojis...
            </div>
          )}

          {/* Emoji interpretations list */}
          {interpretations.length > 0 && (
            <div className="interpretations">
              <div className="interpretations-header">
                <h3>📖 Emoji Meanings</h3>
                <button 
                  onClick={handleCopyResults}
                  className="btn btn-primary btn-small"
                  title="Copy all results to clipboard"
                >
                  📋 Copy Results
                </button>
              </div>
              
              <div className="interpretations-list">
                {interpretations.map((item, index) => (
                  <div key={index} className="interpretation-item">
                    <span className="emoji-display">{item.emoji}</span>
                    <div className="interpretation-details">
                      <p className="meaning">{item.meaning}</p>
                      <small className="position">Position: {item.position + 1}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty state when no emojis found */}
          {inputText && !isProcessing && interpretations.length === 0 && (
            <div className="no-results">
              <p>🤔 No emojis found in your text.</p>
              <p>Try adding some emojis like: 😀 🎉 🚀 💪 ⭐</p>
            </div>
          )}
        </section>

        {/* Footer with additional info */}
        <footer className="app-footer">
          <p>💡 Tip: You can copy and paste emojis from anywhere!</p>
          <p>📚 This interpreter recognizes {getEmojiCount()} different emojis</p>
        </footer>
      </main>
    </div>
  )
}

// Export the App component so it can be used in other files
export default App
