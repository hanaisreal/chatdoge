// Function to display a message in the chat UI
function displayMessage(message, isUser) {
    const chatDiv = document.getElementById('chat');
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.classList.add('message', isUser ? 'user-message' : 'server-message');
    chatDiv.appendChild(messageDiv);
}

// Function to send a message to the backend and display the reply
async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const userMessage = messageInput.value.trim();
    if (userMessage === '') return;

    displayMessage(userMessage, true);
    messageInput.value = '';

    try {
        const response = await fetch('http://localhost:3000/fortuneTell', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: [
                    { role: 'user', content: userMessage }, // Include user's input message
                ]
            })
        });

        const data = await response.json();
        const serverReply = data.assistant.content; // Extract the server's reply from the JSON response

        displayMessage(serverReply, false); // Display the server's reply in the chat UI
    } catch (error) {
        console.error(error);
    }
}
