"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Copy, Check, User, Bot, Edit2, X, Save } from "lucide-react";
import { Message } from "./ChatInterface";
import MessageContent from "./MessageContent";
import FileAttachment from "./FileAttachment";

interface MessageBubbleProps {
  message: Message;
  onEditMessage?: (messageId: string, newContent: string) => void;
}

export default function MessageBubble({
  message,
  onEditMessage,
}: MessageBubbleProps) {
  const { user } = useUser();
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditContent(message.content);
  };

  const handleSaveEdit = () => {
    if (onEditMessage && editContent.trim() !== message.content) {
      onEditMessage(message.id, editContent.trim());
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(message.content);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSaveEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isUser = message.role === "user";

  return (
    <div
      className={`group w-full ${
        isUser ? "bg-coral-50/50 dark:bg-gray-800" : "bg-white dark:bg-gray-900"
      } border-b border-coral-100/50 dark:border-gray-700`}
    >
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-start space-x-4">
          {/* Avatar */}
          <div
            className={`
            w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg
            ${
              isUser
                ? "bg-coral-500 text-white"
                : "bg-coral-500 text-white"
            }
          `}
          >
            {isUser ? (
              user?.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt="User"
                  className="w-10 h-10 rounded-2xl"
                />
              ) : (
                <User className="h-5 w-5" />
              )
            ) : (
              <Bot className="h-5 w-5" />
            )}
          </div>

          {/* Message Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-3">
              <span className="font-bold text-gray-900 dark:text-white text-base">
                {isUser ? user?.firstName || "You" : "Veyra"}
              </span>
              {message.model && !isUser && (
                <span className="text-xs text-coral-600 dark:text-gray-400 bg-coral-100 dark:bg-gray-700 px-3 py-1 rounded-full font-medium">
                  {message.model}
                </span>
              )}
              {message.isEdited && (
                <span className="text-xs text-coral-500 dark:text-gray-400 italic font-medium">
                  (edited)
                </span>
              )}
            </div>

            {/* File Attachments */}
            {message.attachments && message.attachments.length > 0 && (
              <div className="mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {message.attachments.map((file) => (
                    <FileAttachment key={file.id} file={file} />
                  ))}
                </div>
              </div>
            )}

            {/* Message Content with Markdown Support or Edit Mode */}
            {message.content && (
              <div className="text-gray-900 dark:text-white leading-relaxed">
                {isEditing ? (
                  <div className="space-y-3">
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="w-full p-4 border border-coral-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-coral-400 focus:border-coral-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none transition-all duration-200"
                      rows={Math.max(3, editContent.split("\n").length)}
                      autoFocus
                    />
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleSaveEdit}
                        className="flex items-center space-x-2 px-4 py-2 bg-coral-500 text-white rounded-xl hover:bg-coral-600 transition-all duration-200 text-sm font-semibold shadow-lg hover:shadow-xl"
                      >
                        <Save className="h-4 w-4" />
                        <span>Save & Regenerate</span>
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all duration-200 text-sm font-semibold shadow-lg hover:shadow-xl"
                      >
                        <X className="h-4 w-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <MessageContent
                    content={message.content}
                    role={message.role}
                  />
                )}
              </div>
            )}

            {/* Message Actions */}
            <div className="flex items-center justify-between mt-4 pt-3">
              <span className="text-xs text-coral-500 dark:text-gray-400 font-medium">
                {formatTime(message.timestamp)}
              </span>

              {!isEditing && message.content && (
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  {isUser && onEditMessage && (
                    <button
                      onClick={handleEdit}
                      className="p-2 hover:bg-coral-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                      title="Edit message"
                    >
                      <Edit2 className="h-4 w-4 text-coral-500 dark:text-gray-400" />
                    </button>
                  )}
                  {!isUser && (
                    <button
                      onClick={copyToClipboard}
                      className="p-2 hover:bg-coral-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                      title="Copy message"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-coral-500" />
                      ) : (
                        <Copy className="h-4 w-4 text-coral-500 dark:text-gray-400" />
                      )}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}