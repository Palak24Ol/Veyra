"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { Brain, Trash2, RefreshCw, X } from "lucide-react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api";

interface Memory {
  id: string;
  memory: string;
  created_at: string;
}

interface MemoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MemoryPanel({ isOpen, onClose }: MemoryPanelProps) {
  const { getToken } = useAuth();
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadMemories();
    }
  }, [isOpen]);

  const loadMemories = async () => {
    try {
      setIsLoading(true);
      const token = await getToken();
      if (!token) return;

      const data = await apiClient.getUserMemories(token);
      setMemories(data.memories || []);
    } catch (error) {
      console.error("Error loading memories:", error);
      toast.error("Failed to load memories");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAllMemories = async () => {
    if (
      !confirm(
        "Are you sure you want to delete all memories? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const token = await getToken();
      if (!token) return;

      await apiClient.deleteUserMemories(token);
      setMemories([]);
      toast.success("All memories deleted successfully");
    } catch (error) {
      console.error("Error deleting memories:", error);
      toast.error("Failed to delete memories");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl border border-coral-200/50">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-coral-200/50">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-coral-100 rounded-2xl flex items-center justify-center">
              <Brain className="h-6 w-6 text-coral-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">AI Memory</h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={loadMemories}
              disabled={isLoading}
              className="p-2 hover:bg-coral-100 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
              title="Refresh memories"
            >
              <RefreshCw
                className={`h-5 w-5 text-coral-600 ${
                  isLoading ? "animate-spin" : ""
                }`}
              />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-coral-100 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <X className="h-5 w-5 text-coral-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="mb-4">
            <p className="text-base text-gray-600 mb-6 leading-relaxed">
              Veyra remembers important details from your conversations to
              provide more personalized responses. These memories help maintain
              context across different chat sessions.
            </p>

            {memories.length > 0 && (
              <button
                onClick={deleteAllMemories}
                className="flex items-center space-x-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
              >
                <Trash2 className="h-5 w-5" />
                <span>Delete All Memories</span>
              </button>
            )}
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-8 w-8 animate-spin text-coral-400" />
              <span className="ml-3 text-gray-600 font-semibold">Loading memories...</span>
            </div>
          ) : memories.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-coral-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Brain className="h-10 w-10 text-coral-400" />
              </div>
              <p className="text-gray-500 mb-2 font-semibold text-lg">No memories yet</p>
              <p className="text-sm text-gray-400 leading-relaxed">
                Start chatting with Veyra to build up your conversation memory
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {memories.map((memory) => (
                <div
                  key={memory.id}
                  className="bg-coral-50/50 rounded-2xl p-5 border border-coral-200/50 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <p className="text-sm text-gray-900 mb-3 leading-relaxed font-medium">{memory.memory}</p>
                  <p className="text-xs text-coral-500 font-medium">
                    {formatDate(memory.created_at)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-coral-200/50 p-6">
          <p className="text-xs text-coral-500 text-center font-medium">
            Memories are stored securely and used only to improve your chat
            experience
          </p>
        </div>
      </div>
    </div>
  );
}
