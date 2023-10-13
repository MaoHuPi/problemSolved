⍝ 2023 © MaoHuPi
⍝ sortWordsByHT.apl
⍝ 以首尾字母做單字排序

L1 ← 'connect' 'animal' 'country' 'collaboration'
L2 ← 'apple' 'article' 'constructor'
L3 ← 'quotation' 'animation' 'relative'
words ← ⊃ ,/ L1 L2 L3
words
⍝ ┌───────┬──────┬───────┬─────────────┬─────┬───────┬───────────┬─────────┬─────────┬────────┐
⍝ │connect│animal│country│collaboration│apple│article│constructor│quotation│animation│relative│
⍝ └───────┴──────┴───────┴─────────────┴─────┴───────┴───────────┴─────────┴─────────┴────────┘
{(⊂⍋↓⍉↑((↑⍵)[⍳⍴⍵;1]) ({⍵⌷↑words}¨↓⍉↑(⍳⍴⍵) (⍴¨⍵)))⌷⍵} words
⍝ ┌─────┬───────┬──────┬─────────┬─────────────┬───────────┬───────┬───────┬─────────┬────────┐
⍝ │apple│article│animal│animation│collaboration│constructor│connect│country│quotation│relative│
⍝ └─────┴───────┴──────┴─────────┴─────────────┴───────────┴───────┴───────┴─────────┴────────┘
