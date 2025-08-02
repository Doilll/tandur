"use client";

import React, { useState, useEffect } from "react";
import "./admin.css";

interface CsMessage {
  id: string;
  message: string;
  status: "UNREAD" | "READ" | "REPLIED";
  adminReply?: string;
  createdAt: string;
  repliedAt?: string;
  user: {
    name: string;
    email: string;
  };
}

const AdminDashboard: React.FC = () => {
  const [messages, setMessages] = useState<CsMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<CsMessage | null>(
    null
  );
  const [replyText, setReplyText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  // Fetch messages dari database
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/admin/messages");
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleReply = async (messageId: string) => {
    if (!replyText.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messageId,
          reply: replyText,
          adminEmail: "admin@example.com",
        }),
      });

      if (response.ok) {
        // Refresh messages
        await fetchMessages();
        setReplyText("");
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error("Error replying:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      await fetch(`/api/admin/messages/${messageId}/read`, {
        method: "PATCH",
      });

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId && msg.status === "UNREAD"
            ? { ...msg, status: "READ" as const }
            : msg
        )
      );
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  if (fetchLoading) {
    return (
      <div className="admin-dashboard mt-20">
        <div className="loading">Loading messages...</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard mt-20">
      <div className="admin-header">
        <h1>Admin Dashboard - CS Messages</h1>
        <button onClick={fetchMessages} className="refresh-btn">
          🔄 Refresh
        </button>
      </div>

      <div className="admin-content">
        <div className="messages-list">
          <h2>
            Pesan Masuk ({messages.filter((m) => m.status === "UNREAD").length}{" "}
            belum dibaca)
          </h2>
          {messages.length === 0 ? (
            <div className="no-messages">Belum ada pesan masuk</div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`message-item ${msg.status.toLowerCase()}`}
                onClick={() => {
                  setSelectedMessage(msg);
                  if (msg.status === "UNREAD") {
                    markAsRead(msg.id);
                  }
                }}
              >
                <div className="message-header">
                  <span className="user-email">{msg.user.email}</span>
                  <span className="timestamp">
                    {new Date(msg.createdAt).toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="message-preview">
                  {msg.message.substring(0, 60)}...
                </div>
                <div className={`status-badge ${msg.status.toLowerCase()}`}>
                  {msg.status === "UNREAD"
                    ? "Belum Dibaca"
                    : msg.status === "READ"
                    ? "Sudah Dibaca"
                    : "Sudah Dibalas"}
                </div>
              </div>
            ))
          )}
        </div>

        {selectedMessage && (
          <div className="message-detail">
            <div className="detail-header">
              <h3>Detail Pesan</h3>
              <button
                onClick={() => setSelectedMessage(null)}
                className="close-detail"
              >
                ×
              </button>
            </div>

            <div className="detail-content">
              <div className="user-info">
                <strong>Dari:</strong> {selectedMessage.user.name} (
                {selectedMessage.user.email})<br />
                <strong>Waktu:</strong>{" "}
                {new Date(selectedMessage.createdAt).toLocaleString("id-ID")}
              </div>

              <div className="original-message">
                <h4>Pesan:</h4>
                <p>{selectedMessage.message}</p>
              </div>

              {selectedMessage.adminReply && (
                <div className="admin-reply">
                  <h4>Balasan Anda:</h4>
                  <p>{selectedMessage.adminReply}</p>
                  <small>
                    Dibalas:{" "}
                    {selectedMessage.repliedAt
                      ? new Date(selectedMessage.repliedAt).toLocaleString(
                          "id-ID"
                        )
                      : "-"}
                  </small>
                </div>
              )}

              {selectedMessage.status !== "REPLIED" && (
                <div className="reply-section">
                  <h4>Balas Pesan:</h4>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Ketik balasan Anda..."
                    rows={4}
                  />
                  <button
                    onClick={() => handleReply(selectedMessage.id)}
                    disabled={isLoading || !replyText.trim()}
                    className="reply-btn"
                  >
                    {isLoading ? "Mengirim..." : "Kirim Balasan"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
