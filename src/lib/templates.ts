import { Template } from "./types";

export const BUILT_IN_TEMPLATES: Template[] = [
  {
    id: "tpl_travel",
    name: "旅行の好み",
    description: "旅行スタイル・好きな場所・予算感などを整理",
    categoryType: "private",
    category: "旅行",
    tags: ["旅行", "好み"],
    contentTemplate: `好きな旅行スタイル：
好きな場所・地域：
予算感：
宿泊の好み：
食事の好み（旅先）：
避けたいこと：
これまでの印象的な旅：`,
  },
  {
    id: "tpl_food",
    name: "食の好み",
    description: "好きな料理・食事制限・よく行くお店などを整理",
    categoryType: "private",
    category: "食事・グルメ",
    tags: ["食事", "グルメ"],
    contentTemplate: `好きな料理ジャンル：
食事制限・アレルギー：
よく行くお店のタイプ：
食材の好み：
嫌いな食べ物：
特別な日のお店候補：`,
  },
  {
    id: "tpl_skills",
    name: "技術スキル",
    description: "プログラミング言語・ツール・得意分野などを整理",
    categoryType: "work",
    category: "スキル",
    tags: ["スキル", "技術"],
    contentTemplate: `プログラミング言語（得意順）：
フレームワーク・ライブラリ：
クラウド・インフラ：
ツール：
得意なこと：
学習中：`,
  },
  {
    id: "tpl_current_job",
    name: "現在のポジション",
    description: "現職の役割・担当・環境などを整理",
    categoryType: "work",
    category: "現在の仕事",
    tags: ["仕事", "現職"],
    contentTemplate: `会社・チーム：
ポジション・役職：
主な担当業務：
使用技術・ツール：
チーム規模：
課題・改善したいこと：`,
  },
  {
    id: "tpl_health",
    name: "健康・体のこと",
    description: "運動習慣・睡眠・食事管理などを整理",
    categoryType: "private",
    category: "健康",
    tags: ["健康", "習慣"],
    contentTemplate: `運動習慣：
睡眠時間・質：
食事管理：
持病・気になること：
目標体型・健康目標：
サプリ・薬：`,
  },
  {
    id: "tpl_goal",
    name: "目標・キャリアビジョン",
    description: "短期・中長期の目標を整理",
    categoryType: "work",
    category: "目標",
    tags: ["目標", "キャリア"],
    contentTemplate: `3ヶ月後のゴール：
1年後のゴール：
3〜5年後のビジョン：
そのために今やること：
障壁・課題：`,
  },
  {
    id: "tpl_lifestyle",
    name: "ライフスタイル",
    description: "生活リズム・価値観・こだわりなどを整理",
    categoryType: "private",
    category: "ライフスタイル",
    tags: ["ライフスタイル", "価値観"],
    contentTemplate: `起床・就寝時間：
平日の過ごし方：
休日の過ごし方：
大切にしている価値観：
こだわり：
苦手なこと：`,
  },
  {
    id: "tpl_project",
    name: "進行中のプロジェクト",
    description: "現在関わっているプロジェクトの概要を整理",
    categoryType: "work",
    category: "プロジェクト",
    tags: ["プロジェクト"],
    contentTemplate: `プロジェクト名：
概要・目的：
自分の役割：
使用技術：
現在のフェーズ：
課題・ブロッカー：
次のマイルストーン：`,
  },
];
