# Backend Server

This is the backend server for the chatbot application. It's built with Express.js and uses Google's Generative AI for the chatbot functionality.

## Technologies

- [Bun](https://bun.sh/)
- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Google Generative AI](https://ai.google.dev/)
- [Zod](https://zod.dev/)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/docs/installation) installed on your machine.

### Installation

1.  Navigate to the `packages/server` directory:
    ```bash
    cd packages/server
    ```
2.  Install the dependencies:
    ```bash
    bun install
    ```

### Environment Variables

Create a `.env` file in the `packages/server` directory and add the following environment variable:

```
GOOGLE_API_KEY=your_google_api_key
```

You can get your API key from the [Google AI Studio](https://aistudio.google.com/).

### Running the Server

-   **Development:**
    ```bash
    bun run dev
    ```
    This will start the server in development mode with hot-reloading.

-   **Production:**
    ```bash
    bun run start
    ```
    This will start the server in production mode.

The server will be running on `http://localhost:3000`.