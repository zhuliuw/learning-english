# 清楚学英语

给中文使用者的英语练习本。第一期是一个静态网站：默认中文，右上角可以换成英文。没有账号，没有后端，也不收集访问数据。

## 在本地查看

在仓库根目录执行：

```bash
python3 -m http.server 8000
```

浏览器打开 <http://localhost:8000/>。

请用本地服务器打开，不要直接双击 HTML。页面里的链接从网站根目录写起，直接打开文件会找不到样式和其他页面。

## 第一期有什么

- 首页：这个站是什么、怎么开始、听 / 说 / 读 / 写四个入口
- [怎么学](method/)：一课只做一件事，做完只留一个修改点
- 听、说、写：说明以后会放什么，这一期没有课
- 读：一课能做完的起步练习，[先找「谁在做什么」](read/lesson-01/)

英文是同一套页面，放在 `en/` 下面。课文里的英文原文两边相同，说明按各自的语言写。

页面不加载外部字体、脚本或统计。

## 以后

内容按阶段加，不一次铺开整门课：

1. 听力：几段很短的音频、原文，和听完要做的一件事
2. 阅读：在第一课之外再加几篇短文，然后才多练一件事（代词指谁）
3. 口语：跟读已经听过的句子，用自己的手机录音，不上传到这里
4. 写作：改写读过的句子，附一段短参考和一张短清单，不自动打分
5. 把四项收成一周的安排，并列出已经有的课

每一阶段仍然是静态页面，没有账号。

## 怎样加一课

- 新课用目录，例如 `read/lesson-02/index.html`，并同时加上 `en/read/lesson-02/index.html`
- 英文原文两边保持一致；说明文字按该页语言重写
- 更新该技能的目录页。首页如果还写着「没有课」，改掉那一句
- 不加重框架，不放第三方脚本

## English

A static notebook for Chinese speakers learning English. Phase 1 is a bilingual shell: a home page, a short method page, stub pages for listening, speaking, and writing, and one real reading lesson. Chinese is the default; use the language link for the same page in English. No login, no backend, no tracking. Serve the repo root with any static file server, then open the site root. Later phases add short listening audio, a few more passages, shadowing, sentence rewrites, and a one-week plan. They are not in this phase.

## License

MIT. See [LICENSE](LICENSE).
