#!/usr/bin/env apl --script
⍝ 2023 © MaoHuPi
⍝ sortTextbookVocabulary.apl
⍝ 串接文字檔內單字，並以首尾字母做單字排序

⍝ Based on GNU APL

∇_←pathList STV∆fromTextFiles pathList;_
  words ← ⊃,/(⎕UCS 10){(~⍵∊⍺)⊂,⍵}¨{⎕UCS (⎕FIO[6] ⎕FIO[3] ⍵)}¨{⍵⊢[(≡⍵)=1]⊂⍵}pathList

  sortWordsByHT ← {(⊂⍋⊂[2]⍉⊃((⊃⍵)[⍳⍴⍵;1]) ({⍵⌷⊃words}¨⊂[2]⍉⊃(⍳⍴⍵) (⍴¨⍵)))⌷⍵}
  _ ← sortWordsByHT words
∇

⍝ sortedWords ← ⊃{⍺,(⎕UCS 10),⍵}/ STV∆fromTextFiles {'data/B3',⍵,'.txt'}¨('L1' 'L2' 'L3' 'R1')
⍝ sortedWords ⎕FIO[43] ('w+' ⎕FIO[3] 'data/sorted.txt')
⍝ sortedWords
