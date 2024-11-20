const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input i");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".ai-close-btn");

let userMessage;

const inputInitHeight = chatInput.scrollHeight;
const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p></p>` :  `<i class="ri-robot-2-line"></i><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}


//  const generateResponse = () => {
//      const API_URL = 
//      "https://api.openai.com/v1/chat/completions";

//      const requestOptions = {
//          method: "POST",
//          headers: {
//              "Content-Type": "application/json",
//              "Authorization": `Bearer ${API_KEY}`
//          },
//          body: JSON.stringify({
//           model: "gpt-4o-mini",
//           messages: [
//               {
//                   role: "user",
//                   content: userMessage
//               }
//           ]
//           })
//      }

//      // send POST request to OpenAI's API
//      fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
//       console.log(data);
//      }).catch((error) => {
//          console.log(error);
//      })    
//  }

// Function to auto-scroll to the latest message
const scrollToBottom = () => {
  chatbox.scrollTop = chatbox.scrollHeight;
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));

     // Clear the textarea after sending the message
    chatInput.value = "";

    // Auto-scroll to the bottom after user's message
    scrollToBottom();

    setTimeout(() => {
        // Display "Thinking..." message while waiting after 600ms
        chatbox.appendChild(createChatLi("Thinking...", "incoming"));


        // Auto-scroll to the bottom after bot's response
        scrollToBottom();


        generateResponse();
    }, 600);
    
}



// Handle "Enter" key press to send message
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent a new line in the textarea
      handleChat();
  }
});

chatInput.addEventListener("input", () => {
  // Adjust the height of the textarea based on its content
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  // if shift key is pressed with enter then it will jump to next line
  if(e.key === !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

sendChatBtn.addEventListener("click", handleChat);
chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
