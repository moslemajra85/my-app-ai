# Chatbot Application

This is a chatbot application built with the MERN stack (MongoDB, Express, React, Node.js) and powered by Google's Generative AI.

## Project Structure

This project is a monorepo with two packages:

-   `packages/client`: The frontend React application.
-   `packages/server`: The backend Express server.

## Getting Started

### Prerequisites

-   [Bun](https://bun.sh/docs/installation) installed on your machine.
-   A Google API key with the Generative AI API enabled. You can get your API key from the [Google AI Studio](https://aistudio.google.com/).

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Install the dependencies for both the client and server:
    ```bash
    bun install
    ```

### Environment Variables

Create a `.env` file in the `packages/server` directory and add the following environment variable:

```
GOOGLE_API_KEY=your_google_api_key
```

### Running the Application

You can run both the client and server concurrently.

1.  **Start the backend server:**
    ```bash
    cd packages/server
    bun run dev
    ```
    The server will be running on `http://localhost:3000`.

2.  **Start the frontend client:**
    In a new terminal session:
    ```bash
    cd packages/client
    bun run dev
    ```
    The client will be running on `http://localhost:5173`.

Now you can open your browser and navigate to `http://localhost:5173` to use the chatbot.

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.