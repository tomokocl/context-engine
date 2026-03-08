"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CategoryMeta,
  CATEGORY_POOL,
  CATEGORY_POOL_MAP,
  WORK_STYLE_MAP,
  INTEREST_MAP,
  FAMILY_MAP,
  generateCategories,
} from "@/lib/category-pool";
import { completeSetup } from "@/lib/user-settings";

const WORK_STYLES = Object.keys(WORK_STYLE_MAP);
const INTERESTS = Object.keys(INTEREST_MAP);
const FAMILY_STATUSES = Object.keys(FAMILY_MAP);
const TOTAL_STEPS = 4;

export default function SetupWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  // Step 1
  const [workStyle, setWorkStyle] = useState("");
  // Step 2
  const [interests, setInterests] = useState<string[]>([]);
  // Step 3
  const [familyStatuses, setFamilyStatuses] = useState<string[]>([]);
  // Step 4: generated + editable
  const [editableCategories, setEditableCategories] = useState<CategoryMeta[]>([]);
  const [lockedNames, setLockedNames] = useState<string[]>([]);
  const [customInput, setCustomInput] = useState("");

  const goNext = () => {
    if (step === 2) {
      // Generate categories before showing step 3
      const generated = generateCategories(workStyle, interests, familyStatuses);
      setEditableCategories(generated);
      setLockedNames(generated.filter((c) => c.defaultLocked).map((c) => c.name));
    }
    setStep((s) => s + 1);
  };
  const goBack = () => setStep((s) => s - 1);

  const toggleInterest = (interest: string) =>
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );

  const toggleFamily = (f: string) => {
    if (f === "一人暮らし") {
      setFamilyStatuses(["一人暮らし"]);
    } else {
      setFamilyStatuses((prev) => {
        const without = prev.filter((x) => x !== "一人暮らし");
        return without.includes(f) ? without.filter((x) => x !== f) : [...without, f];
      });
    }
  };

  const removeCategory = (name: string) => {
    setEditableCategories((prev) => prev.filter((c) => c.name !== name));
    setLockedNames((prev) => prev.filter((n) => n !== name));
  };

  const toggleLock = (name: string) =>
    setLockedNames((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );

  const addCategory = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed || editableCategories.some((c) => c.name === trimmed)) return;
    const meta = CATEGORY_POOL_MAP[trimmed] ?? { name: trimmed, icon: "·", defaultLocked: false };
    setEditableCategories((prev) => [...prev, meta]);
    setCustomInput("");
  };

  const handleComplete = () => {
    completeSetup(editableCategories, lockedNames);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-base flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-accent" : "bg-base-darker"
              }`}
            />
          ))}
        </div>

        {/* Step 0: ようこそ */}
        {step === 0 && (
          <StepCard
            title="ようこそ！"
            subtitle="いくつかの質問に答えるだけで、あなただけのカテゴリを自動で作ります。"
            onNext={goNext}
            nextDisabled={false}
            nextLabel="はじめる"
          >
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🚀</div>
              <p className="text-text-muted text-sm leading-relaxed">
                Context Engineは、AIに渡す「自分の情報」を管理するツールです。<br />
                カテゴリは後から設定で変更できます。
              </p>
            </div>
          </StepCard>
        )}

        {/* Step 1: 仕事スタイル */}
        {step === 1 && (
          <StepCard
            title="お仕事のスタイルを教えてください"
            subtitle="1つ選んでください"
            onNext={goNext}
            onBack={goBack}
            nextDisabled={!workStyle}
          >
            <div className="grid grid-cols-2 gap-2 mt-4">
              {WORK_STYLES.map((ws) => (
                <button
                  key={ws}
                  onClick={() => setWorkStyle(ws)}
                  className={`py-3 px-4 rounded-xl text-sm font-medium text-left transition-all ${
                    workStyle === ws
                      ? "bg-accent text-white shadow-md"
                      : "bg-base-dark text-text hover:bg-base-darker"
                  }`}
                >
                  {ws}
                </button>
              ))}
            </div>
          </StepCard>
        )}

        {/* Step 2: 興味・活動 */}
        {step === 2 && (
          <StepCard
            title="興味があること・やっていることは？"
            subtitle="複数選択できます（なければスキップ可）"
            onNext={goNext}
            onBack={goBack}
            nextDisabled={false}
          >
            <div className="flex flex-wrap gap-2 mt-4">
              {INTERESTS.map((interest) => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`py-2 px-3 rounded-full text-sm transition-all ${
                    interests.includes(interest)
                      ? "bg-accent text-white"
                      : "bg-base-dark text-text hover:bg-base-darker"
                  }`}
                >
                  {interests.includes(interest) ? "✓ " : ""}
                  {interest}
                </button>
              ))}
            </div>
          </StepCard>
        )}

        {/* Step 3: 家族構成 → 実際にはStep 2の後でgenerateが走る */}
        {step === 3 && (
          <StepCard
            title="カテゴリを確認・カスタマイズ"
            subtitle="追加・削除・🔒ロックの設定ができます"
            onNext={handleComplete}
            onBack={goBack}
            nextDisabled={editableCategories.length === 0}
            nextLabel="完了！使いはじめる"
          >
            {/* Chips */}
            <div className="flex flex-wrap gap-2 mt-4 mb-4">
              {editableCategories.map((cat) => {
                const locked = lockedNames.includes(cat.name);
                return (
                  <div
                    key={cat.name}
                    className="flex items-center gap-1 bg-base-dark rounded-full px-3 py-1.5 text-sm"
                  >
                    <span>{cat.icon}</span>
                    <span className="text-text">{cat.name}</span>
                    <button
                      onClick={() => toggleLock(cat.name)}
                      className={`ml-1 text-xs transition-colors ${
                        locked ? "text-yellow-400" : "text-text-muted hover:text-yellow-400"
                      }`}
                      title={locked ? "ロック解除" : "ロック設定"}
                    >
                      {locked ? "🔒" : "🔓"}
                    </button>
                    <button
                      onClick={() => removeCategory(cat.name)}
                      className="ml-0.5 text-text-muted hover:text-red-400 transition-colors leading-none"
                      title="削除"
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-text-muted mb-2">🔒 = PIN入力が必要なプライベートカテゴリ</p>

            {/* Add from pool */}
            <div className="border-t border-border pt-3">
              <p className="text-xs text-text-muted mb-2">カテゴリを追加</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {CATEGORY_POOL.filter(
                  (c) => !editableCategories.some((e) => e.name === c.name)
                ).map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => addCategory(cat.name)}
                    className="text-xs bg-base-darker text-text-muted hover:text-accent hover:bg-accent/10 rounded-full px-2.5 py-1 transition-colors"
                  >
                    + {cat.icon} {cat.name}
                  </button>
                ))}
              </div>

              {/* Custom input */}
              <div className="flex gap-2">
                <input
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addCategory(customInput)}
                  placeholder="自由入力でカテゴリ追加"
                  className="flex-1 text-sm bg-base border border-border rounded-lg px-3 py-1.5 text-text focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
                <button
                  onClick={() => addCategory(customInput)}
                  className="px-3 py-1.5 bg-accent text-white text-sm rounded-lg hover:bg-accent-dark transition-colors"
                >
                  追加
                </button>
              </div>
            </div>
          </StepCard>
        )}
      </div>
    </div>
  );
}

function StepCard({
  title,
  subtitle,
  children,
  onNext,
  onBack,
  nextDisabled,
  nextLabel = "次へ",
}: {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
  onNext: () => void;
  onBack?: () => void;
  nextDisabled: boolean;
  nextLabel?: string;
}) {
  return (
    <div className="bg-surface rounded-2xl shadow-xl p-6">
      <h2 className="text-xl font-semibold text-text mb-1">{title}</h2>
      <p className="text-sm text-text-muted mb-2">{subtitle}</p>
      {children}
      <div className="flex justify-between mt-6">
        {onBack ? (
          <button
            onClick={onBack}
            className="px-5 py-2 rounded-lg text-sm text-text-muted hover:bg-base-dark transition-colors"
          >
            ← 戻る
          </button>
        ) : (
          <span />
        )}
        <button
          onClick={onNext}
          disabled={nextDisabled}
          className="px-6 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {nextLabel} →
        </button>
      </div>
    </div>
  );
}
