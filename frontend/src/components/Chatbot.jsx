// src/components/Chatbot.jsx
import React, { useState, useRef, useEffect } from 'react';

const QUICK_REPLIES = [
  "Show me Electronics",
  "Women's fashion",
  "Grocery deals",
  "Track my order",
  "Return policy",
  "Contact support",
];

const FAQS = {
  "return": "🔄 **Return Policy**: You can return most items within **30 days** of purchase. Items must be in original condition with receipt. Visit any Walmart store or initiate a return online from your order history.",
  "track": "📦 **Order Tracking**: Go to your **Profile → My Orders** page to see real-time status of all your orders. You'll also receive email updates at each stage.",
  "shipping": "🚚 **Shipping Info**: We offer **free shipping** on orders over ₹500. Standard delivery takes 3-5 business days. Express delivery (1-2 days) is available at checkout.",
  "payment": "💳 **Payment Methods**: We accept Credit/Debit cards, UPI, Net Banking, Wallets (PhonePe, GPay, Paytm), and Cash on Delivery.",
  "cancel": "❌ **Cancel Order**: Orders can be cancelled within **1 hour** of placing them. Go to Profile → My Orders → Select order → Cancel. After 1 hour, contact our support team.",
  "contact": "📞 **Contact Support**:\n• **Email**: support@walmart.in\n• **Phone**: 1800-XXX-XXXX (Mon–Sat, 9AM–6PM)\n• **Chat**: Available 24/7 right here!",
  "discount": "🏷️ **Current Deals**: Check our **Trending** and **Only at Walmart** sections for exclusive discounts up to 70% off! New deals are added every day.",
  "warranty": "🛡️ **Warranty**: Most electronics come with a **manufacturer warranty** of 1 year. Extended warranty plans are available at checkout.",
  "account": "👤 **Account Help**: Click the user icon in the top navbar to access your profile, orders, and settings. You can update your details anytime.",
};

const CATEGORY_MAP = {
  "electronics": "electronics",
  "grocery": "grocery",
  "furniture": "furniture",
  "men": "men",
  "women": "women",
  "trending": "trending",
};

function getBotResponse(text, products) {
  const lower = text.toLowerCase();

  // Greetings
  if (/^(hi|hello|hey|good morning|good evening|good afternoon|hola|namaste)/.test(lower)) {
    return {
      text: "👋 Hello! I'm **Wally**, your Walmart shopping assistant! How can I help you today?\n\nYou can ask me about products, orders, returns, shipping, and more!",
      type: "text",
    };
  }

  // FAQ matching
  for (const [key, answer] of Object.entries(FAQS)) {
    if (lower.includes(key)) {
      return { text: answer, type: "text" };
    }
  }

  // Category browse
  for (const [keyword, category] of Object.entries(CATEGORY_MAP)) {
    if (lower.includes(keyword)) {
      const matches = products.filter(p => p.category?.toLowerCase() === category).slice(0, 3);
      if (matches.length > 0) {
        return {
          text: `🛍️ Here are some **${keyword}** items for you:`,
          type: "products",
          products: matches,
          link: `/category/${category}`,
          linkLabel: `View all ${keyword} →`,
        };
      }
    }
  }

  // Search in product names
  if (lower.length > 2) {
    const matches = products.filter(p =>
      p.name?.toLowerCase().includes(lower) ||
      p.category?.toLowerCase().includes(lower)
    ).slice(0, 3);
    if (matches.length > 0) {
      return {
        text: `🔍 Found **${matches.length}** result(s) for "${text}":`,
        type: "products",
        products: matches,
        link: `/search?q=${encodeURIComponent(text)}`,
        linkLabel: "See all results →",
      };
    }
  }

  // Fallback
  return {
    text: `🤔 I'm not sure about that, but I'm always learning!\n\nTry asking about:\n• **Products** (e.g. "Show me electronics")\n• **Orders** (e.g. "Track my order")\n• **Returns, Shipping, Payment**\n• **Deals and discounts**`,
    type: "text",
  };
}

function formatText(text) {
  // Bold: **text**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part.split('\n').map((line, j, arr) => (
      <span key={`${i}-${j}`}>{line}{j < arr.length - 1 ? <br /> : null}</span>
    ));
  });
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "👋 Hi there! I'm **Wally**, your personal Walmart shopping assistant.\n\nAsk me anything — products, orders, returns, shipping and more!",
      type: "text",
      id: 0,
    }
  ]);
  const [input, setInput] = useState("");
  const [products, setProducts] = useState([]);
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    fetch("/api/products")
      .then(r => r.json())
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, messages]);

  const sendMessage = (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed) return;

    const userMsg = { from: "user", text: trimmed, type: "text", id: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const response = getBotResponse(trimmed, products);
      const botMsg = { from: "bot", ...response, id: Date.now() + 1 };
      setMessages(prev => [...prev, botMsg]);
      setTyping(false);
      if (!open) setUnread(u => u + 1);
    }, 700 + Math.random() * 500);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => { setOpen(o => !o); setUnread(0); }}
        style={{
          position: "fixed", bottom: "24px", right: "24px", zIndex: 9999,
          width: "60px", height: "60px", borderRadius: "50%",
          background: "linear-gradient(135deg, #0071ce 0%, #004f9a 100%)",
          border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(0,113,206,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,113,206,0.6)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,113,206,0.5)"; }}
        aria-label="Open chat"
      >
        {open ? (
          <svg width="22" height="22" fill="white" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        ) : (
          <svg width="26" height="26" fill="white" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
        )}
        {unread > 0 && !open && (
          <span style={{
            position: "absolute", top: "0", right: "0",
            background: "#ffc220", color: "#000", borderRadius: "50%",
            width: "20px", height: "20px", fontSize: "11px", fontWeight: "700",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>{unread}</span>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div style={{
          position: "fixed", bottom: "96px", right: "24px", zIndex: 9998,
          width: "370px", maxWidth: "calc(100vw - 48px)",
          height: "560px", maxHeight: "calc(100vh - 120px)",
          borderRadius: "20px", overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          display: "flex", flexDirection: "column",
          fontFamily: "'Inter', sans-serif",
          animation: "chatSlideUp 0.25s ease-out",
        }}>
          <style>{`
            @keyframes chatSlideUp {
              from { opacity: 0; transform: translateY(20px) scale(0.95); }
              to   { opacity: 1; transform: translateY(0) scale(1); }
            }
            .chat-msg-bubble { animation: bubblePop 0.2s ease-out; }
            @keyframes bubblePop {
              from { opacity: 0; transform: translateY(8px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            .chat-scroll::-webkit-scrollbar { width: 4px; }
            .chat-scroll::-webkit-scrollbar-thumb { background: #ddd; border-radius: 4px; }
            .quick-chip:hover { background: #0071ce !important; color: white !important; }
            .product-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
          `}</style>

          {/* Header */}
          <div style={{
            background: "linear-gradient(135deg, #0071ce 0%, #004f9a 100%)",
            padding: "16px 18px", display: "flex", alignItems: "center", gap: "12px",
          }}>
            <div style={{
              width: "42px", height: "42px", borderRadius: "50%",
              background: "#ffc220", display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "20px", flexShrink: 0,
            }}>🛒</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "white", fontWeight: "700", fontSize: "15px" }}>Wally</div>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px", display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#4ade80", display: "inline-block" }}></span>
                Walmart Shopping Assistant
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{
              background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer",
              width: "30px", height: "30px", borderRadius: "50%", color: "white",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px",
            }}>×</button>
          </div>

          {/* Messages */}
          <div className="chat-scroll" style={{
            flex: 1, overflowY: "auto", padding: "16px",
            background: "#f8fafc", display: "flex", flexDirection: "column", gap: "12px",
          }}>
            {messages.map(msg => (
              <div key={msg.id} className="chat-msg-bubble" style={{
                display: "flex", flexDirection: msg.from === "user" ? "row-reverse" : "row",
                alignItems: "flex-end", gap: "8px",
              }}>
                {msg.from === "bot" && (
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "50%", background: "#0071ce",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "13px", flexShrink: 0,
                  }}>🛒</div>
                )}
                <div style={{ maxWidth: "80%" }}>
                  <div style={{
                    background: msg.from === "user"
                      ? "linear-gradient(135deg, #0071ce, #004f9a)"
                      : "white",
                    color: msg.from === "user" ? "white" : "#1a1a2e",
                    padding: "10px 14px", borderRadius: msg.from === "user"
                      ? "18px 18px 4px 18px"
                      : "18px 18px 18px 4px",
                    fontSize: "13.5px", lineHeight: "1.5",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  }}>
                    {msg.type === "text" && <span>{formatText(msg.text)}</span>}
                    {msg.type === "products" && (
                      <div>
                        <span>{formatText(msg.text)}</span>
                        <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
                          {msg.products.map((p, i) => (
                            <a key={i} href={`/product/${p.id || p._id}`} className="product-card" style={{
                              display: "flex", gap: "10px", background: "#f8fafc",
                              borderRadius: "10px", padding: "8px", textDecoration: "none",
                              transition: "transform 0.15s, box-shadow 0.15s",
                              border: "1px solid #e2e8f0",
                            }}>
                              <img src={p.image} alt={p.name} style={{
                                width: "48px", height: "48px", borderRadius: "6px",
                                objectFit: "cover", flexShrink: 0,
                              }} onError={e => { e.target.style.display = 'none'; }} />
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: "12px", fontWeight: "600", color: "#1a1a2e", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
                                <div style={{ fontSize: "13px", fontWeight: "700", color: "#0071ce", marginTop: "2px" }}>₹{(p.price || 0).toLocaleString()}</div>
                              </div>
                            </a>
                          ))}
                        </div>
                        {msg.link && (
                          <a href={msg.link} style={{
                            display: "inline-block", marginTop: "8px",
                            color: "#0071ce", fontSize: "12px", fontWeight: "600",
                            textDecoration: "none",
                          }}>{msg.linkLabel}</a>
                        )}
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: "10px", color: "#94a3b8", marginTop: "3px", textAlign: msg.from === "user" ? "right" : "left" }}>
                    {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            ))}

            {typing && (
              <div className="chat-msg-bubble" style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
                <div style={{
                  width: "28px", height: "28px", borderRadius: "50%", background: "#0071ce",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px",
                }}>🛒</div>
                <div style={{
                  background: "white", borderRadius: "18px 18px 18px 4px",
                  padding: "12px 16px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  display: "flex", gap: "4px", alignItems: "center",
                }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{
                      width: "6px", height: "6px", borderRadius: "50%", background: "#0071ce",
                      animation: `bounce 1.2s infinite ${i * 0.2}s`,
                      display: "inline-block",
                    }} />
                  ))}
                  <style>{`
                    @keyframes bounce {
                      0%, 60%, 100% { transform: translateY(0); }
                      30% { transform: translateY(-6px); }
                    }
                  `}</style>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies */}
          <div style={{
            padding: "8px 12px", background: "#f8fafc",
            borderTop: "1px solid #e2e8f0",
            display: "flex", gap: "6px", flexWrap: "nowrap", overflowX: "auto",
          }}>
            {QUICK_REPLIES.map((q, i) => (
              <button key={i} className="quick-chip" onClick={() => sendMessage(q)} style={{
                background: "white", border: "1.5px solid #e2e8f0", borderRadius: "20px",
                padding: "5px 12px", fontSize: "11.5px", fontWeight: "600", color: "#334155",
                cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
                transition: "all 0.15s",
              }}>{q}</button>
            ))}
          </div>

          {/* Input */}
          <div style={{
            padding: "12px 14px", background: "white",
            borderTop: "1px solid #e2e8f0",
            display: "flex", gap: "8px", alignItems: "center",
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask me anything..."
              style={{
                flex: 1, border: "1.5px solid #e2e8f0", borderRadius: "24px",
                padding: "10px 16px", fontSize: "13.5px", outline: "none",
                background: "#f8fafc", color: "#1a1a2e",
                transition: "border-color 0.15s",
              }}
              onFocus={e => e.target.style.borderColor = "#0071ce"}
              onBlur={e => e.target.style.borderColor = "#e2e8f0"}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim()}
              style={{
                width: "40px", height: "40px", borderRadius: "50%", border: "none",
                background: input.trim() ? "linear-gradient(135deg, #0071ce, #004f9a)" : "#e2e8f0",
                cursor: input.trim() ? "pointer" : "not-allowed",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s", flexShrink: 0,
              }}
            >
              <svg width="16" height="16" fill={input.trim() ? "white" : "#94a3b8"} viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
