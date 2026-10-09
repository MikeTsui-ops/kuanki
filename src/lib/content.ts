export type Locale = 'zh' | 'en'
export type Kind = 'divisions' | 'products' | 'industries' | 'cases' | 'resources' | 'certifications'
export type Entry = {
  id: string; kind: Kind; title: string; intro: string; tag: string;
  division?: string; sections: { title: string; text: string }[]; image?: string; imageAlt?: string;
  seoTitle?: string; seoDescription?: string; downloadURL?: string;
}
export const company = { zh: '江苏匡集工业科技有限公司', en: 'Jiangsu Kuanki Industry&Technology Co., Ltd' }
export const t = (locale: string, zh: string, en: string) => locale === 'zh' ? zh : en
export const navigation = [
  ['divisions','业务与产品','Our expertise'], ['industries','行业方案','Industries'],
  ['cases','项目案例','Projects'], ['resources','技术与资料','Insights'],
  ['about','关于匡集','About KUANKI'],
] as const
export const labels: Record<Kind, [string,string]> = {
  divisions:['三大事业部','Our expertise'], products:['产品与服务','Products & services'],
  industries:['行业解决方案','Industries'], cases:['项目案例','Project experience'],
  resources:['技术与资料','Insights & resources'], certifications:['资质与认证','Credentials'],
}
function entry(locale: Locale, kind: Kind, id: string, title: [string,string], intro: [string,string], tag: [string,string], sections: [string,string,string,string][], division?: string): Entry {
  const n = locale === 'zh' ? 0 : 1
  return { id,kind,title:title[n],intro:intro[n],tag:tag[n],division,sections:sections.map(s=>({title:s[n],text:s[n+2]})) }
}
export function initialContent(locale: Locale): Entry[] {
  return [
    entry(locale,'divisions','conveying',['传动输送','Conveying & transmission'],['以精益制造为基础，专注螺旋输送设备与核心部件，为多行业物料输送提供可靠支持。','Precision-focused manufacturing of screw conveyors and core components for material handling across industries.'],['精益制造 · 可靠输送','LEAN MANUFACTURING'],[
      ['产品与制造','Products & manufacturing','制造螺旋输送机、螺旋轴与螺旋叶片，围绕物料特性、工况及设备接口开展技术沟通。','Screw conveyors, screw shafts and screw flights developed around material characteristics, operating conditions and equipment interfaces.'],
      ['质量与交付','Quality & delivery','将精益化管理贯穿生产组织与质量控制，重视技术要求确认、过程检验及交付协同。','Lean production management, requirements review, process inspection and coordinated delivery support consistent execution.'],
      ['服务行业','Applications','化工、环保、医药、食品、矿山、造纸、林业、港口、农业与桩工机械。','Chemicals, environmental engineering, pharmaceuticals, food, mining, paper, forestry, ports, agriculture and piling machinery.'],
    ]),
    entry(locale,'divisions','gas-systems',['空分流体','Central gas supply'],['从需求分析到方案设计，为车间、实验室及专业应用场景提供集中供气管路系统解决方案。','Central gas distribution solutions for manufacturing facilities, laboratories and specialist applications.'],['专业设计 · 系统协同','SYSTEM ENGINEERING'],[
      ['方案设计','Solution design','围绕气体种类、用气点、压力流量需求及现场条件进行系统规划，组织技术方案沟通。','System planning based on gas types, points of use, pressure and flow requirements, and site conditions.'],
      ['应用场景','Applications','大型机械装配、汽车与农机、航空与造船、研发实验室、医用供氧及高纯气体集中供气。','Heavy equipment assembly, automotive and agricultural machinery, aerospace and shipbuilding, research laboratories, medical oxygen and high-purity gas distribution.'],
      ['项目协同','Project coordination','依托专业团队与品牌企业合作经验，重视方案设计、项目接口和实施过程协同。','An experienced team supports solution design, interface coordination and project execution. Specific technical requirements are reviewed for each project.'],
    ]),
    entry(locale,'divisions','water-treatment',['循环水处理','Circulating water treatment'],['聚焦循环水质提升、节能与环保，结合实际工况制定水处理和水资源利用方案。','Water-quality improvement, energy efficiency and resource-conscious solutions tailored to operating conditions.'],['水质提升 · 节能环保','WATER & EFFICIENCY'],[
      ['工况驱动','Operating conditions first','从水源、水质、系统负荷与现有运行问题出发，梳理项目目标和技术实施条件。','Begin with water sources, quality, system loads and operating challenges to define objectives and technical conditions.'],
      ['方案与验证','Solutions & evaluation','围绕循环水质提升、节能环保及中水回用开展技术方案交流；效果指标依据项目数据和适用工况确认。','Evaluate water-quality improvement, efficiency and water reuse opportunities. Performance targets are confirmed using project data and relevant conditions.'],
      ['行业覆盖','Industry coverage','化工、染整、钢铁、发电厂、数据中心、算力中心及中水回用场景。','Chemicals, textile dyeing and finishing, steel, power generation, data centers, computing facilities and water reuse.'],
    ]),
    entry(locale,'products','screw-conveyors',['螺旋输送机','Screw conveyors'],['面向工业物料输送，结合物料特性、产能需求与现场布局沟通设备方案。','Conveying solutions considered against material properties, throughput and available space.'],['传动输送','CONVEYING'],[
      ['选型沟通','Selection inputs','请提供物料名称、堆积密度、粒度、含水率、输送量、输送距离和倾角，以及温度和环境要求。','Share material type, bulk density, particle size, moisture, throughput, conveying distance, incline, temperature and site requirements.'],
      ['项目适配','Project fit','结构、材质、驱动及接口方案需结合具体工况确认。可提交现有图纸或需求清单进行技术交流。','Configuration, materials, drive and interfaces are confirmed against specific conditions. Existing drawings and requirement lists support technical review.'],
    ],'conveying'),
    entry(locale,'products','screw-shafts',['螺旋轴','Screw shafts'],['用于螺旋输送及相关机械装备的核心部件制造。','Core components for screw conveying and related machinery.'],['核心部件','COMPONENTS'],[
      ['技术输入','Technical inputs','围绕图纸、总长、轴径、螺距、材质及连接方式确认加工需求。','Review drawings, overall length, shaft diameter, pitch, materials and connection details.'],
      ['制造协同','Manufacturing coordination','在制造前沟通尺寸要求、检验项目及交付安排，支持设备配套与部件更新需求。','Agree dimensions, inspection requirements and delivery arrangements for equipment integration or component replacement.'],
    ],'conveying'),
    entry(locale,'products','screw-flights',['螺旋叶片','Screw flights'],['面向输送设备及机械配套的螺旋叶片制造。','Screw flights for conveying equipment and machinery integration.'],['核心部件','COMPONENTS'],[
      ['规格确认','Specification review','提供外径、内径、螺距、板厚、旋向和材质信息，结合图纸确认产品要求。','Provide outside and inside diameters, pitch, thickness, handedness and material, supported by drawings.'],
      ['应用沟通','Application review','结合物料与磨损环境讨论制造要求，具体规格与供货范围以技术确认结果为准。','Discuss manufacturing requirements in the context of materials and wear conditions. Supply scope follows technical confirmation.'],
    ],'conveying'),
    entry(locale,'products','central-gas-distribution',['集中供气管路系统','Central gas distribution systems'],['为车间、实验室及专业设施统筹气源至用气点的管路系统需求。','Coordinating gas distribution requirements from the source to points of use.'],['空分流体','GAS SYSTEMS'],[
      ['需求梳理','Requirements','明确气体种类、纯度、压力、流量、用气点数量及未来扩展需求。','Define gas types, purity, pressure, flow, points of use and future expansion requirements.'],
      ['系统协同','System coordination','结合现场条件与项目要求开展方案设计，沟通管路布局、接口及实施边界。','Develop the solution around site conditions and project requirements, including layout, interfaces and implementation boundaries.'],
    ],'gas-systems'),
    entry(locale,'products','water-optimization',['循环水优化与中水回用','Water optimization & reuse'],['围绕水质、系统运行与资源利用需求开展技术诊断和方案交流。','Technical assessment and solution development for water quality, operation and resource use.'],['循环水处理','WATER TREATMENT'],[
      ['基础资料','Project inputs','准备水质检测报告、系统流程、补排水数据、运行负荷及当前问题描述。','Prepare water analyses, system diagrams, makeup and discharge data, operating loads and current issues.'],
      ['目标确认','Objective setting','依据实际工况讨论水质目标、节能空间及回用条件，评价方法与项目目标共同确认。','Agree water-quality objectives, efficiency opportunities, reuse conditions and evaluation methods for the specific project.'],
    ],'water-treatment'),
    ...[
      ['chemicals','化工与流程工业','Chemicals & process industries','物料输送、集中供气与循环水系统，服务连续生产中的多种工程需求。','Material handling, gas distribution and circulating water solutions for process operations.','conveying'],
      ['manufacturing','装备与先进制造','Equipment & advanced manufacturing','面向工程机械、汽车、农机、航空和造船等制造场景，规划车间集中供气。','Central gas distribution planning for heavy equipment, automotive, agricultural machinery, aerospace and shipbuilding.','gas-systems'],
      ['laboratories','实验室与研发','Laboratories & research','结合实验用气种类、纯度、用气点和扩展需求开展集中供气方案设计。','Gas distribution design around laboratory gas types, purity, points of use and expansion.','gas-systems'],
      ['high-purity','高纯气体应用','High-purity applications','面向半导体、航天等应用场景，沟通高纯气体集中供气的系统要求。','Reviewing high-purity gas distribution requirements for semiconductor, aerospace and specialist applications.','gas-systems'],
      ['energy-steel','能源与钢铁','Energy & steel','结合发电和钢铁企业循环水工况，讨论水质提升与节能环保方案。','Water-quality and efficiency solutions considered for power generation and steel operations.','water-treatment'],
      ['data-centers','数据与算力中心','Data & computing centers','关注循环水运行、水质稳定与资源利用，结合设施条件制定优化路径。','Water system operation, quality and resource use, assessed in the context of the facility.','water-treatment'],
    ].map(([id,zh,en,zdesc,edesc,division])=>entry(locale,'industries',id,[zh,en],[zdesc,edesc],['行业应用','INDUSTRY'],[
      ['从项目需求出发','Start with project requirements','请提供项目所在地、建设阶段、现场条件与主要技术需求，便于我们匹配对应事业部开展沟通。','Share the location, project stage, site conditions and technical requirements so the relevant division can assess your needs.'],
      ['协同设计与交付','Coordinate design & delivery','与业主、设计团队及工程总包方对接技术接口和供货边界，结合具体项目明确实施与交付要求。','Coordinate technical interfaces and supply boundaries with owners, designers and EPC teams, and confirm delivery requirements for each project.'],
    ],division)),
    entry(locale,'resources','conveyor-project-checklist',['螺旋输送项目：技术沟通前准备什么？','Preparing a screw conveying project brief'],['整理关键工况信息，让设备选型和项目沟通更加高效。','A practical checklist for a more productive equipment selection discussion.'],['选型指南','PROJECT GUIDE'],[
      ['物料信息','Material information','明确物料名称、粒度、堆积密度、含水率和温度，说明是否存在腐蚀、磨损或粘附问题。','Describe material type, particle size, bulk density, moisture and temperature, and identify corrosion, wear or adhesion concerns.'],
      ['输送条件','Conveying requirements','说明目标输送量、距离、倾角、进出料位置及现场空间限制，并提供已有布置图。','Specify throughput, distance, inclination, inlet and outlet positions and space limitations, with available layout drawings.'],
      ['项目边界','Project boundaries','明确配套设备接口、项目进度及所需技术文件。最终选型由双方根据实际工况确认。','Identify equipment interfaces, schedule and required documentation. Final selection follows a project-specific technical review.'],
    ],'conveying'),
    entry(locale,'resources','gas-system-planning',['集中供气系统：如何梳理项目需求？','Planning a central gas distribution system'],['从气体、用气点与现场条件出发，建立清晰的设计输入。','Define clear design inputs through gas requirements, points of use and site conditions.'],['需求指南','PLANNING GUIDE'],[
      ['用气清单','Gas requirements','按气体种类整理纯度、工作压力、用量与使用方式，并区分现有需求和预留需求。','List purity, operating pressure, consumption and usage patterns by gas type, separating current demand from future needs.'],
      ['现场与接口','Site & interfaces','准备平面布局、气源位置、用气点位置和已有设施信息。','Prepare layouts showing gas sources, points of use and existing facilities.'],
      ['技术评审','Technical review','专业团队需结合应用场景和适用要求开展详细评审，本文不替代工程设计。','Detailed assessment by the project team must consider the application and applicable requirements. This checklist does not replace engineering design.'],
    ],'gas-systems'),
    entry(locale,'resources','water-project-assessment',['循环水优化：从哪些基础数据开始？','Baseline data for water system optimization'],['以真实运行数据支撑目标设定与方案评估。','Use operating data to support objective setting and solution assessment.'],['运行观察','TECHNICAL NOTE'],[
      ['建立基线','Establish a baseline','收集水质报告、系统流程、负荷、补水和排水记录，记录数据采集时间与运行条件。','Collect water analyses, process diagrams, loads, makeup and discharge records, noting the dates and operating conditions.'],
      ['描述问题','Define the challenge','整理现场观察到的水质及运行问题，说明现有处理方式和希望改善的方向。','Describe observed water-quality and operating issues, existing treatment and desired improvements.'],
      ['确认评价方式','Agree evaluation methods','在实施前明确评估周期与指标，避免将不同工况下的数据直接对比。','Agree the evaluation period and indicators before implementation; comparisons should account for differences in operating conditions.'],
    ],'water-treatment'),
  ]
}
