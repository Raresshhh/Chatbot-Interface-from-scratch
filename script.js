// Initialize the WarpMind connection
// const mind = new WarpMind({
//     "baseURL": "https://ai.cavi.au.dk/", 
//     "model": "warp/mind"                     
// });

// Grab the HTML elements we need to interact with
const textarea = document.querySelector('.input-container textarea');
const sendButton = document.querySelector('.send-btn');
const chatHistory = document.querySelector('.chat-history');

// Helper function to create a message bubble and add it to the screen
function appendMessage(text, senderType) {
    // Create a new <div> element
    const messageDiv = document.createElement('div');
    // Add the appropriate CSS classes 
    messageDiv.classList.add('message', senderType);  
    // Insert the text inside the div
    messageDiv.textContent = text;
    // Attach the new div to the chat history container
    chatHistory.appendChild(messageDiv);
    // Automatically scroll to the bottom so the newest message is always visible
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

// Function that handles what happens when a message is sent
async function handleSendMessage() {
    // Get the text from the textarea and remove extra spaces
    const userMessage = textarea.value.trim();
    
    // If the text box is empty, stop and do nothing
    if (userMessage === "") return;


    const greeting = document.getElementById('greeting');
    // If the greeting is still visible, it means this is the first message
    if (greeting.style.display !== 'none') {
        greeting.style.display = 'none'; // Hide the greeting
        chatHistory.style.display = 'flex'; // Reveal the chat history container
    }

    // Instantly show the user's message on the screen
    appendMessage(userMessage, 'user');
    
    // Clear the textarea so it's ready for the next message
    textarea.value = ""; 

    // Thinking indicator
    const thinkingDiv = document.createElement('div');
    thinkingDiv.classList.add('message', 'ai', 'thinking');
    thinkingDiv.textContent = "WarpMind is thinking...";
    chatHistory.appendChild(thinkingDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;

    try {
        // Send the message to WarpMind API and wait for the response
        const response = await mind.chat(userMessage); 
        
        // Remove the thinking indicator once the response arrives
        chatHistory.removeChild(thinkingDiv);
        
        // Show the AI's real response on the screen
        appendMessage(response, 'ai');

    } catch (error) {
        console.error("API Error:", error);
        
        // Remove the thinking indicator if an error occurs
        if (chatHistory.contains(thinkingDiv)) {
            chatHistory.removeChild(thinkingDiv);
        }
        
        // Display an error message to the user
        appendMessage("Sorry, I encountered an error connecting to the server.", 'ai');
    }
}

// Listen for a click on the Send button
sendButton.addEventListener('click', handleSendMessage);

// Listen for the Enter key inside the textarea
textarea.addEventListener('keypress', (event) => {
    // If Enter is pressed (without holding Shift), send the message
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault(); // Prevents it from just typing a new line
        handleSendMessage();
    }
});