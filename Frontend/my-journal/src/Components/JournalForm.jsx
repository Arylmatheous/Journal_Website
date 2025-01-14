import "./JournalForm.css"; // Importing the CSS file for styling
import React, { useState } from 'react'; // Importing React and useState hook for managing component state

// Functional component for the JournalForm
function JournalForm() {
    // State hooks
    const [name, setNewName] = useState(""); // Tracks the name input
    const [entries, setEntries] = useState([]); // Stores all journal entries
    const [entry, setEntry] = useState(""); // Tracks the message input
    const [currentPage, setCurrentPage] = useState("initial"); // Tracks the current page being displayed: "initial", "submit", or "browse"

    // Function to handle switching to the "browse" page
    function handleBrowse() {
        setCurrentPage("browse"); // Sets the current page to "browse"
    }

    // Function to handle switching to the "submit" page
    function handleSubmitPage() {
        setCurrentPage("submit"); // Sets the current page to "submit"
    }

    // Function to update the name input field
    function handleChange(event) {
        setNewName(event.target.value); // Updates the `name` state with the input value
    }

    // Function to update the message input field
    function handleEntry(event) {
        setEntry(event.target.value); // Updates the `entry` state with the input value
    }

    // Function to handle form submission
    function handleSubmit(event) {
        event.preventDefault(); // Prevents the default form submission behavior (e.g., page reload)
        if (name && entry) { // Ensures that both name and message are filled in
            const newEntry = { 
                name, // The name of the user
                text: entry, // The message inputted by the user
                date: new Date().toLocaleString() // The current date and time formatted as a string
            };
            setEntries([...entries, newEntry]); // Adds the new entry to the existing list of entries
            setNewName(""); // Clears the name input field
            setEntry(""); // Clears the message input field
            setCurrentPage("initial"); // Returns the user to the "initial" page after submission
        }
    }

    // The UI structure of the component
    return (
        <div className="title"> {/* Main container for the journal */}
            {/* Rendering the initial page */}
            {currentPage === "initial" && ( // Checks if the current page is "initial"
                <div>
                    <h1>Anonymous Journal</h1> {/* Header */}
                    <button className="submit-button" onClick={handleSubmitPage}>
                        Submit {/* Button to navigate to the "submit" page */}
                    </button>
                    <button className="browse-button" onClick={handleBrowse}>
                        Browse {/* Button to navigate to the "browse" page */}
                    </button>
                </div>
            )}

            {/* Rendering the submission form */}
            {currentPage === "submit" && ( // Checks if the current page is "submit"
                <div> 
                    <h1>Submit an Entry</h1> {/* Header */}
                    <input
                        className="input-name"
                        type="text"
                        id="name"
                        placeholder="Enter your name" // Placeholder for the name input field
                        value={name} // Value bound to the `name` state
                        onChange={handleChange} // Updates the `name` state when input changes
                    /><br/>

                    <input
                        className="input-message"
                        type="text"
                        id="message"
                        placeholder="Enter your message" // Placeholder for the message input field
                        value={entry} // Value bound to the `entry` state
                        onChange={handleEntry} // Updates the `entry` state when input changes
                    /><br/>
                    <button className="submit-button" onClick={handleSubmit}>
                        Submit {/* Button to submit the form */}
                    </button>
                    <button className="back-button" onClick={() => setCurrentPage("initial")}>
                        Back {/* Button to navigate back to the "initial" page */}
                    </button>
                </div>
            )}

            {/* Rendering the browse entries page */}
            {currentPage === "browse" && ( // Checks if the current page is "browse"
                <div>
                    <h1>Browse Entries</h1> {/* Header */}
                    {entries.length > 0 ? ( // Checks if there are any entries to display
                        entries.map((entry, index) => ( // Loops through the entries array
                            <div key={index} className="entry"> {/* Each journal entry */}
                                <p><strong>Name:</strong> {entry.name}</p> {/* Displays the name */}
                                <p><strong>Message:</strong> {entry.text}</p> {/* Displays the message */}
                                <p><small><strong>Date:</strong> {entry.date}</small></p> {/* Displays the date */}
                                <hr /> {/* Divider between entries */}
                            </div>
                        ))
                    ) : (
                        <p>No entries available. Submit your first entry!</p> // Message when no entries exist
                    )}
                    <button className="back-button" onClick={() => setCurrentPage("initial")}>
                        Back {/* Button to navigate back to the "initial" page */}
                    </button>
                </div>
            )}
        </div>  
    );
}

export default JournalForm; // Exports the component so it can be used in other parts of the app
