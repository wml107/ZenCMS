<p align="center">
    <h1 align="center">Zen CMS</h1>
    <a href=""><img alt="GitHub forks" src="https://img.shields.io/github/forks/wml107/ZenCMS.svg" /></a>
    <a href=""><img alt="GitHub stars" src="https://img.shields.io/github/stars/wml107/ZenCMS.svg" /></a>
    <a href=""><img alt="GitHub watchs" src="https://img.shields.io/github/watchers/wml107/ZenCMS.svg" /></a>
    <a href=""><img alt="GitHub followers" src="https://img.shields.io/github/followers/wml107.svg?style=social&label=Follow&maxAge=2592000" /></a>
    <a href="https://github.com/wml107/ZenCMS/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/wml107/ZenCMS.svg" /></a>
    <a href=""><img alt="GitHub issues-closed" src="https://img.shields.io/github/issues-closed/wml107/ZenCMS.svg" /></a>
    <a href=""><img alt="GitHub issues-pr" src="https://img.shields.io/github/issues-pr/wml107/ZenCMS.svg" /></a>
    <a href=""><img alt="GitHub issues-pr-closed" src="https://img.shields.io/github/issues-pr-closed/wml107/ZenCMS.svg" /></a>
    <a href=""><img alt="GitHub size" src="https://img.shields.io/github/languages/code-size/wml107/ZenCMS" /></a>
    <a href=""><img alt="GitHub downloads" src="https://img.shields.io/github/downloads/wml107/ZenCMS/total" /></a>
</p>

一个开源的内容管理平台，使用它你可以轻松的组织、发表自己的内容，快速部署自己的网站，可以用于构建个人博客，也可以用来搭建组织、企业门户网站。

Zen-CMS致力于：

- 让使用者用最简单的方式，编辑发表内容、搭建复杂的内容网络与逻辑链条，使内容以更丰富的方式表达，同时增强内容与内容之间的联系；
- 让没有软件开发经验的人也能供轻松搭建一个内容展现形式比市面上常见的社区、社交平台丰富得多的内容平台。即拥有超越在常见平台发表内容的表现形式与完整的内容资产，又无需了解学习软件开发的相关技术，从而专注于内容创作、更好地表达自己；
- 让内容独立于平台，所有内容的编辑、存储、解析、浏览都可以不依赖于系统，让使用者拥有真正独立、完整的内容资产；
- 打造丰富的配套生态，为使用者提供丰富多样的UI界面，以及增强某些特定需求的插件；
- 构建清晰、耦合度低的代码结构，提供多个切面，供开发者进行二次开发，增强或实现某些特定需求。

### 许可证

[![Github](https://img.shields.io/github/license/wml107/ZenCMS)](https://github.com/wml107/ZenCMS/blob/main/LICENSE)

### 技术栈

![](https://img.shields.io/badge/HTML5-209123?logo=html5&logoColor=white) ![](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black) ![](https://img.shields.io/badge/Bootstrap-563D7C?logo=bootstrap&logoColor=white) ![](https://img.shields.io/badge/Vue.js-35495E?logo=vue.js&logoColor=4FC08D) ![](https://img.shields.io/badge/Webpack-f5f5f5?logo=Webpack&logoColor=8DD6F9) ![](https://img.shields.io/badge/Axios-FFFFFF?logo=Axios&logoColor=5A29E4)


![](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white) ![](https://img.shields.io/badge/Express.js-404D59?logo=Express&logoColor=000000) ![](https://img.shields.io/badge/Nest.js-f5f5f5?logo=NestJS&logoColor=E0234E) ![](https://img.shields.io/badge/SQLite-07405E?logo=sqlite&logoColor=white)

![](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white) ![](https://img.shields.io/badge/npm-5A5A5A?logo=npm&logoColor=#CB3837) ![](https://img.shields.io/badge/PM2-f5f5f5?logo=PM2&logoColor=2B037A) ![](https://img.shields.io/badge/NGINX-f5f5f5?logo=NGINX&logoColor=009639) ![](https://img.shields.io/badge/Docker-f5f5f5?logo=Docker&logoColor=2496ED) ![](https://img.shields.io/badge/Cloudflare-ffffff?logo=Cloudflare&logoColor=F38020)

### 快速跳转

<a href="https://github.com/wml107/ZenCMS#%E5%9B%BE%E6%96%87%E5%86%85%E5%AE%B9">如何构建图文内容</a>  |  <a href="https://github.com/wml107/ZenCMS#%E5%9B%BE%E6%96%87%E5%86%85%E5%AE%B9%E7%9A%84%E7%BB%84%E7%BB%87">如何组织图文内容</a>  |  <a href="https://github.com/wml107/ZenCMS#%E6%96%87%E6%A1%A3">文档</a>  |  <a href="https://github.com/wml107/ZenCMS#%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97">快速开始</a>

---



# Feature

### 开箱即用

部署系统只需一条简单的docker指令，即可完成全套部署。

### 自由定制

系统提供了详细的文档说明，和多个切口供用户介入，根据自己需求做进一步定制。

- 用户可以根据前后端接口文档，自行根据需求实现客户端，替换相关文件即可。
- 也可以保留前端的数据加载、处理模块，只重写UI；同时系统也会提供多种主题预设；除此之外也可以根据文档提供的CSS命名规则，不改变布局的情况下，对UI做出轻微的改变。
- 支持用户自行定制编写用于增强Markdown的HTML插件。
- 除此之外对于后端的实现、结构，也提供了详细的文档，你可以根据自己的个性需求做二次开发。

### 独立完整的内容资产

创建这一工具的一大初衷就是希望将用户所创作的内容与平台分离，所以自然不会让用户创作的内容依附于本系统。

1. 以独立性较高的形式作为内容载体。
   - 数据不借助本系统也能具备可读性；
   - 能够轻松的根据现有的数据开发一个新的系统，兼容这些数据，或者对这些数据进行批量处理；
2. 数据能够轻松的导入导出，进行备份或同步。

### 图文内容

图文构成的文章，是本系统内发布、组织内容的基本单元。图文的编辑、管理、展示是本系统的核心功能。

对于文章的编写，系统以这两种形式作为载体：Markdown和HTML，这两种格式的底稿，最终会被渲染成网页。

- 为了尽可能地使内容独立于平台，Zen-CMS避免设计一套独立的数据格式，选择了当下最普适、支持最广、编辑器最多的两种文档格式，使得用户脱离系统，也能够轻松地在其他编辑器撰写内容；同时系统也自带在线编辑器。

1. HTML弥补了Markdown表现力上的不足，如果用户的需求并不是发布一个图文，而是需要在网站中创建一个页面，例如对资源进行汇总、对内容进行综述概括，他可以自行编写一个HTML文件，在文件里自定义样式等，系统会自动将它嵌入到用户指定的位置。

2. 但HTML的编辑过于繁琐，不适用于常规内容的编辑，所以就又有了Markdown。对于Markdown，为了丰富内容的表达，系统提供了一系列的组件，以HTML片段的形式插入Markdown，系统自动识别渲染这些组件，以增强Markdown。

   这也正是选择Markdown作为内容载体的原因：兼顾了数据独立性与表达多样性——在使用其他编辑器打开单独浏览Markdown文件的时候，内容依旧具有可读性，不依附于平台；HTML片段的插入，又实现了远超传统图文的表达，本平台预设一系列的组件，例如轮播图、巨幕、卡片、面板、标签、图标、标签页、下载、音乐等等，同时允许用户自定义组件，这些组件既可以通过在线编辑器以极其简单的方式插入md文档，也可以从官方文档中复制模板，直接以HTML片段的形式在用户本地的编辑器自行编辑插入。

   Markdown除了最基本的大纲模式，通过大纲了解文章结构以及跳转到主要段落，还支持导图模式，可以针对文章主干、逻辑链绘制相应导图。

### 图文内容的组织

本系统提供多种组织方式，将多篇图文组织在一起，以构建更加复杂的内容。

**组织结构的载体**十分简单，只需遵照计算机的目录结构即可。创建并维护一个普通的目录，将内容直接保存在目录里，系统就能够自动检索，将图文内容组织在一起。

**文章引用**：这种结构可以使你轻松在一篇文章/页面中，轻松的引用其他内容，系统获取这些内容的路径，和你目录中存储它们的路径，在结构上是基本一致的。所以直接使用相对路径，就可以轻松引用，实现内容间的相互跳转。

**四种组织模式**：

- **目录**

  最基本的内容组织结构，和你平常见到的那种网站结构没什么不同，多级菜单，对应了导航栏，每一级目录都对应若干内容或子菜单。

  实现这种结构，只需要你创建相应的目录。目录可以嵌套，这代表了多级菜单。目录中直接存放该级目录的各个内容即可，这些内容可以是Markdown、HTML、子目录，前两者保存文章，后者保存子菜单内容。

  这些内容展示时的相对顺序、以及对应的标题，通过在目录下创建配置文件`catalog.json`，以对象数组的形式声明，数组元素是一个对象，对象保存了文件名与标题的对应关系，以及文件类型；数组元素的顺序，就是菜单中的顺序。实际操作起来要简单得多，因为你可以在系统控制台的图形化界面完成这些设置。

  使用者无需关心排版布局，只需要在json中完成内容的配置，这些菜单目录，就会自动地应用在网站的导航栏。用户可以在配置文件中配置导航栏居于顶部或侧置等有关菜单风格的事宜。

  > 限制：需求是没有边界的，但软件难以提供无限的需求。随着菜单嵌套层级的增多，UI层设计的复杂性会迅速增加，或无法实现，或变回普通的目录结构，失去浏览体验。故系统目前最多只支持三层结构，若嵌套了更多的层级，会导致意想不到的错误。

- **导航页**

  但很多时候，我们不满足像前面目录那样，只有一个菜单/导航栏。对于某个领域、话题、集合，我们希望有一个专门的导航页，在导航页中做一些综述、说明，然后在这个页中导入其他子分类或者某篇文章。

  导航页有三种实现方式：可以是HTML，也可以是Markdown，也可以使用平台提供的一些预设模板（用户填充的内容系统会保存为json文件），他们存放在对应级别的目录，同时在`catalog.json`中进行声明。在其中通过相对路径自行实现对目录中内容的导航。

  特别地，对于根目录，必须有导航页，用于对应首页，作为网站的门户。导航页可以只是md文件，这时候会自动应用系统的默认主题，也可以通过HTML自行实现深度定制。

- **导图**

  如果前两种形式仍然无法满足你展示某一领域内容之间的关联，还可以用导图的形式实现菜单/索引。

  导图通过系统的在线编辑器创建，可以为导图的每个节点添加链接，从而实现导航至其他位置，同时还能在导图的前后添加补充信息。
  
- **标签**

  上面这种基于目录/菜单，或是基于图的分类、组织方法不足以覆盖全部情形：同一个内容是可以兼具多种特征的。故本系统支持为每一篇文章添加数个标签来标记相应文章所涉及的领域，然后通过某一特征、要素来实现对图文内容的聚合。所有的标签声明在根目录的配置文件中，当然也可以在线通过图形界面来管理你的标签，每篇文章的标签在相应目录中的配置文件声明。

**路径跟踪**：系统能追踪浏览者当前在结构树中的所处位置，在某篇具体文章中显示当前路径并支持路径跳转。

**分布式存储**：这样的组织方法和我们平时接触的文件系统相差无几，你可以把系统中的这个目录拷贝到任何一台电脑去浏览，这意味着你能够通过一些文件同步软件，在任何一台电脑拷贝副本、维持系统和任意主机之间的内容同步，无需登入系统就能在本地完成内容的编辑、组织，只需适时同步即可。

### 动态

除了上面两种正式的、有组织的内容，系统还支持像绝大多数的社交媒体那样发布动态，在这里可以发布一些比较“轻”的简单内容，例如日常分享、感想等，不成体系、时效性强的内容(确切的说是随着时间阅读价值锐减的内容)。

### 性能

本系统单机部署的情况下支持百万用户。分析如下：

系统内容的发布源是单一的，所有的增删改全都来源于站长一个人（或数个子管理员账号），其他人均是浏览者，所以从使用场景来看，不存在一致性问题。并发的主要压力在读操作，即站点内静态资源的获取和数据的读取。

因为这个系统设计的目的是为简化建站、解决内容发布管理问题，所以部署不能太过麻烦，故必须限定在单机部署。恰巧单机部署在这种场景下也并不存在性能瓶颈：

对于个人或者某个组织机构这样的单一内容发布源而言，用户基数不会太大，B站的顶流up也就百万级别关注，像Youtube中LinusTechTips这样的全球级别的顶流账号，则有上千万订阅者，所以百万级的用户已经是很极限的情况了。相比于视频网站中几十万用户观看视频，同一时间段同时获取视频流；或者相比于电商网站抢购情景下的百万千万同时并发；图文内容平台的并发压力小很多，因为图文内容必然是一次性很快加载，然后访问者阅读很久，才会有下次的请求，也就是说就算有很多人同时使用平台，他们的读请求也是有先有后的到达平台，而不是同时、长时间请求大量数据。

除此之外，如果采用CDN缓存静态资源，这种读操作的压力还能被显著降低。

基于这种分析，可以粗略地得出一个结论：读操作的并发再大，极限也就大致一万，单机完全能够实现。

### 其他特性

- 网站公告
- 浏览量统计
- 站内搜索
- 资源管理
- 响应式布局&移动端适配
- 系统运行状态监控
- 广告接入

# 文档

### <a href="https://github.com/wml107/ZenCMS/blob/main/doc/guide.md">使用指南</a>

根据指南你可以轻松部署安装本系统，了解系统各功能的使用。

### <a href="https://github.com/wml107/ZenCMS/blob/main/doc/feature.md">功能列表、开发进度</a>

这个文档详细的罗列了Zen-CMS具备的功能：哪些是已开发完成的、哪些是列入计划的、哪些还处于构思阶段。

这部分对功能的描述浅尝辄止，只是从整体上概括系统具备一个怎样的功能，以及这个功能的某些特殊的、需要强调的地方。旨在让读者了解本系统的概况，以及了解当前的开发进度，不会深入例如执行流程、具体详细效果等细节。

因为功能的流程、实现是有很多角度的——前端的参数校验、后端的参数校验、数据库的处理方式、前端的交互、后端的流程、边界情况的处理、用户的用例，这都属于功能的细节，一个功能的完整明确定义是非常复杂的，如果全都一股脑写在一起，看着会非常地乱，抓不住重点。

并且出于前端与后端所做的事情在业务逻辑上存在很大的差异，本文档就以这一点为分界，将需求分析/系统设计/功能定义/etc拆分成两部分，分别从客户端和服务端的角度来定义系统、描述某功能的细节。这就引出了下面五个文档。

### <a href="https://github.com/wml107/ZenCMS/blob/main/doc/api.md">接口文档</a>

主要定义了：

- 与功能列表相对应的接口列表，列举服务端都具体会做哪些事。

- 前后端的通信结构
- 一些表达特定含义的符号
- 数据模型(主要是约定命名)

### <a href="https://github.com/wml107/ZenCMS/blob/main/doc/backendStructure.md">后端-代码实现与结构</a>

从代码实现的角度，介绍本系统服务端的实现思路、代码结构。方便有需要的同学理解代码实现、进行二次开发。

### <a href="https://github.com/wml107/ZenCMS/blob/main/doc/backendDesign.md">后端-详细设计</a>

从业务逻辑的出发，介绍服务端层面，系统各功能的业务要点、实现思路、处理流程。

### <a href="https://github.com/wml107/ZenCMS/blob/main/doc/frontendStructure.md">前端-代码实现与结构</a>

从代码实现的角度，介绍本系统客户端的实现思路、代码结构。方便有需要的同学理解本项目的代码是如何组织以实现功能的，以及进行二次开发。

### <a href="https://github.com/wml107/ZenCMS/blob/main/doc/frontendDesign.md">前端-详细设计</a>

从业务逻辑的出发，介绍客户端层面，系统各功能的业务要点、实现思路、处理流程。