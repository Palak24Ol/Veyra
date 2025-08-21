"use client";

import { useState } from "react";
import { useUser, UserButton, useAuth, useClerk } from "@clerk/nextjs";
import {
  Plus,
  MessageSquare,
  Trash2,
  Brain,
  ChevronLeft,
  Sun,
  Moon,
  LogOut,
} from "lucide-react";
import { Conversation } from "./ChatInterface";
import MemoryPanel from "./MemoryPanel";
import { useTheme } from "@/lib/theme-context";
import { apiClient } from "@/lib/api";
import { toast } from "sonner";

interface SidebarProps {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  onNewConversation: () => void;
  onSelectConversation: (conversation: Conversation) => void;
  onDeleteConversation: (conversationId: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({
  conversations,
  currentConversation,
  onNewConversation,
  onSelectConversation,
  onDeleteConversation,
  isOpen,
  onToggle,
}: SidebarProps) {
  const { user } = useUser();
  const { getToken } = useAuth();
  const { signOut } = useClerk();
  const { theme, toggleTheme } = useTheme();
  const [hoveredConversation, setHoveredConversation] = useState<string | null>(
    null
  );
  const [memoryPanelOpen, setMemoryPanelOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    try {
      const token = await getToken();
      if (token) {
        await apiClient.logout(token);
      }

      // Clear any local storage
      localStorage.clear();

      // Sign out with Clerk
      await signOut();

      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error during logout");

      // Still try to sign out even if API call fails
      try {
        await signOut();
      } catch (signOutError) {
        console.error("Sign out error:", signOutError);
      }
    } finally {
      setIsLoggingOut(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Unknown";

    const date = new Date(dateString);

    // Check if date is invalid
    if (isNaN(date.getTime())) {
      return "Unknown";
    }

    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays} days ago`;

    try {
      return date.toLocaleDateString();
    } catch (error) {
      console.error("Error formatting date:", error);
      return `${date}`;
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:relative z-50 lg:z-0
        h-full bg-gray-900 dark:bg-gray-800 text-white flex flex-col
        h-full coral-gradient text-white flex flex-col
        transition-all duration-300 ease-in-out
        ${
          isOpen
            ? "w-80 translate-x-0"
            : "w-0 lg:w-12 -translate-x-full lg:translate-x-0"
        }
      `}
      >
        {/* Collapsed state - only show toggle buttons */}
        {!isOpen && (
          <div className="hidden lg:flex flex-col h-full items-center py-6 space-y-3">
            <button
              onClick={onToggle}
              className="p-3 hover:bg-white/20 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl"
              title="Open sidebar"
            >
              <MessageSquare className="h-6 w-6" />
            </button>
            <button
              onClick={onNewConversation}
              className="p-3 hover:bg-white/20 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl"
              title="New chat"
            >
              <Plus className="h-6 w-6" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-3 hover:bg-white/20 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl"
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? (
                <Moon className="h-6 w-6" />
              ) : (
                <Sun className="h-6 w-6" />
              )}
            </button>

            {/* Spacer to push logout to bottom */}
            <div className="flex-1" />

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="p-3 hover:bg-red-500/80 rounded-2xl transition-all duration-200 disabled:opacity-50 shadow-lg hover:shadow-xl"
              title="Logout"
            >
              <LogOut className="h-6 w-6" />
            </button>
          </div>
        )}

        {/* Expanded state */}
        {isOpen && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <span className="font-bold text-xl">Veyra</span>
              </div>
              <button
                onClick={onToggle}
                className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200"
                title="Close sidebar"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="p-6 space-y-3">
              <button
                onClick={onNewConversation}
                className="w-full flex items-center space-x-3 p-4 bg-white/20 hover:bg-white/30 rounded-2xl transition-all duration-200 group backdrop-blur-sm shadow-lg hover:shadow-xl"
              >
                <Plus className="h-6 w-6" />
                <span className="font-semibold">New Chat</span>
              </button>

              <button
                onClick={() => setMemoryPanelOpen(true)}
                className="w-full flex items-center space-x-3 p-4 bg-white/15 hover:bg-white/25 rounded-2xl transition-all duration-200 backdrop-blur-sm shadow-lg hover:shadow-xl"
              >
                <Brain className="h-6 w-6" />
                <span className="font-semibold">AI Memory</span>
              </button>

              <button
                onClick={toggleTheme}
                className="w-full flex items-center space-x-3 p-4 bg-white/15 hover:bg-white/25 rounded-2xl transition-all duration-200 backdrop-blur-sm shadow-lg hover:shadow-xl"
              >
                {theme === "light" ? (
                  <Moon className="h-6 w-6" />
                ) : (
                  <Sun className="h-6 w-6" />
                )}
                <span className="font-semibold">{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
              </button>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
              <div className="px-6 pb-6">
                {conversations.length === 0 ? (
                  <div className="text-center text-white/70 py-12">
                    <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                      <MessageSquare className="h-8 w-8 opacity-70" />
                    </div>
                    <p className="font-semibold mb-1">No conversations yet</p>
                    <p className="text-sm opacity-80">Start a new chat to begin</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {conversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`
                          group relative flex items-center p-4 rounded-2xl cursor-pointer transition-all duration-200 backdrop-blur-sm
                          ${
                            currentConversation?.id === conversation.id
                              ? "bg-white/25 shadow-lg"
                              : "hover:bg-white/15"
                          }
                        `}
                        onClick={() => onSelectConversation(conversation)}
                        onMouseEnter={() =>
                          setHoveredConversation(conversation.id)
                        }
                        onMouseLeave={() => setHoveredConversation(null)}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate">
                            {conversation.title}
                          </p>
                          <p className="text-xs text-white/70 mt-1 font-medium">
                            {formatDate(conversation.lastMessageAt)} •{" "}
                            {conversation.model}
                          </p>
                        </div>

                        {(hoveredConversation === conversation.id ||
                          currentConversation?.id === conversation.id) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteConversation(conversation.id);
                            }}
                            className="p-2 hover:bg-red-500/80 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
                            title="Delete conversation"
                          >
                            <Trash2 className="h-4 w-4 text-white/80 hover:text-white" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* User Section */}
            <div className="border-t border-white/20 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10 rounded-2xl shadow-lg",
                    },
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-white/70 truncate">
                    {user?.emailAddresses[0]?.emailAddress}
                  </p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full flex items-center space-x-3 p-3 text-white/90 hover:bg-red-500/80 hover:text-white rounded-2xl transition-all duration-200 disabled:opacity-50 backdrop-blur-sm shadow-lg hover:shadow-xl"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-semibold">{isLoggingOut ? "Logging out..." : "Logout"}</span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Memory Panel */}
      <MemoryPanel
        isOpen={memoryPanelOpen}
        onClose={() => setMemoryPanelOpen(false)}
      />
    </>
  );
}
