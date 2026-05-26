import React, { useState, useRef } from "react";
import { BiMicrophone, BiMicrophoneOff } from "react-icons/bi";
import { IoClose }                       from "react-icons/io5";
import { useNavigate }                   from "react-router-dom";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export default function SearchBar({ isOpen, onClose }) {
  const [query, setQuery]         = useState("");
  const [listening, setListening] = useState(false);
  const recognition = useRef(null);
  const nav         = useNavigate();

  // Init speech recognition once
  if (!recognition.current && SpeechRecognition) {
    recognition.current = new SpeechRecognition();
    recognition.current.continuous     = false;
    recognition.current.lang           = "en-US";
    recognition.current.interimResults = false;

    recognition.current.onstart = () => setListening(true);
    recognition.current.onend   = () => setListening(false);
    recognition.current.onerror = (e) => {
      console.error("Speech error", e.error);
      setListening(false);
    };
    recognition.current.onspeechend = () => recognition.current.stop();
    recognition.current.onresult    = (e) => {
      const raw = e.results[0][0].transcript;
      const cleaned = raw
        .replace(/[^\p{L}\p{N}\s]/gu, "")
        .trim()
        .toLowerCase();
      recognition.current.stop();
      doSearch(cleaned);
      cleanup();
    };
  }

  // perform the fetch+navigate
  const doSearch = async (q) => {
    try {
      const res = await fetch(
        `/api/products/search?q=${encodeURIComponent(q)}`
      );
      const results = await res.json();
      if (results.length === 1) {
        nav(`/product/${results[0].id}`);
      } else {
        nav(`/search?query=${encodeURIComponent(q)}`);
      }
    } catch {
      nav(`/search?query=${encodeURIComponent(q)}`);
    }
  };

  // start voice
  const startListening = () => {
    if (!recognition.current) {
      return alert("Voice search not supported");
    }
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        stream.getTracks().forEach(t => t.stop());
        recognition.current.start();
      })
      .catch((err) => {
        console.error("Mic permission denied", err);
        alert("Please allow microphone access to use voice search.");
      });
  };

  // cleanup UI state & close overlay
  const cleanup = () => {
    if (recognition.current) recognition.current.stop();
    setListening(false);
    setQuery("");
    onClose();   // ← tell parent to close
  };

  // manual text search
  const onSubmit = (e) => {
    e.preventDefault();
    const cleaned = query
      .replace(/[^\p{L}\p{N}\s]/gu, "")
      .trim()
      .toLowerCase();
    if (cleaned) doSearch(cleaned);
    cleanup();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-0 left-0 w-full h-24 bg-white z-40 flex items-center justify-center shadow">
      {listening ? (
        <div className="relative w-3/4 max-w-xl">
          <input
            type="text"
            disabled
            placeholder="Listening..."
            className="w-full py-3 px-4 rounded-full border bg-gray-100 text-gray-700"
          />
          <button
            onClick={() => recognition.current.stop()}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-red-500 p-2 rounded-full shadow hover:bg-red-600"
            aria-label="Stop listening"
          >
            <BiMicrophoneOff className="h-6 w-6 text-white" />
          </button>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          className="flex items-center w-3/4 max-w-xl space-x-2"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 py-3 px-4 rounded-full border focus:outline-none"
          />
          <button
            type="button"
            onClick={startListening}
            className="h-12 w-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow"
            aria-label="Start voice search"
          >
            <BiMicrophone className="h-6 w-6 text-white" />
          </button>
          <button
            type="button"
            onClick={cleanup}
            className="h-12 w-12 flex items-center justify-center text-gray-600 hover:text-black"
            aria-label="Close search"
          >
            <IoClose className="h-6 w-6" />
          </button>
        </form>
      )}
    </div>
  );
}
