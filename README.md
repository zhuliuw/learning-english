# 清楚学英语

给已经工作的中文使用者的成人笔记。静态网站，默认中文，右上角可以换成英文。没有账号，没有后端。访问会按页面和时间计数，不记名字。

## 在本地查看

在仓库根目录执行：

```bash
python3 -m http.server 8000
```

浏览器打开 <http://localhost:8000/>。

请用本地服务器打开，不要直接双击 HTML。页面、样式、音频和语言切换都写成相对路径，所以同一套文件放在仓库根目录，或放在 `/learning-english/` 下面，都能打开。直接双击文件时，目录链接不一定找得到页面。

## 现在有什么

- 首页：怎么开始指向 [这一周](week/)
- [这一周](week/)：听、读、说、写各一次，再留一天休息或只看一个修改点。可以打印。勾选不存在网站里
- [课文](lessons/)：已经有的课，链到各课
- [怎么学](method/)：一课只做一件事，做完只留一个修改点
- [听](listen/)：四段不到一分钟的音频。听完用中文说出谁做了什么，或第二遍只补一个词。原文默认折着
- [说](speak/)：四课跟读，用的是听过的句子。用自己的手机录音，网站不接收
- [写](write/)：四课。从读过的句子换一个自己的细节，对照四条清单。写在课文页的框里，不打分
- [读](read/)：五课，每篇大约 220–320 个词。前两课找谁在做什么，后三课看代词指回谁。没有词表，也没有音频

英文是同一套页面，放在 `en/` 下面。课文里的英文原文两边相同，说明按各自的语言写。

听力文件在 `assets/audio/`，全站只用 wav。句子是本站写的。声音用 espeak-ng 的美国英语、同一语速合成，可再分发。不是教科书、歌曲或影视录音。页面上没有变速控件。

课文页上可以写下这一课的答案，或给口语的三问自己做标记。字和标记只留在这次浏览的浏览器里，用本站的 `assets/js/practice.js`。不上传，不打分，也没有账号。听力要先写了，才能打开原文和核对。听的四课、读的五课和写作第一课，写完可以再来一轮：把这一课里的四五个词按原句点回去。阅读要先写下三问。对错只显示在这一页，不记分，也不上传。

页面不加载外部字体。访问次数由本站的 `assets/js/visits.js` 送出，不嵌入第三方脚本。

## 访问次数

GitHub Pages 不能把访问记在仓库里，也跑不了服务器。每一页打开时，`assets/js/visits.js` 向 Abacus 发一次请求。请求里只有页面路径和打开时间。不需要账号，也没有密钥。

次数记在命名空间 `zhuliuw-learning-english` 下面，一页一个数字。地址里的 `/learning-english/` 会先去掉，再按页面计数，这样和仓库根目录打开时是同一页。Abacus 不保留每一次的时间列表，只保留这个数字。网站上不放次数，也不放打开计数器的链接。

主人看次数：https://abacus.jasoncameron.dev/get/zhuliuw-learning-english/home

其他页把路径里的斜线换成连字符，首页的键是 `home`。听第一课是 `listen-lesson-01`。

不收集名字、账号、课文里写下的字、口语录音、再来一轮的对错。练习答案仍只留在这次浏览的浏览器里。Abacus 作为接收请求的服务器，看得到这次网络连接。

<https://zhuliuw.github.io/learning-english/> 仍然是静态页面。在有别的主机之前，它不会自己存一份访问记录。不要为了次数去改 GitHub Pages 的设置。

## 在线地址

发布地址是 <https://zhuliuw.github.io/learning-english/>。

<https://zhuliuw.github.io/> 是另一个用户站点，和这个仓库分开。不要改那个仓库来发布这里的页面。

## 以后

内容按阶段加，不一次铺开整门课：

1. 听力：已经有四段短音频
2. 阅读：已经有五课，每篇大约 220–320 个词。前两课找谁在做什么，后三课看代词指回谁
3. 口语：已经有四课跟读。录音留在自己的手机里，不上传
4. 写作：已经有四课。从读过的句子换一个自己的细节，对照清单，不打分
5. 一周安排和课文索引：已经有了。听、读、说、写各一次，外加一天休息或只看修改点

每一阶段仍然是静态页面，没有账号。

## 怎样加一课

- 新课用目录，例如 `read/lesson-02/index.html`，并同时加上 `en/read/lesson-02/index.html`
- 英文原文两边保持一致；说明文字按该页语言重写
- 更新该技能的目录页。首页如果还写着「没有课」，改掉那一句
- 不加重框架，不放第三方脚本。新课沿用 `assets/js/visits.js`，页面上不要放次数，也不要放计数器链接
- 若是听力课，音频仍用 wav，放在 `assets/audio/`，并沿用同一种读法
- 新链接按该页所在目录写相对路径，不要写成 `/week/` 或 `/assets/` 这种从网站根目录起的地址

## English

A static notebook for adults who use Chinese and are learning English. Chinese is the default; use the language link for the same page in English. No login and no backend. Visits are counted by page and time. No name is stored. Start at the one-week page: listen, read, speak, and write once each, then rest or review one change. A lesson index links to every lesson already on the site. What is here: that week, the index, a method page, five reading lessons of about 220–320 words, four short listening clips, four speaking lessons that shadow those same lines, and four writing lessons that each change one sentence from a passage already on the site. Recordings stay on the learner’s phone. Week ticks stay on paper. On a lesson, the learner types an answer or marks the three speaking checks. That stays in the browser for the visit, in `assets/js/practice.js`. It is not uploaded, it is not scored, and there is no account. A listening check stays folded until the learner has written. On the four listening lessons, the five reading lessons, and the first writing lesson, a short extra round asks the learner to tap four or five words from that lesson back into order. A reading round waits until the three answers are written. The yes or no stays on the page. It is not stored as a score, and it is not uploaded. The reading lessons have no word lists. The clips are original sentences spoken with espeak-ng (US English, one speed) and stored as wav under `assets/audio/`. Serve the repo root with any static file server, then open the site root. The same relative links also work when the repo is published at <https://zhuliuw.github.io/learning-english/>. The user site at <https://zhuliuw.github.io/> is separate.

GitHub Pages cannot store the visit log and cannot run a server. `assets/js/visits.js` sends the page path and the time to Abacus (`abacus.jasoncameron.dev`, namespace `zhuliuw-learning-english`). No account and no key. Abacus keeps one number per page, not each timestamp. A path under `/learning-english/` is counted as the same page without that prefix. The site does not show the numbers and does not link to the counter. Owner reads the counts: https://abacus.jasoncameron.dev/get/zhuliuw-learning-english/home — other pages use the path with slashes turned into hyphens; the home key is `home`, and listening lesson 1 is `listen-lesson-01`. Names, accounts, typed answers, recordings, and the word-order result are not sent. Abacus can see the network connection. <https://zhuliuw.github.io/learning-english/> stays the static copy until there is another host. Do not change GitHub Pages settings for this count.

## License

MIT. See [LICENSE](LICENSE).
