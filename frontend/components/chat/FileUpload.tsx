"use client";

import { useState, useRef } from "react";
import { useAuth } from "@clerk/nextjs";
import { Upload, X, FileIcon, Loader2 } from "lucide-react";
import { fileService, UploadedFile } from "@/lib/file-service";
import { toast } from "sonner";

interface FileUploadProps {
  onFileUploaded: (file: UploadedFile) => void;
  onClose: () => void;
  isOpen: boolean;
}

export default function FileUpload({
  onFileUploaded,
  onClose,
  isOpen,
}: FileUploadProps) {
  const { getToken } = useAuth();
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      toast.error("File size must be less than 10MB");
      return;
    }

    setIsUploading(true);
    try {
      const token = await getToken();
      if (!token) {
        toast.error("Authentication required");
        return;
      }

      const uploadedFile = await fileService.uploadFile(file, token);
      onFileUploaded(uploadedFile);
      toast.success("File uploaded successfully");
      onClose();
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full border border-coral-200/50">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-coral-200/50 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Upload File
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-coral-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200"
            disabled={isUploading}
          >
            <X className="h-5 w-5 text-coral-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Upload Area */}
        <div className="p-8">
          <div
            className={`
              border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 cursor-pointer
              ${
                isDragging
                  ? "border-coral-400 bg-coral-50 dark:bg-coral-900/20 transform scale-105"
                  : "border-coral-200 dark:border-gray-600 hover:border-coral-300 dark:hover:border-gray-500"
              }
              ${isUploading ? "pointer-events-none opacity-50" : ""} shadow-inner
            `}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => !isUploading && fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileSelect}
              disabled={isUploading}
              accept="image/*,video/*,audio/*,.pdf,.doc,.txt,.csv,.xlsx,.ppt,.pptx,.zip,.rar"
            />

            {isUploading ? (
              <div className="flex flex-col items-center space-y-3">
                <Loader2 className="h-14 w-14 text-coral-500 animate-spin" />
                <p className="text-gray-600 dark:text-gray-300 font-semibold">Uploading...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 bg-coral-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center shadow-lg">
                  {isDragging ? (
                    <Upload className="h-8 w-8 text-coral-500" />
                  ) : (
                    <FileIcon className="h-8 w-8 text-coral-500 dark:text-gray-400" />
                  )}
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white font-bold text-lg">
                    {isDragging
                      ? "Drop file here"
                      : "Choose file or drag and drop"}
                  </p>
                  <p className="text-sm text-coral-500 dark:text-gray-400 mt-2 font-medium">
                    Images, videos, documents up to 10MB
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Supported formats */}
          <div className="mt-6">
            <p className="text-xs text-coral-400 dark:text-gray-400 text-center font-medium">
              Supported formats: JPG, PNG, GIF, MP4, MP3, PDF, DOC, XLS, PPT,
              ZIP
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
