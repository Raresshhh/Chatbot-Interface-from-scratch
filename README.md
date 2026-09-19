## Chatbot-Interface-from-scratch
A university project where the assignment was to replicate an existing chatbot Interface using HTML, CSS and JavaScript. Through a given API key by my professor, I had to make the interface functional. I replicated it to look like the ChatGPT UI, I've added the sidebar functions for the accurate visual look, but these are not yet implemented.

## Features
**Dynamic UI State Transitions:** 

The interface begins with a centered landing view and seamlessly shifts to a bottom-anchored chat layout upon the user's first message, mimicking industry-standard AI UI behaviors.


**Asynchronous AI Integration:**

Connects to the university-provided WarpMind proxy server using modern JavaScript to handle real-time conversational data.


**Visual Feedback:** 

Implements a CSS-animated "thinking..." indicator that displays while waiting for server responses, providing a polished and responsive user experience.


**Responsive Layout:** 

Utilizes CSS Flexbox for a scalable, dark-themed UI that adapts cleanly to the viewport.


**Secure Credential Handling:** 

Designed to accept a private API key securely via a runtime prompt, ensuring zero sensitive credentials are hardcoded or exposed in the repository.

## Technologies Used
**HTML5:** 
Semantic structure and input handling.


**CSS3:** 
Flexbox macro-layout, custom variable styling, and keyframe animations.


**JavaScript:** 
Direct DOM manipulation, event listener management, and asynchronous API communication.

## Running it locally
Because this application connects to an external API, modern browser security policies (CORS) prevent it from running directly from a local file (`file:///`). It must be hosted on a local web server.

The WarpMind SDK & API Proxy: 
Instead of connecting directly to a commercial AI endpoint (which would expose sensitive API keys in the frontend code), this project utilizes a custom wrapper library provided by the university: **The WarpMind SDK**.

This SDK acts as a bridge between the client-side interface and a secure backend proxy server (`ai.cavi.au.dk`). Here is how the data flow works:

**Input & Abstraction:** 

When a user sends a message, the frontend passes the text to the `mind.chat()` method. The SDK abstracts away the need to write manual, boilerplate HTTP `fetch` requests and headers.


**Proxy Routing:**

The SDK forwards the request to the centralized university server. 


**Authentication & Security:** 

The server acts as a gatekeeper. It validates the runtime API key (entered securely by the user via a prompt) before passing the prompt along to the underlying Large Language Model.


**Asynchronous Resolution:**

Once the LLM generates a response, the proxy server routes it back through the SDK to the frontend, where the JavaScript `await` function resolves and updates the DOM.

## Screencast: 


https://github.com/user-attachments/assets/8b242921-c486-43f3-9f63-36a78893d8db

