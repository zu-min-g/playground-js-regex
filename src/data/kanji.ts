import { CharList } from "../CharList"
import joyoList from "./joyo"
import jinmeiList from "./jinmei"

/**
 * 常用漢字リスト
 *
 * 参考： https://www.bunka.go.jp/kokugo_nihongo/sisaku/joho/joho/kijun/naikaku/kanji/joyokanjisakuin/index.html
 */
export const joyo = new CharList(joyoList)

/**
 * 人名用漢字リスト
 *
 * 以下の 戸籍統一文字番号 は以下の Unicode を割り当てています。
 *
 * | 戸籍統一文字番号 | Unicode | 備考                    |
 * | :--------------- | :------ | :---------------------- |
 * | 221830           | U+821C  | 舜                      |
 * | 400370           | U+8A0A  | 訊の9画目のはらいが横棒 |
 * | 551530           | U+9F8D  | 龍の1画目が横棒         |
 */
export const jinmei = new CharList(jinmeiList)

/**
 * 子の名に使える漢字
 *
 * 常用漢字 + 人名リスト
 */
export const childName = new CharList(joyoList.concat(jinmeiList))
