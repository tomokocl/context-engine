import { Template } from "./types";

export const BUILT_IN_TEMPLATES: Template[] = [
  {
    id: "tpl_ai_usage",
    name: "AI活用スタンス",
    description: "AIとの付き合い方・使い方の方針を整理",
    categoryType: "private",
    category: "AI・ツール活用",
    tags: ["AI", "ツール", "方針"],
    contentTemplate: `よく使うAIツール：
AIに任せていること：
AIに任せないこと（自分でやること）：
プロンプトで意識していること：
AIと上手く付き合うために大事にしていること：
今試しているAI活用：`,
  },
  {
    id: "tpl_sns_style",
    name: "SNS・発信スタイル",
    description: "発信のトーン・ターゲット・こだわりを整理",
    categoryType: "private",
    category: "発信・コンテンツ",
    tags: ["SNS", "発信", "ブランディング"],
    contentTemplate: `主な発信媒体：
発信のターゲット：
発信で伝えたいこと・軸：
文章のトーン・スタイル：
やっていないこと・避けていること：
バズより大事にしていること：`,
  },
  {
    id: "tpl_work_philosophy",
    name: "仕事・ビジネス観",
    description: "フリーランスとしての仕事観・方針を整理",
    categoryType: "private",
    category: "仕事・ビジネス観",
    tags: ["仕事", "フリーランス", "方針"],
    contentTemplate: `現在の仕事内容：
大事にしている仕事の基準：
受けない仕事の条件：
理想のクライアント像：
収益・働き方の目標：
今後やりたい仕事の方向性：`,
  },
  {
    id: "tpl_skill_growth",
    name: "スキル・成長マップ",
    description: "今の強み・伸ばしたいスキルを整理",
    categoryType: "private",
    category: "スキル・成長",
    tags: ["スキル", "成長", "強み"],
    contentTemplate: `得意なこと・強み：
苦手なこと：
今学んでいること：
3ヶ月後に身につけたいスキル：
成長を感じる瞬間：
スキルアップで大事にしていること：`,
  },
  {
    id: "tpl_philosophy",
    name: "思想・価値観",
    description: "人生観・判断軸・行動原則を整理",
    categoryType: "private",
    category: "思想・価値観",
    tags: ["価値観", "思想", "判断軸"],
    contentTemplate: `人生で大事にしていること：
判断に迷ったときの軸：
やらないと決めていること：
影響を受けた考え方・人：
今の自分を形成した経験：
未来の自分に残したい信念：`,
  },
  {
    id: "tpl_family",
    name: "育児・家族",
    description: "子育ての方針・家族の状況を整理",
    categoryType: "private",
    category: "育児・家族",
    tags: ["育児", "家族", "方針"],
    contentTemplate: `家族構成：
育児で大事にしていること：
子どもに伝えたいこと：
仕事と育児のバランスで工夫していること：
家族との時間の過ごし方：
育児で悩んでいること：`,
  },
  {
    id: "tpl_money",
    name: "資産・お金の方針",
    description: "お金の使い方・管理・目標を整理",
    categoryType: "private",
    category: "資産・お金",
    tags: ["資産", "お金", "管理"],
    contentTemplate: `お金に対する考え方・スタンス：
収入の管理方法：
資産運用・投資の状況：
絶対削らない支出：
削りたい支出：
お金の中期目標：`,
  },
  {
    id: "tpl_health",
    name: "健康・身体の管理",
    description: "健康習慣・体の状態・目標を整理",
    categoryType: "private",
    category: "健康・身体",
    tags: ["健康", "習慣", "身体"],
    contentTemplate: `運動習慣：
睡眠時間・質：
食事のこだわり：
気になっている体のこと：
メンタルケアでやっていること：
健康目標：`,
  },
  {
    id: "tpl_relationships",
    name: "人間関係のスタンス",
    description: "付き合い方・大切にしている関係を整理",
    categoryType: "private",
    category: "人間関係",
    tags: ["人間関係", "コミュニケーション"],
    contentTemplate: `人間関係で大事にしていること：
付き合い方のスタイル：
距離を置きたいタイプ：
大切にしている関係性：
コミュニティ・所属：
人間関係で悩んでいること：`,
  },
];
