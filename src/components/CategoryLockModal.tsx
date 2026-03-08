"use client";

import { useState } from "react";
import { LOCK_PIN } from "@/lib/lock-config";

interface Props {
  category: string;
  onUnlock: () => void;
  onClose: () => void;
}

export default function CategoryLockModal({ category, onUnlock, onClose }: Props) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === LOCK_PIN) {
      onUnlock();
      onClose();
    } else {
      setError(true);
      setPin("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-2xl shadow-xl w-full max-w-sm p-8">
        <div className="text-center mb-6">
          <div className="text-3xl mb-3">🔒</div>
          <h2 className="text-lg font-semibold text-text">{category}</h2>
          <p className="text-sm text-text-muted mt-1">このカテゴリはプライベートです</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={pin}
            onChange={(e) => {
              setPin(e.target.value);
              setError(false);
            }}
            placeholder="PINを入力"
            className={`w-full border rounded-xl px-4 py-3 text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-accent/50 bg-surface text-text ${
              error ? "border-red-400" : "border-border"
            }`}
            autoFocus
          />
          {error && (
            <p className="text-sm text-red-400 text-center">PINが違います</p>
          )}
          <button
            type="submit"
            className="w-full py-2.5 bg-accent text-white rounded-xl font-medium hover:bg-accent-dark transition-colors"
          >
            解除
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 text-sm text-text-muted hover:text-text transition-colors"
          >
            キャンセル
          </button>
        </form>
      </div>
    </div>
  );
}
