/* UI phrases only. The demo keeps its data, routes, and form option values canonical. */
const english = new Map(
  ('\n' + [
    'OHCAT 星球 · 让想法有画面|OHCAT Creative Planet',
    'OHCAT 星球首页|OHCAT Creative Planet home',
    '主导航|Main navigation',
    '星球社区|Community',
    '创意大厅|Project Hall',
    '我的星球|My Planet',
    '我的项目|My Projects',
    'AI 创作工作台|AI Creative Studio',
    '让想法|IDEAS IN',
    '有画面|ORBIT',
    '。|.',
    '从一句话、一张画布，或一个还没想清楚的点子开始。|Start with a line, a canvas, or an idea that’s still taking shape.',
    '创作方式|Creation mode',
    '一句话成片|Prompt to film',
    '画布|Canvas',
    '描述你的创意|Describe your idea',
    '想拍什么？试试「一只猫在粉红色的月球上迷路」|What would you film? Try “A cat gets lost on a pink moon.”',
    '试个灵感|Try a prompt',
    '开始创作|Start creating',
    '交互演示 · 可体验创建草稿与分镜|Interactive demo · Try making a storyboard or draft',
    '发现作品|Discover work',
    '看看其他创作者怎么把想法做出来。|See what other creators make from their ideas.',
    '作品类型|Work type',
    '全部|All',
    '短片|Short film',
    '概念设计|Concept art',
    '角色设计|Character design',
    '搜索作品|Search work',
    '搜索标题或作者|Search by title or creator',
    '进入星球社区|Explore the community',
    '交互演示 · 示例作品|Interactive demo · Sample work',
    '关闭窗口|Close',
    '一只猫在粉红色的月球上迷了路，沿着月尘里的脚印寻找回家的路。|A cat gets lost on a pink moon and follows footprints in the dust to find its way home.',
    '雨夜的巷子里，有一间只在午夜开门的霓虹面馆。|In a rainy alley, a neon noodle shop opens only at midnight.',
    '一列蓝色小火车穿过雾气，在松林深处停下。|A small blue train crosses the mist and stops deep in a pine forest.',
    '打开画布|Open canvas',
    '给画布写个起点，或者直接从空白开始。|Give the canvas a starting point, or start with a blank canvas.',
    '把「会发光的森林」拆成场景、角色和色彩三张灵感卡。|Turn a glowing forest into three idea cards: setting, characters and color.',
    '收集复古未来交通工具的三种视觉方向。|Collect three visual directions for retro-futuristic vehicles.',
    '规划创作|Plan the project',
    '告诉 Agent 你想完成什么，比如一支 15 秒的旅行短片。|Tell Agent what you’re making, like a 15-second travel film.',
    '策划一支 15 秒的月球旅行短片，有反转结尾和三种镜头。|Plan a 15-second moon trip film with three kinds of shots and a twist ending.',
    '把一个城市雨夜的想法拆成剧本、分镜和素材清单。|Turn an idea about a rainy city night into a script, storyboard and asset list.',
    '月球迷路指南|Lost on the Moon',
    '山野放映员|Open Country Cinema',
    '山|O',
    '在珊瑚色荒原上，一只第一次出远门的小猫把一轮粉红色的月亮当成了路标。|On a coral-colored wasteland, a cat on its first trip mistakes a pink moon for a signpost.',
    '午夜面馆|Midnight Noodles',
    '几颗像素|A Few Pixels',
    '几|P',
    '用一场雨把城市变成水中的倒影。镜头从空荡的路口慢慢推向唯一亮着灯的窗。|Rain turns the city into a reflection. The camera drifts from an empty intersection toward the only lit window.',
    '云上栖居|Above the Clouds',
    '林间工作室|Woodland Studio',
    '林|W',
    '一座橙色现代主义建筑悬浮在群云之上，岛屿边缘有一束向下坠落的瀑布。|An orange modernist pavilion floats above the clouds, with a waterfall spilling from the edge.',
    '把建筑做成远处的一小块橙色，把空间留给云、天空和往下流的水。|A small flash of orange in the distance gives way to a landscape of clouds, sky and falling water.',
    '松林列车长|The Pinewood Conductor',
    '猫爪制片厂|Pawprint Pictures',
    '猫|P',
    '给一位绒毛列车长设计一趟清晨的旅程。青色机身和紫色雾气构成主色。|A morning journey for a very fuzzy conductor. A teal locomotive meets a bank of violet fog.',
    '上一条|Previous',
    '下一条|Next',
    '还没有关注的作品。打开任意作品详情就能关注创作者。|Nothing here yet. Open a work to follow its creator.',
    '当前演示账号暂无好友动态。|No activity from friends in this demo yet.',
    '没有找到匹配的作品。试试其他分类或关键词。|No matching work. Try a different category or keyword.',
    '星球放映厅|Planet Cinema',
    '来自星球创作者的短片和视觉作品。|Short films and visual worlds by creators on the planet.',
    '现在放映|Now screening',
    '观看短片|Watch preview',
    '打开作品|View work',
    '放映列表|Screening queue',
    '放映进度|Position in the screening queue',
    '示例动态预览|Motion preview',
    '封面动态预览|Animated cover preview',
    '动态预览|Motion preview',
    '收起预览|Close preview',
    '作品详情|Work details',
    '示例作品|Sample work',
    '用这个灵感创作|Create from this idea',
    '已收藏|Saved',
    '收藏作品|Save work',
    '已关注作者|Following creator',
    '关注作者|Follow creator',
    '复制作品链接|Copy work link',
    '评论|Comments',
    '写评论|Write a comment',
    '写一条评论|Write a comment',
    '发表|Post',
    '还没有评论。|No comments yet.',
    '已复制链接|Link copied',
    '作品链接|Work link',
    '已收藏到我的项目|Saved to My Projects',
    '已取消收藏|Removed from saved work',
    '已把灵感放进创作框|Idea added to the composer',
    '动态预览进度|Preview progress',
    '未命名画布|Untitled canvas',
    '草稿已保存|Draft saved',
    '故事方向|Story direction',
    '确认角色、场景和观众应该记住的那一刻。|Pick the characters, the setting, and the moment you want viewers to remember.',
    '剧本与分镜|Script and storyboard',
    '列出开场、转折和结尾，为每段选一个关键镜头。|Outline the opening, the turning point and the ending. Give each one a key shot.',
    '制作清单|Production checklist',
    '整理参考图、配乐和需要制作的素材。|Gather reference images, music and the assets you need to make.',
    '建立场景|Establish the scene',
    '用远景交代时间、地点和气氛。|Use a wide shot to establish where and when we are and how it feels.',
    '靠近主角|Get closer to the lead',
    '切到中近景，捕捉主角的动作或反应。|Cut to a medium close-up to catch an action or reaction.',
    '保留余韵|Leave a lasting image',
    '用一个能呼应开场的画面结束。|End on an image that echoes the opening.',
    'Agent 创作计划|Agent production plan',
    '创作计划|Production plan',
    '分镜草稿|Storyboard draft',
    '以下为演示结构，可把创意保存到本机浏览器。|This is a sample structure. Save it as a draft in this browser.',
    '保存草稿|Save draft',
    '灵感画布|Idea canvas',
    '把场景、角色或色彩写进卡片，之后可以继续编辑。|Put settings, characters or colors on cards you can edit later.',
    '添加卡片|Add card',
    '保存画布|Save canvas',
    '写下一个画面或点子…|Describe a scene or idea…',
    '先写下一句创意。|Write a line to start.',
    '创意工作台|Creative Studio',
    '进行中的项目|In progress',
    '订单任务|My orders',
    '创意共创|Co-create',
    '资产仓库|Asset library',
    'IP 目录与记事本|Story bible & notes',
    '日常任务|Daily tasks',
    '文案制作|Copywriting',
    '创意设计|Creative design',
    '剧本制作|Scriptwriting',
    '数字人制作|Digital avatars',
    '绘画插画|Illustration',
    '视频制作|Film & video',
    '音乐制作|Music',
    '游戏制作|Games',
    '代码|Code',
    '智能硬件|Smart hardware',
    '其它|Other',
    '推荐|Recommended',
    '社区|Explore',
    '关注|Following',
    '好友|Friends',
    '月球邮局|Moon Post Office',
    '一只猫邮差要在最后一班飞船起飞前，把一封寄给地球的信送到月球邮局。我们正在做一支 15 秒短片，欢迎擅长分镜和声音的创作者。|A cat mail carrier has until the last spaceship leaves to deliver a letter for Earth. We’re making a 15-second short and looking for storyboard and sound artists.',
    '示例原创角色，由参与成员授权用于本片制作与发布。|Example: the creators license their original character for production and release of this film.',
    '导演与分镜|Direction and storyboards',
    '发布后点播分润|On-demand revenue share',
    '示例协议。以扣除发行费用后的净回款为口径，每月登记凭据并更新应分明细。|Sample agreement. Net proceeds exclude release expenses. Receipts and each party’s share are recorded monthly.',
    '拼团中|Funding open',
    '云端植物图鉴|Field Guide to Sky Plants',
    '为悬浮岛创作三种虚构植物的视觉图鉴。交付内容包括植物造型、配色设定和一张展示海报。|Illustrate three fictional plants for a floating island. Deliver plant designs, color studies and a poster.',
    '示例原创概念，授权用于本项目的图鉴与展示。|Example: the original concept is licensed for this guide and its display.',
    '概念设定与插画|Concept and illustration',
    '市场购买|Marketplace sales',
    '示例协议。按净回款登记发行费用和各方应分明细。|Sample agreement. Record release costs and each party’s share of net proceeds.',
    '松林列车角色设定|Pinewood Conductor Character Study',
    '为穿行松林的猫咪列车长完成角色造型、服装和三视图，作为后续短片的制作素材。|Design the cat conductor’s silhouette, costume and turnaround for a short set in a pine forest.',
    '示例原创角色，授权用于短片和相关展示。|Example: the original character is licensed for the short and related displays.',
    '角色与美术|Character and art direction',
    '市场购买与点播分润|Marketplace sales and on-demand revenue',
    '示例协议。对发行与点播分别记录凭据，按净回款核算份额。|Sample agreement. Record release and on-demand receipts separately and calculate each share from net proceeds.',
    '制作中|In production',
    '为月球短片设计片头|Design an opening for Lost on the Moon',
    '制作 3 秒片头动效，交付 MP4 和可编辑源文件。|Make a 3-second opening and deliver an MP4 plus editable source files.',
    '角色和主片色调一致，片头连续播放时无黑帧。|Match the main film’s character and palette. The opening must play without black frames.',
    '套|set',
    '待接单|Open',
    '为午夜面馆写故事简介|Write a synopsis for Midnight Noodles',
    '写两版中文创意介绍，分别用于作品详情和社交平台。|Write two Chinese synopses, one for the work page and one for social media.',
    '每版 80 字以内，准确表达只在午夜营业的设定。|Keep each version under 80 characters and make it clear the shop only opens at midnight.',
    '版|versions',
    '草稿|Draft',
    '已分配|Assigned',
    '执行中|In progress',
    '待验收|Awaiting acceptance',
    '待返工|Changes needed',
    '争议中|Disputed',
    '已完成|Completed',
    '已取消|Canceled',
    '我的星球功能|My Planet sections',
    '创意大厅功能|Project Hall sections',
    '任务大厅|Task Board',
    '展示范围|Visibility filter',
    '社区公开|Public',
    '我参与的|My activity',
    '全部创意分类|All categories',
    '创意分类|Category',
    '浏览星球故事，发现喜欢的作品与创作者。|Explore new worlds and find the people behind them.',
    '星球社区分栏|Community feeds',
    '继续做项目，管理素材与协作。|Pick up a project, manage assets or work with others.',
    '最近项目|Recent projects',
    '还没有创作项目，从一个想法或一张空白画布开始。|No projects yet. Start with an idea or a blank canvas.',
    '管理创作草稿和收藏。|Manage your drafts and saved work.',
    '查看正在进行的共创与订单。|See your active co-creations and orders.',
    '查看可作为灵感参考的示例素材。|Browse sample assets for inspiration.',
    '记录角色设定、世界观和随手灵感。|Keep character notes, worldbuilding and ideas in one place.',
    '回到创意工作台继续创作。|Return to the studio to keep creating.',
    '创作草稿|Creative drafts',
    '还没有草稿。|No drafts yet.',
    '还没有收藏。|No saved work yet.',
    '进行中的共创|Active co-creations',
    '暂无参与的共创。|You haven’t joined a co-creation yet.',
    '查看公开项目|Browse public projects',
    '进行中的订单|Active orders',
    '暂无进行中的订单。|No active orders yet.',
    '管理订单|Manage orders',
    '名称|Title',
    '设定或笔记|Concept or notes',
    '保存记事|Save note',
    '还没有记事。|No notes yet.',
    '已保存记事|Note saved',
    '返回创意工作台|Back to Creative Studio',
    '浏览审核通过的项目、参与拼团，或发起自己的创意。|Browse approved projects, help fund one, or start a project of your own.',
    '发起项目|New project',
    '我的共创分类|My co-creation filters',
    '全部共创|All co-creations',
    '我发布的|Created by me',
    '我参与拼团|Projects I funded',
    '搜索项目名称或创意内容|Search by project name or idea',
    '项目与词元均为演示数据|Sample projects and demo tokens',
    '还没有匹配的项目。你创建的草稿与参与拼团的项目会出现在这里。|No matching projects. Drafts and projects you fund will appear here.',
    '还没有匹配的项目。试试其他关键词或分类。|No matching projects. Try a different keyword or category.',
    '制作与发布预算|Production and release budget',
    '词元|tokens',
    '找不到该项目。|Project not found.',
    '返回创意共创|Back to Co-create',
    '返回进行中的项目|Back to in progress',
    '编辑草稿|Edit draft',
    '申请发布|Submit for review',
    '已提交演示申请，审核通过后才会进入公开列表。|Demo submission recorded. Projects appear publicly once approved.',
    '投入份数|Number of shares',
    '参与拼团|Contribute',
    '演示投入，每项目最多 40 位词元投入者。|Demo contributions. Up to 40 backers per project.',
    '当前已结束拼团。|Funding has closed.',
    '我|Me',
    '创意与制作计划|Idea and production plan',
    '权利来源与授权|Rights and permissions',
    '回款协议|Revenue agreement',
    '现金回款仅登记协议、凭据和应分明细。|Cash proceeds are recorded as agreements, receipts and shares due.',
    '项目讨论|Project discussion',
    '参与讨论|Join the discussion',
    '聊聊对这个项目的想法|What do you think of this project?',
    '待审核|In review',
    '发布申请已在本机记录|Submission recorded in this browser',
    '已完成演示拼团|Demo contribution recorded',
    '暂无讨论。|No discussion yet.',
    '编辑创意项目|Edit co-creation project',
    '发起创意项目|Start a co-creation project',
    '保存草稿后，在项目详情申请发布。|Save a draft, then submit it for review from the project page.',
    '项目内容|Project overview',
    '项目名称 *|Project name *',
    '创意内容分类 *|Category *',
    '创意展示海报（可选示例）|Cover image (optional sample)',
    '不使用海报|No cover image',
    '创意内容、制作计划与交付目标 *|Idea, production plan and deliverables *',
    '权利来源、授权范围与期限 *|Ownership, license scope and term *',
    '制作预算（算力词元） *|Production budget (compute tokens) *',
    '发布预算（算力词元） *|Release budget (compute tokens) *',
    '每份投入（算力词元） *|Cost per share (compute tokens) *',
    '拼团截止（北京时间） *|Funding deadline (Beijing time) *',
    '回款比例与制作团队|Revenue split and production team',
    '投入方与制作方合计 100%。逐一填写制作人份额，合计须等于制作方比例。|Backer and production shares must add up to 100%. Enter each producer’s share. Together they must equal the production share.',
    '市场投入方净回款比例（%） *|Backers’ share of net proceeds (%) *',
    '制作方净回款比例（%） *|Production share of net proceeds (%) *',
    '添加制作人|Add producer',
    '后期回款协议|Revenue agreement',
    '回款方式 *|Revenue source *',
    '回款净额口径、扣费项目、分配周期与贡献分配协议 *|Net proceeds, deductions, schedule and revenue split *',
    '演示只记录表单。原版现金回款仅登记协议、凭据和应分明细。|This demo saves the form locally. The original site records agreements, receipts and shares due.',
    '保存项目草稿|Save project draft',
    '制作人|Producer',
    '制作分工|Production role',
    '占项目净回款（%）|Share of net proceeds (%)',
    '移除|Remove',
    '创意发起与制作|Project lead and production',
    '请完整填写项目、权利与制作人信息。|Fill in the project, rights and producer details.',
    '总预算须大于 0，且为每份投入的整数倍。|The budget must be greater than zero and divisible by the cost per share.',
    '请核对两方比例和每位制作人的份额合计。|Check the split and the total of all producer shares.',
    '项目草稿已保存|Project draft saved',
    '我接受的|Accepted by me',
    '全部关联|All my orders',
    '可接任务|Available tasks',
    '管理你发布和接受的创作需求。|Manage the briefs you post and the work you accept.',
    '浏览社区发布的创作需求，查看自己参与的任务。|Browse creative briefs from the community or see the tasks you’ve joined.',
    '创建订单|New order',
    '管理我的订单|Manage my orders',
    '订单范围|Order filters',
    '搜索订单或编号|Search by order title or ID',
    '搜索大厅任务|Search tasks',
    '订单状态|Order status',
    '全部订单状态|All statuses',
    '示例报价 · 内部服务词元|Sample quotes · Internal service tokens',
    '示例任务 · 确认后可在订单任务中管理|Sample tasks · Manage accepted work in My Orders',
    '目前没有匹配的记录。|No matching records.',
    '查看公开任务|Browse public tasks',
    '目前没有符合条件的公开任务。|No matching public tasks.',
    '返回订单任务|Back to My Orders',
    '返回任务大厅|Back to Task Board',
    '我的星球 / 订单任务|My Planet / My Orders',
    '创建协作订单|Create a collaboration order',
    '先描述交付与验收要求，保存后查看并确认报价。|Describe what you need and how it will be accepted, then review the quote.',
    '订单需求|The brief',
    '订单标题 *|Order title *',
    '业务类目|Category',
    '交付需求 *|Deliverables *',
    '验收标准 *|Acceptance criteria *',
    '词元报价与交付时间|Token quote and delivery date',
    '词元单价 *|Price per unit (tokens) *',
    '任务量 *|Quantity *',
    '计量单位 *|Unit of work *',
    '条脚本|scripts',
    '交付截止（北京时间） *|Delivery due (Beijing time) *',
    '确认保存|Save and review',
    '请填写订单标题、交付要求、验收标准和计量单位。|Add an order title, deliverables, acceptance criteria and a unit of work.',
    '找不到这笔订单。|Order not found.',
    '交付需求|Deliverables',
    '验收标准|Acceptance criteria',
    '提交交付|Submit the work',
    '交付说明|Delivery notes',
    '提交验收|Submit for acceptance',
    '已提交的交付说明|Submitted delivery notes',
    '确认订单报价|Review the quote',
    '服务词元|Service tokens',
    '原版在确认时冻结预算，验收后结算。此处为演示报价。|The original site reserves the budget when you confirm, then settles it after acceptance. This is a demo quote.',
    '确认报价并发布|Confirm quote and post',
    '接单后可在「我的星球 · 订单任务」查看。|Find the task under My Planet → My Orders after you accept it.',
    '接受任务|Accept task',
    '演示订单已进入公开任务|Demo order added to public tasks',
    '已接单，可提交交付|Task accepted. You can now submit the work.',
    '交付已提交验收|Work submitted for acceptance',
    '每日签到|Daily check-in',
    '每天首次签到后可领取。|Claim once a day when you check in.',
    '保存一份原创草案|Save an original draft',
    '保存不少于 30 字的创意正文后领取。|Save a draft with at least 30 characters to claim.',
    '完成订单并通过验收|Complete an order and pass acceptance',
    '交付订单通过验收并结算后领取。|Claim after the order is accepted and settled.',
    '完成任务后领取演示词元。|Complete a task to claim demo tokens.',
    '去完成|Go to task',
    '今日已领取|Claimed today',
    '核验并领取|Verify and claim',
    '还未达到完成条件|This task isn’t complete yet',
    '演示词元|demo tokens',
  ].join('\n')).trim().split('\n').map((row) => row.split('|'))
);

const chineseChar = /[\u3400-\u9fff。]/;
const languageKey = 'ohcat-studio-language';
const requestedLocale = new URLSearchParams(location.search).get('lang');
let locale = ['zh','en'].includes(requestedLocale) ? requestedLocale : 'zh';
if (!requestedLocale) {
  try { if (localStorage.getItem(languageKey) === 'en') locale = 'en'; } catch {}
}

function uiLanguage() { return locale; }
function uiText(original) {
  if (locale !== 'en' || !original || !chineseChar.test(original)) return original;
  const trimmed = original.trim();
  const translated = english.get(trimmed) ?? translatePhrase(trimmed);
  return translated === trimmed ? original : original.replace(trimmed, () => translated);
}

function translatePhrase(text) {
  const patterns = [
    [/^查看(.+)$/, (_,name) => 'View ' + uiText(name)],
    [/^预览\s+(.+)$/, (_,name) => 'Preview ' + uiText(name)],
    [/^点赞\s+(.+)$/, (_,name) => 'Like ' + uiText(name)],
    [/^步骤 (\d+)$/, 'Step $1'],
    [/^镜头 (\d+)$/, 'Shot $1'],
    [/^灵感 (\d+)$/, 'Idea $1'],
    [/^共 (\d+) 个项目$/, '$1 projects'],
    [/^共 (\d+) 笔订单$/, '$1 orders'],
    [/^共 (\d+) 笔任务$/, '$1 tasks'],
    [/^已筹 (.+?)% · (.+?) 词元\/份$/, '$1% funded · $2 tokens/share'],
    [/^制作与发布预算 (.+?) 词元$/, 'Budget: $1 tokens'],
    [/^制作 (.+?) \+ 发布 (.+?) 词元$/, 'Production $1 + release $2 tokens'],
    [/^已筹 (.+?) · (\d+) 位参与者$/, '$1 raised · $2 backers'],
    [/^(.+?) 词元／份(?: · 截止 (.*))?$/, (_,amount,deadline) => amount + ' tokens/share' + (deadline ? ' · Closes ' + deadline : '')],
    [/^你已参与 (\d+) 份（演示）$/, 'You contributed $1 shares (demo)'],
    [/^(.+?) · 市场投入方 (.+?)% · 制作方 (.+?)%$/, (_,scheme,market,studio) => uiText(scheme) + ' · Backers ' + market + '% · Production ' + studio + '%'],
    [/^(.+?) · (.+?) · 净回款 (.+?)%$/, (_,name,role,share) => uiText(name) + ' · ' + uiText(role) + ' · Net proceeds ' + share + '%'],
    [/^总预算 (.+?) 词元 · 计划 (.+?) 份$/, 'Budget: $1 tokens · $2 shares'],
    [/^总预算 (.+?) 词元 · 总预算须为每份投入的整数倍$/, 'Budget: $1 tokens · Must be divisible by the cost per share'],
    [/^交付截止（北京时间）(.*)$/, (_,deadline) => 'Delivery due (Beijing time)' + (deadline ? ': ' + deadline : '')],
    [/^已领取 (.+?) 演示词元$/, 'Claimed $1 demo tokens'],
    [/^([+\d,.]+) 词元$/, '$1 tokens'],
    [/^([+\d,.]+) × ([+\d,.]+) (.+)$/, (_,price,qty,unit) => price + ' × ' + qty + ' ' + uiText(unit)],
  ];
  for (const [pattern, replacement] of patterns) {
    if (pattern.test(text)) return text.replace(pattern,replacement);
  }
  if (text.includes(' · ')) return text.split(' · ').map(uiText).join(' · ');
  return text;
}

const localizedAttributes = ['aria-label','placeholder','title','alt'];
const originalText = new WeakMap();
const originalAttributes = new WeakMap();
const skipped = 'script, style, textarea, svg, [data-no-translate]';

function projectText(node) {
  const actual = node.data;
  const record = originalText.get(node);
  const source = record?.presented === actual ? record.source : actual;
  const presented = uiText(source);
  if (record || presented !== source) originalText.set(node,{source,presented});
  if (presented !== actual) node.data = presented;
}
function projectAttribute(element, attribute) {
  const actual = element.getAttribute(attribute);
  if (actual === null) return;
  let records = originalAttributes.get(element);
  const record = records?.get(attribute);
  const source = record?.presented === actual ? record.source : actual;
  const presented = uiText(source);
  if (record || presented !== source) {
    if (!records) {
      records = new Map();
      originalAttributes.set(element,records);
    }
    records.set(attribute,{source,presented});
  }
  if (presented !== actual) element.setAttribute(attribute,presented);
}
function projectTree(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    if (!node.parentElement?.closest(skipped)) projectText(node);
    return;
  }
  if (node.nodeType !== Node.ELEMENT_NODE || node.closest(skipped)) {
    if (node.nodeType === Node.ELEMENT_NODE && node.matches('textarea:not([data-no-translate])')) {
      for (const attribute of localizedAttributes) projectAttribute(node,attribute);
    }
    return;
  }
  for (const attribute of localizedAttributes) projectAttribute(node,attribute);
  for (const child of node.childNodes) projectTree(child);
}
function paintLanguage() {
  document.documentElement.lang = locale === 'en' ? 'en' : 'zh-CN';
  document.title = uiText('OHCAT 星球 · 让想法有画面');
  const toggle = document.getElementById('language-toggle');
  toggle.textContent = locale === 'en' ? '中文' : 'EN';
  toggle.lang = locale === 'en' ? 'zh-CN' : 'en';
  toggle.setAttribute('aria-label',locale === 'en' ? '切换至中文' : 'Switch to English');
  projectTree(document.body);
}
const localeObserver = new MutationObserver((records) => {
  for (const record of records) {
    if (record.type === 'attributes') {
      if (!record.target.closest('[data-no-translate]')) projectAttribute(record.target,record.attributeName);
    } else if (record.type === 'characterData') {
      projectTree(record.target);
    } else {
      for (const node of record.addedNodes) projectTree(node);
    }
  }
});
paintLanguage();
localeObserver.observe(document.body,{
  subtree:true, childList:true, characterData:true, attributes:true, attributeFilter:localizedAttributes,
});
document.getElementById('language-toggle').addEventListener('click', () => {
  locale = locale === 'en' ? 'zh' : 'en';
  try { localStorage.setItem(languageKey,locale); } catch {}
  const url = new URL(location.href);
  url.searchParams.set('lang',locale);
  history.replaceState(history.state,'',url);
  paintLanguage();
});
