# Veyra

**Veyra - Your AI-Powered Conversation Partner**

Experience the future of AI conversations with beautiful coral-themed design, intelligent memory, and seamless interactions.

## 🚀 Features

### 🤖 AI Integration

- **Multiple AI Models**: Support for GPT-3.5, GPT-4, Claude (Anthropic), and Gemini (Google)
- **Streaming Responses**: Real-time AI responses with typing indicators
- **Memory System**: Persistent conversation memory using Mem0 AI
- **Custom System Prompts**: Personalized AI behavior and context
- **Token Tracking**: Usage monitoring and optimization

### 💬 Chat Experience

- **Real-time Conversations**: Instant messaging with AI models
- **Message Editing**: Edit and regenerate AI responses
- **Conversation Branching**: Multiple response alternatives
- **Auto-generated Titles**: Smart conversation naming
- **Conversation Management**: Archive, search, and organize chats
- **Markdown Support**: Rich text formatting with syntax highlighting

### 📁 File Management

- **Multi-format Upload**: PDF, images, documents support
- **Cloud Storage**: Integrated with Cloudinary
- **File Analysis**: PDF text extraction and image processing
- **Drag & Drop**: Intuitive file upload interface
- **File Association**: Link files to specific messages and conversations

### 🔐 Authentication & Security

- **Clerk Integration**: Secure authentication with social login
- **JWT Tokens**: Stateless authentication

### 🎨 User Interface

- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Dark/Light Theme**: Customizable appearance
- **Modern UI**: Clean design with smooth animations
- **Accessibility**: WCAG compliant with keyboard navigation
- **Progressive Web App**: Installable with offline capabilities

## 🏗️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router and Coral Theme
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Modern utility-first styling with custom coral theme
- **Radix UI** - Accessible component primitives
- **Clerk** - Authentication and user management
- **Axios** - HTTP client for API requests
- **React Hook Form** - Form management with validation

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **Clerk** - Authentication middleware
- **Winston** - Logging system
- **Cloudinary** - File storage and processing
- **Swagger** - API documentation

### AI & Services

- **OpenAI API** - GPT models integration
- **Anthropic API** - Claude models
- **Google AI** - Gemini models
- **Mem0 AI** - Conversation memory system

### Design System

- **Coral Theme** - Beautiful coral/pink gradient design
- **Modern UI** - Rounded corners, shadows, and smooth animations
- **Responsive Design** - Optimized for all devices
- **Accessibility** - WCAG compliant with keyboard navigation

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB database
- Clerk account for authentication
- AI API keys (OpenAI, Anthropic, Google)
- Cloudinary account for file storage
- Mem0 account for memory features

## 🛠️ Development

### API Documentation

- Backend API documentation is available at `http://localhost:3001/docs`
- Interactive Swagger UI with all endpoints and schemas

### Code Quality

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting

## 🔧 Configuration

### AI Models

Configure available AI models in backend services:

- OpenAI: GPT-3.5-turbo, GPT-4, GPT-4-turbo
- Anthropic: Claude-3-sonnet, Claude-3-opus
- Google: Gemini-pro, Gemini-pro-vision

### File Upload Limits

- Maximum file size: 10MB
- Supported formats: PDF, JPG, PNG, GIF
- Cloudinary transformations for optimization

### Database Indexing

- User queries optimized with compound indexes
- Conversation and message queries optimized
- Full-text search capabilities

## 🧪 Testing

All Services have been tested end to end. For self-testing, please utilize the swagger documentations.
