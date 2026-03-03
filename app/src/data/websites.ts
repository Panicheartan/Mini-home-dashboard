// 网站数据 - 从 req_docs/家庭网络.md 解析
// 类型定义已从 '@/types' 导入
import type { Site, SiteCategory, SiteGroup } from '@/types';

// 为了保持向后兼容，重新导出类型
export type { Site, SiteCategory, SiteGroup };

// AI 网址分类
export const aiSites: SiteCategory[] = [
  {
    id: 'llm-foreign',
    name: '大语言模型-国外',
    sites: [
      { name: 'ChatGPT', url: 'https://chat.openai.com', description: 'OpenAI出品，功能最全面' },
      { name: 'Claude', url: 'https://claude.ai', description: 'Anthropic出品，擅长长文本和代码' },
      { name: 'Gemini', url: 'https://gemini.google.com', description: 'Google出品，多模态能力强' },
      { name: 'Perplexity', url: 'https://www.perplexity.ai', description: '带搜索的AI问答' },
      { name: 'Mistral', url: 'https://chat.mistral.ai', description: '欧洲开源模型' },
      { name: 'Grok', url: 'https://grok.x.ai', description: 'xAI出品，X平台集成' },
    ]
  },
  {
    id: 'llm-domestic',
    name: '大语言模型-国内',
    sites: [
      { name: 'Kimi', url: 'https://kimi.moonshot.cn', description: '月之暗面，长文本处理强' },
      { name: '文心一言', url: 'https://yiyan.baidu.com', description: '百度出品' },
      { name: '通义千问', url: 'https://tongyi.aliyun.com', description: '阿里出品' },
      { name: '智谱清言', url: 'https://chatglm.cn', description: '清华系，GLM模型' },
      { name: '讯飞星火', url: 'https://xinghuo.xfyun.cn', description: '科大讯飞' },
      { name: '豆包', url: 'https://www.doubao.com', description: '字节跳动' },
      { name: 'DeepSeek', url: 'https://chat.deepseek.com', description: '深度求索，代码能力强' },
    ]
  },
  {
    id: 'image-foreign',
    name: '图像生成-国外',
    sites: [
      { name: 'Midjourney', url: 'https://www.midjourney.com', description: '艺术风格最强' },
      { name: 'DALL·E 3', url: 'https://chat.openai.com', description: 'OpenAI，集成ChatGPT' },
      { name: 'Stable Diffusion', url: 'https://stability.ai', description: '开源可本地部署' },
      { name: 'Leonardo.ai', url: 'https://leonardo.ai', description: '游戏资产专用' },
      { name: 'Adobe Firefly', url: 'https://firefly.adobe.com', description: 'Adobe生态集成' },
      { name: 'Ideogram', url: 'https://ideogram.ai', description: '文字渲染好' },
      { name: 'Flux', url: 'https://flux.ai', description: '黑森林实验室' },
    ]
  },
  {
    id: 'image-domestic',
    name: '图像生成-国内',
    sites: [
      { name: '即梦', url: 'https://jimeng.jianying.com', description: '字节跳动' },
      { name: '可灵', url: 'https://klingai.com', description: '快手出品' },
      { name: '通义万相', url: 'https://tongyi.aliyun.com/wanxiang', description: '阿里' },
      { name: '文心一格', url: 'https://yige.baidu.com', description: '百度' },
      { name: 'LiblibAI', url: 'https://www.liblib.art', description: 'SD模型社区' },
      { name: '吐司', url: 'https://tusiart.com', description: '在线SD' },
    ]
  },
  {
    id: 'video',
    name: '视频生成',
    sites: [
      { name: 'Sora', url: 'https://openai.com/sora', description: 'OpenAI，效果顶尖' },
      { name: 'Runway', url: 'https://runwayml.com', description: '功能全面' },
      { name: 'Pika', url: 'https://pika.art', description: '简单易用' },
      { name: 'HeyGen', url: 'https://www.heygen.com', description: '数字人视频' },
      { name: 'Kling', url: 'https://klingai.com', description: '快手可灵' },
      { name: 'Luma Dream Machine', url: 'https://lumalabs.ai/dream-machine', description: '快速生成' },
      { name: 'Hailuo AI', url: 'https://hailuoai.video', description: '海螺视频' },
      { name: 'Vidu', url: 'https://www.vidu.studio', description: '清华系' },
    ]
  },
  {
    id: 'audio',
    name: '音频音乐',
    sites: [
      { name: 'Suno', url: 'https://suno.ai', description: 'AI作曲演唱' },
    ]
  },
  {
    id: 'coding',
    name: '编程助手',
    sites: [
      { name: 'GitHub Copilot', url: 'https://github.com/features/copilot', description: '最流行' },
      { name: 'Cursor', url: 'https://cursor.com', description: 'AI原生IDE' },
      { name: 'Claude Code', url: 'https://code.claude.com', description: '命令行AI助手' },
      { name: 'Codeium', url: 'https://codeium.com', description: '免费替代' },
      { name: 'Tabnine', url: 'https://www.tabnine.com', description: '私有化部署' },
      { name: '通义灵码', url: 'https://tongyi.aliyun.com/lingma', description: '阿里' },
      { name: 'CodeGeeX', url: 'https://codegeex.cn', description: '清华系' },
      { name: 'MarsCode', url: 'https://www.marscode.cn', description: '字节跳动' },
    ]
  },
  {
    id: 'ai-search',
    name: 'AI搜索',
    sites: [
      { name: 'Perplexity', url: 'https://www.perplexity.ai', description: '国外最强' },
      { name: '秘塔AI搜索', url: 'https://metaso.cn', description: '中文搜索强' },
    ]
  },
  {
    id: 'learning',
    name: '学习资源',
    sites: [
      { name: 'Fast.ai', url: 'https://www.fast.ai', description: '免费深度学习' },
      { name: 'DeepLearning.AI', url: 'https://www.deeplearning.ai', description: '吴恩达' },
      { name: 'Coursera', url: 'https://www.coursera.org', description: '综合课程' },
      { name: 'Hugging Face', url: 'https://huggingface.co/learn', description: '实战教程' },
      { name: '李宏毅机器学习', url: 'https://speech.ee.ntu.edu.tw/~hylee/ml/2023-course.php', description: '中文经典' },
      { name: '斯坦福CS231n', url: 'https://cs231n.stanford.edu', description: '计算机视觉' },
    ]
  },
  {
    id: 'community',
    name: '技术社区',
    sites: [
      { name: 'Hugging Face', url: 'https://huggingface.co', description: '模型社区' },
      { name: 'Papers With Code', url: 'https://paperswithcode.com', description: '论文+代码' },
      { name: 'arXiv', url: 'https://arxiv.org', description: '学术论文' },
      { name: 'Reddit ML', url: 'https://www.reddit.com/r/MachineLearning', description: '讨论社区' },
      { name: '机器之心', url: 'https://www.jiqizhixin.com', description: '中文AI媒体' },
      { name: '量子位', url: 'https://www.qbitai.com', description: '中文AI资讯' },
    ]
  },
  {
    id: 'llm-framework',
    name: '开发工具-LLM框架',
    sites: [
      { name: 'LangChain', url: 'https://www.langchain.com', description: '应用框架' },
      { name: 'LlamaIndex', url: 'https://www.llamaindex.ai', description: 'RAG框架' },
      { name: 'CrewAI', url: 'https://www.crewai.com', description: '多智能体' },
      { name: 'AutoGen', url: 'https://microsoft.github.io/autogen', description: '微软多智能体' },
      { name: 'Dify', url: 'https://dify.ai', description: '可视化开发' },
      { name: 'Coze', url: 'https://www.coze.com', description: '字节Bot平台' },
      { name: 'FastGPT', url: 'https://fastgpt.in', description: '国产RAG' },
    ]
  },
  {
    id: 'enterprise',
    name: '企业服务',
    sites: [
      { name: 'OpenAI API', url: 'https://platform.openai.com', description: 'GPT接口' },
      { name: 'Anthropic API', url: 'https://console.anthropic.com', description: 'Claude接口' },
      { name: 'Google AI Studio', url: 'https://aistudio.google.com', description: 'Gemini接口' },
      { name: 'Azure OpenAI', url: 'https://azure.microsoft.com/openai', description: '企业级' },
      { name: 'AWS Bedrock', url: 'https://aws.amazon.com/bedrock', description: '多模型' },
      { name: '阿里云百炼', url: 'https://bailian.aliyun.com', description: '国产大模型' },
      { name: '火山引擎', url: 'https://www.volcengine.com', description: '字节云' },
      { name: '智谱AI', url: 'https://open.bigmodel.cn', description: 'GLM接口' },
    ]
  },
  {
    id: 'directory',
    name: '导航站',
    sites: [
      { name: 'Futurepedia', url: 'https://www.futurepedia.io', description: '最全AI目录' },
      { name: 'TheresAnAIForThat', url: 'https://theresanaiforthat.com', description: '按场景分类' },
      { name: 'Product Hunt', url: 'https://www.producthunt.com', description: '新产品发现' },
      { name: 'AI Tools Directory', url: 'https://aitoolsdirectory.com', description: '分类清晰' },
      { name: 'Toolify', url: 'https://www.toolify.ai', description: '中文导航' },
      { name: 'AIHub', url: 'https://www.aihub.cn', description: '中文导航' },
    ]
  }
];

// 娱乐分类
export const entertainmentSites: SiteCategory[] = [
  {
    id: 'video-general',
    name: '综合视频',
    sites: [
      { name: '哔哩哔哩', url: 'https://www.bilibili.com', description: '弹幕视频，二次元、学习、娱乐' },
      { name: 'YouTube', url: 'https://www.youtube.com', description: '全球最大视频平台' },
    ]
  },
  {
    id: 'live',
    name: '直播',
    sites: [
      { name: '斗鱼直播', url: 'https://www.douyu.com', description: '游戏直播为主' },
      { name: '虎牙直播', url: 'https://www.huya.com', description: '游戏直播为主' },
    ]
  },
  {
    id: 'movie',
    name: '影视资源',
    sites: [
      { name: '豆瓣电影', url: 'https://movie.douban.com', description: '电影评分评论' },
      { name: '时光网', url: 'http://www.mtime.com', description: '电影资讯数据库' },
      { name: '猫眼电影', url: 'https://www.maoyan.com', description: '电影票务，票房数据' },
      { name: '淘票票', url: 'https://www.taopiaopiao.com', description: '阿里电影票务' },
      { name: 'Netflix', url: 'https://www.netflix.com', description: '全球流媒体龙头' },
      { name: 'Disney+', url: 'https://www.disneyplus.com', description: '迪士尼流媒体' },
      { name: 'HBO Max', url: 'https://www.max.com', description: 'HBO流媒体' },
      { name: 'Amazon Prime Video', url: 'https://www.primevideo.com', description: '亚马逊视频' },
      { name: 'Hulu', url: 'https://www.hulu.com', description: '美国流媒体' },
      { name: 'Apple TV+', url: 'https://tv.apple.com', description: '苹果原创剧集' },
      { name: 'Paramount+', url: 'https://www.paramountplus.com', description: '派拉蒙流媒体' },
      { name: 'Peacock', url: 'https://www.peacocktv.com', description: 'NBC环球流媒体' },
      { name: '韩剧TV', url: 'https://www.hanjutv.com', description: '韩剧资源' },
      { name: '日剧TV', url: 'https://www.rijutv.com', description: '日剧资源' },
      { name: '美剧天堂', url: 'https://www.meijutt.com', description: '美剧资源' },
      { name: '人人视频', url: 'https://www.rr.tv', description: '海外剧集' },
      { name: '埋堆堆', url: 'https://www.maiduidui.com', description: 'TVB港剧' },
      { name: '南瓜电影', url: 'https://www.vcinema.com.cn', description: '正版影视' },
      { name: '欢喜首映', url: 'https://www.huanxi.com', description: '正版影视' },
    ]
  },
  {
    id: 'anime',
    name: '动漫动画',
    sites: [
      { name: '哔哩哔哩', url: 'https://www.bilibili.com', description: '二次元主阵地' },
      { name: 'AcFun', url: 'https://www.acfun.cn', description: '弹幕视频，二次元' },
      { name: '半次元', url: 'https://www.bcy.net', description: '二次元社区' },
      { name: '第一弹', url: 'https://www.diyidan.com', description: '二次元社区' },
      { name: 'Crunchyroll', url: 'https://www.crunchyroll.com', description: '海外动漫平台' },
      { name: 'Funimation', url: 'https://www.funimation.com', description: '海外动漫平台' },
    ]
  },
  {
    id: 'music',
    name: '音乐MV',
    sites: [
      { name: 'QQ音乐', url: 'https://y.qq.com', description: '音乐播放，MV' },
      { name: '网易云音乐', url: 'https://music.163.com', description: '音乐播放，MV' },
      { name: 'Spotify', url: 'https://www.spotify.com', description: '全球音乐流媒体' },
    ]
  }
];

// 知识分类
export const knowledgeSites: SiteCategory[] = [
  {
    id: 'education',
    name: '知识教育',
    sites: [
      { name: '小红书', url: 'https://www.xiaohongshu.com', description: '生活方式，种草社区' },
      { name: '网易云课堂', url: 'https://study.163.com', description: '职业技能课程' },
      { name: '腾讯课堂', url: 'https://ke.qq.com', description: '在线课程' },
      { name: '慕课网', url: 'https://www.imooc.com', description: 'IT编程课程' },
      { name: '中国大学MOOC', url: 'https://www.icourse163.org', description: '高校课程' },
      { name: '学堂在线', url: 'https://www.xuetangx.com', description: '清华课程' },
      { name: '超星学习通', url: 'https://www.chaoxing.com', description: '高校教学平台' },
      { name: 'CSDN', url: 'https://www.csdn.net', description: '技术社区，视频' },
      { name: '知乎', url: 'https://www.zhihu.com', description: '问答社区，视频' },
    ]
  },
  {
    id: 'university-domestic',
    name: '国内大学',
    sites: [
      { name: '清华大学', url: 'https://www.tsinghua.edu.cn' },
      { name: '北京大学', url: 'https://www.pku.edu.cn' },
      { name: '浙江大学', url: 'https://www.zju.edu.cn' },
      { name: '上海交通大学', url: 'https://www.sjtu.edu.cn' },
      { name: '复旦大学', url: 'https://www.fudan.edu.cn' },
      { name: '南京大学', url: 'https://www.nju.edu.cn' },
      { name: '中国科学技术大学', url: 'https://www.ustc.edu.cn' },
      { name: '华中科技大学', url: 'https://www.hust.edu.cn' },
      { name: '武汉大学', url: 'https://www.whu.edu.cn' },
      { name: '西安交通大学', url: 'https://www.xjtu.edu.cn' },
      { name: '中山大学', url: 'https://www.sysu.edu.cn' },
      { name: '北京航空航天大学', url: 'https://www.buaa.edu.cn' },
      { name: '东南大学', url: 'https://www.seu.edu.cn' },
      { name: '北京理工大学', url: 'https://www.bit.edu.cn' },
      { name: '四川大学', url: 'https://www.scu.edu.cn' },
      { name: '哈尔滨工业大学', url: 'https://www.hit.edu.cn' },
      { name: '同济大学', url: 'https://www.tongji.edu.cn' },
      { name: '中国人民大学', url: 'https://www.ruc.edu.cn' },
      { name: '北京师范大学', url: 'https://www.bnu.edu.cn' },
      { name: '南开大学', url: 'https://www.nankai.edu.cn' },
      { name: '天津大学', url: 'https://www.tju.edu.cn' },
      { name: '山东大学', url: 'https://www.sdu.edu.cn' },
      { name: '中南大学', url: 'https://www.csu.edu.cn' },
      { name: '西北工业大学', url: 'https://www.nwpu.edu.cn' },
      { name: '厦门大学', url: 'https://www.xmu.edu.cn' },
      { name: '华南理工大学', url: 'https://www.scut.edu.cn' },
      { name: '吉林大学', url: 'https://www.jlu.edu.cn' },
      { name: '电子科技大学', url: 'https://www.uestc.edu.cn' },
      { name: '湖南大学', url: 'https://www.hnu.edu.cn' },
      { name: '中国农业大学', url: 'https://www.cau.edu.cn' },
      { name: '华东师范大学', url: 'https://www.ecnu.edu.cn' },
      { name: '大连理工大学', url: 'https://www.dlut.edu.cn' },
      { name: '重庆大学', url: 'https://www.cqu.edu.cn' },
      { name: '东北大学', url: 'https://www.neu.edu.cn' },
      { name: '兰州大学', url: 'https://www.lzu.edu.cn' },
      { name: '中国海洋大学', url: 'https://www.ouc.edu.cn' },
    ]
  }
];

// 工具分类
export const toolSites: SiteCategory[] = [
  {
    id: 'ui-design',
    name: 'UI/UX设计',
    sites: [
      { name: 'Figma', url: 'https://www.figma.com', description: '在线协作UI设计，行业标准' },
      { name: 'Sketch', url: 'https://www.sketch.com', description: 'Mac端UI设计工具' },
      { name: 'Adobe XD', url: 'https://www.adobe.com/products/xd', description: 'Adobe UI/UX设计工具' },
      { name: 'InVision', url: 'https://www.invisionapp.com', description: '原型设计协作平台' },
      { name: 'Axure RP', url: 'https://www.axure.com', description: '高保真原型设计' },
      { name: 'ProtoPie', url: 'https://www.protopie.io', description: '高保真交互原型' },
      { name: 'Framer', url: 'https://www.framer.com', description: '网站设计开发一体化' },
      { name: 'Webflow', url: 'https://webflow.com', description: '无代码网站设计' },
      { name: 'Pixso', url: 'https://pixso.cn', description: '国产在线设计工具' },
      { name: '即时设计', url: 'https://js.design', description: '国产在线UI设计' },
      { name: '墨刀', url: 'https://modao.cc', description: '国产原型设计工具' },
      { name: 'MasterGo', url: 'https://mastergo.com', description: '国产协作设计工具' },
    ]
  },
  {
    id: 'graphic-design',
    name: '平面设计',
    sites: [
      { name: 'Adobe Photoshop', url: 'https://www.adobe.com/products/photoshop', description: '图像处理，行业标准' },
      { name: 'Adobe Illustrator', url: 'https://www.adobe.com/products/illustrator', description: '矢量图形设计' },
      { name: 'Adobe InDesign', url: 'https://www.adobe.com/products/indesign', description: '排版出版设计' },
      { name: 'Canva', url: 'https://www.canva.com', description: '在线平面设计，模板丰富' },
      { name: 'Affinity Designer', url: 'https://affinity.serif.com/designer', description: '矢量设计，Adobe替代品' },
      { name: 'Affinity Photo', url: 'https://affinity.serif.com/photo', description: '图像编辑，Adobe替代品' },
      { name: 'Photopea', url: 'https://www.photopea.com', description: '在线PS替代品' },
      { name: '稿定设计', url: 'https://www.gaoding.com', description: '国产在线设计，模板多' },
      { name: '创客贴', url: 'https://www.chuangkit.com', description: '国产在线平面设计' },
      { name: '图怪兽', url: 'https://818ps.com', description: '国产在线设计工具' },
    ]
  },
  {
    id: 'inspiration',
    name: '灵感收集',
    sites: [
      { name: 'Pinterest', url: 'https://www.pinterest.com', description: '图片灵感收集，瀑布流' },
      { name: 'Behance', url: 'https://www.behance.net', description: 'Adobe设计师作品展示' },
      { name: 'Dribbble', url: 'https://dribbble.com', description: '设计师作品分享社区' },
      { name: '站酷', url: 'https://www.zcool.com.cn', description: '中国设计师社区' },
      { name: 'UI中国', url: 'https://www.ui.cn', description: 'UI设计专业社区' },
      { name: '花瓣网', url: 'https://huaban.com', description: '图片素材收集' },
      { name: '优设网', url: 'https://www.uisdc.com', description: '设计文章教程' },
      { name: 'Awwwards', url: 'https://www.awwwards.com', description: '网页设计奖项展示' },
    ]
  },
  {
    id: 'icon',
    name: '图标素材',
    sites: [
      { name: 'Iconfont', url: 'https://www.iconfont.cn', description: '阿里图标库，免费' },
      { name: 'Flaticon', url: 'https://www.flaticon.com', description: '免费矢量图标' },
      { name: 'Iconfinder', url: 'https://www.iconfinder.com', description: '图标搜索下载' },
      { name: 'Noun Project', url: 'https://thenounproject.com', description: '图标素材库' },
      { name: 'Heroicons', url: 'https://heroicons.com', description: 'Tailwind官方图标' },
      { name: 'Lucide', url: 'https://lucide.dev', description: '开源图标库' },
      { name: 'Tabler Icons', url: 'https://tabler-icons.io', description: '免费SVG图标' },
      { name: 'Material Icons', url: 'https://fonts.google.com/icons', description: 'Google官方图标' },
      { name: 'Simple Icons', url: 'https://simpleicons.org', description: '品牌图标库' },
    ]
  },
  {
    id: 'illustration',
    name: '插画素材',
    sites: [
      { name: 'unDraw', url: 'https://undraw.co', description: '开源扁平插画' },
      { name: 'Blush', url: 'https://blush.design', description: '可定制插画' },
      { name: 'Storyset', url: 'https://storyset.com', description: '免费矢量插画' },
      { name: 'Freepik', url: 'https://www.freepik.com', description: '矢量素材库' },
      { name: 'Vecteezy', url: 'https://www.vecteezy.com', description: '矢量素材' },
      { name: 'DrawKit', url: 'https://www.drawkit.com', description: '插画素材包' },
    ]
  },
  {
    id: 'image',
    name: '图片素材',
    sites: [
      { name: 'Unsplash', url: 'https://unsplash.com', description: '免费高质量图片' },
      { name: 'Pexels', url: 'https://www.pexels.com', description: '免费图片视频' },
      { name: 'Pixabay', url: 'https://pixabay.com', description: '免费图片素材' },
      { name: 'Stocksnap', url: 'https://stocksnap.io', description: '免费高清图片' },
    ]
  },
  {
    id: 'font',
    name: '字体资源',
    sites: [
      { name: 'Google Fonts', url: 'https://fonts.google.com', description: '免费开源字体' },
      { name: 'Adobe Fonts', url: 'https://fonts.adobe.com', description: '专业字体库' },
      { name: '字由', url: 'https://www.hellofont.cn', description: '国产字体管理' },
      { name: '求字体网', url: 'https://www.qiuziti.com', description: '字体识别下载' },
      { name: '站酷字体', url: 'https://www.zcool.com.cn/special/zcoolfonts', description: '免费商用字体' },
      { name: '猫啃网', url: 'https://www.maoken.com', description: '免费商用字体' },
    ]
  },
  {
    id: 'color',
    name: '配色工具',
    sites: [
      { name: 'Coolors', url: 'https://coolors.co', description: '配色方案生成' },
      { name: 'Color Hunt', url: 'https://colorhunt.co', description: '配色灵感' },
      { name: 'Adobe Color', url: 'https://color.adobe.com', description: 'Adobe配色工具' },
      { name: 'Colormind', url: 'http://colormind.io', description: 'AI配色生成' },
      { name: 'Khroma', url: 'https://khroma.co', description: 'AI配色工具' },
      { name: '中国色', url: 'http://zhongguose.com', description: '中国传统颜色' },
      { name: '日本色', url: 'https://nipponcolors.com', description: '日本传统颜色' },
    ]
  },
  {
    id: 'animation',
    name: '动效设计',
    sites: [
      { name: 'After Effects', url: 'https://www.adobe.com/products/aftereffects', description: '视频动效设计' },
      { name: 'LottieFiles', url: 'https://lottiefiles.com', description: '动画JSON格式' },
      { name: 'Rive', url: 'https://rive.app', description: '交互式动画' },
      { name: 'Spline', url: 'https://spline.design', description: '3D交互动画' },
    ]
  },
  {
    id: 'design-system',
    name: '设计规范',
    sites: [
      { name: 'Storybook', url: 'https://storybook.js.org', description: 'UI组件文档' },
      { name: 'Zeroheight', url: 'https://zeroheight.com', description: '设计系统文档' },
      { name: 'Frontify', url: 'https://www.frontify.com', description: '品牌管理' },
    ]
  },
  {
    id: 'design-handoff',
    name: '设计交付',
    sites: [
      { name: 'Zeplin', url: 'https://zeplin.io', description: '设计交付开发' },
      { name: 'Avocode', url: 'https://avocode.com', description: '设计转代码' },
      { name: 'Figma Dev Mode', url: 'https://www.figma.com/dev-mode', description: 'Figma开发模式' },
      { name: 'Sympli', url: 'https://sympli.io', description: '设计交付平台' },
    ]
  },
  {
    id: 'ai-design',
    name: 'AI设计',
    sites: [
      { name: 'Midjourney', url: 'https://www.midjourney.com', description: 'AI图像生成' },
      { name: 'Stable Diffusion', url: 'https://stability.ai', description: '开源AI绘画' },
      { name: 'v0.dev', url: 'https://v0.dev', description: 'Vercel AI生成' },
      { name: 'Microsoft Designer', url: 'https://designer.microsoft.com', description: '微软AI设计' },
      { name: 'Uizard', url: 'https://uizard.io', description: 'AI界面设计' },
    ]
  },
  {
    id: 'design-learning',
    name: '设计学习',
    sites: [
      { name: 'DesignCode', url: 'https://www.designcode.io', description: '设计开发课程' },
      { name: 'NN/g Nielsen Norman', url: 'https://www.nngroup.com', description: 'UX研究权威' },
      { name: 'IDF交互设计基金会', url: 'https://www.interaction-design.org', description: 'UX课程' },
      { name: 'Coursera设计课程', url: 'https://www.coursera.org', description: '在线课程' },
      { name: 'Udemy设计课程', url: 'https://www.udemy.com', description: '在线课程' },
      { name: '虎课网', url: 'https://huke88.com', description: '国产设计教程' },
    ]
  },
  {
    id: 'design-tools',
    name: '设计工具-其他',
    sites: [
      { name: 'Miro', url: 'https://miro.com', description: '在线白板协作' },
      { name: 'FigJam', url: 'https://www.figma.com/figjam', description: 'Figma白板' },
      { name: 'Whimsical', url: 'https://whimsical.com', description: '流程图线框图' },
      { name: 'Milanote', url: 'https://milanote.com', description: '创意笔记板' },
    ]
  }
];

// 所有分类的大类
export const allCategories = [
  { id: 'ai', name: 'AI网址', icon: '🤖', data: aiSites },
  { id: 'entertainment', name: '娱乐', icon: '🎬', data: entertainmentSites },
  { id: 'knowledge', name: '知识', icon: '📚', data: knowledgeSites },
  { id: 'tools', name: '工具', icon: '🔧', data: toolSites },
];

// 获取所有网站列表
export function getAllSites(): Site[] {
  const all: Site[] = [];
  for (const category of allCategories) {
    for (const subCategory of category.data) {
      all.push(...subCategory.sites);
    }
  }
  return all;
}

// 根据分类ID获取网站
export function getSitesByCategoryId(categoryId: string): SiteCategory[] {
  const category = allCategories.find(c => c.id === categoryId);
  return category?.data || [];
}
