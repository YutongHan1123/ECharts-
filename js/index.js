//监控区域模块
// 随时调用 避免var污染
(function(){
    //toggle 功能
    $('.monitor .tabs').on('click', 'a', function() {
        $(this).addClass('active')
        .siblings('a').removeClass('active');
        // console.log($(this).index())
        $('.monitor .content').eq($(this).index()).show()
        .siblings('.content').hide()
    })

    // 克隆marquee里所有的行row
    $('.marquee-view .marquee').each(function() {
        var rows = $(this).children().clone();
        $(this).append(rows);
    })
})();
// 点位分布统计模块
(function(){
    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector('.pie'));
    // 2. 指定配置项和数据
    var option = {
        color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
        tooltip: {
          trigger: 'item',
        //   a: series系列图标名称——点位模式
        //   b: series系列数据名称——name：rose 1......
        //   c: series数据值 value: 30...
        //   d: 当前数据/总数据的比例
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '点位模式',
            type: 'pie',
            // [chart内径, 外径]
            radius: [10, 70],
            center: ['50%', '50%'],
            roseType: 'radius',
            // itemStyle: {
            //   borderRadius: 5
            // },
            label: {
                fontSize: 10
            },
            labelLine: {
                length: 6,
                length2: 8
            },
            data: [
                { value: 20, name: '云南' },
                { value: 26, name: '北京' },
                { value: 24, name: '山东' },
                { value: 25, name: '河北' },
                { value: 20, name: '江苏' },
                { value: 25, name: '浙江' },
                { value: 30, name: '四川' },
                { value: 42, name: '湖北' }
            ]
          }
        ]
    };

    // 3. 配置项和数据给实例化对象
    myChart.setOption(option);
    // 4. 当我们浏览器所放的时候，图像也等比例缩放
    window.addEventListener('resize', function() {
        myChart.resize();
    });
})();

// 柱形图模块
(function() {
    var item = {
        name: '',
        value: 1200,
        itemStyle: {
            color: '#254065'
        },
        // 鼠标放到柱子上不高亮
        emphasis: {
            itemStyle: {
              color: '#254065'
            }
        },
        // 鼠标经过不显示tooltip
        tooltip: {
            extraCssText: 'opacity: 0'
        }
    };
    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector('.bar'));
    // 2. 指定配置项和数据
    var option = {
        // 修改线性渐变色方式 1
        color: new echarts.graphic.LinearGradient(
            // (x1,y2) 点到点 (x2,y2) 之间进行渐变
            0, 0, 0, 1,
            [
                { offset: 0, color: '#00fffb' }, // 0 起始颜色
                { offset: 1, color: '#0061ce' }  // 1 结束颜色
        ]
        ),
        tooltip: {
          trigger: 'item',
        },
        grid: {
          top: '3%',
          left: '0%',
          right: '3%',
          bottom: '3%',
          containLabel: true,
          show: true,
          borderColor: 'rgba(0, 240, 255, 0.3)'
        },
        xAxis: [
          {
            type: 'category',
            data: ['上海', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆'],
            axisTick: {
              alignWithLabel: false,
              // 隐藏x轴刻度
              show: false
            },
            // x轴文字标签样式设置
            axisLabel: {
              color: '#4c9bfd'
            },
            // x轴颜色设置
            axisLine:{
                lineStyle:{
                    color:'rgba(0, 240, 255, 0.3)',
                    // width:8,  x轴线的粗细
                    // opacity: 0,   如果不想显示x轴线 则改为 0
                }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
                alignWithLabel: false,
                // 隐藏y轴刻度
                show: false
            },
            // y轴文字标签样式设置
            axisLabel: {
                color: '#4c9bfd'
            },
            // y轴颜色设置
            splitLine:{
                lineStyle:{
                    color:'rgba(0, 240, 255, 0.3)'
                }
            }
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: [2100, 1900, 1700, 1560, 1400, 
                item,
                item,
                item,
                900, 750, 600, 480, 240]
          }
        ]
    };
    // 3. 配置项和数据给实例化对象
    myChart.setOption(option);
    // 4. 当我们浏览器所放的时候，图像也等比例缩放
    window.addEventListener('resize', function() {
        myChart.resize();
    });
})();

// 销售额统计模块
(function() {
  var data = [
    ["20,301,987", 99834],
    ["5,075,496", 24958],
    ["1,691,832", 8319],
    ["422,958", 2079]
  ];

  var index;
  console.log($('.data .days'));
    // (1) 点击切换
    $('.inner .filter').on('click', 'a', function() {
        // 点击当前a 高亮显示 调用active
        index = $(this).index();
        $(this).addClass('active').siblings('a').removeClass('active');
        // console.log(data[index])
        var current = data[index];
        $('.days1').html(current[0]);
        $('.days2').html(current[1]);
    })
    // (2) 开启定时器（3s），自动触发a点击事件
    var as = $(".inner .filter a");
    index = 0;
    var timer = setInterval(function() {
    index++;
    index >=4 ? index = 0 : index = index;
    as.eq(index).click();
    }, 1000);
    // (3) 鼠标经过sales，关闭定时器，离开开启定时器
    $('.days').hover(function() {
        clearInterval(timer);
    }, function() {
        clearInterval(timer);
        timer = setInterval(function() {
        index++;
        index >=4 ? index = 0 : index = index;
        as.eq(index).click();
        }, 1000);
    });
})();

// 销售渠道统计模块
(function() {
    var data = {
        year: [
          [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
          [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
        ],
        quarter: [
          [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
          [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
        ],
        month: [
          [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
          [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
        ],
        week: [
          [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
          [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
        ]
    }
     // 1. 实例化对象
     var myChart = echarts.init(document.querySelector('.line'));
     // 2. 指定配置项和数据
     var option = {
        color: ['#00f2f1', '#ed3f35'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          right: '10%',
          textStyle: {
            color: '#4c9bfd'
          },
          // 下面有的时候可以不写name的data
          // data: ['邮件营销', '联盟广告']
        },
        grid: {
          top: '20%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          show: true,
          borderColor: '#012f4a',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          // 去除刻度
          axisTick: {
            show: false
          },
          // 改刻度标签颜色
          axisLabel: {
            color: '#4c9bfd'
          },
          // 去除x轴的颜色
          axisLine : {
            show: false
          },
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        },
        yAxis: {
          type: 'value',
          // 去除刻度
          axisTick: {
            show: false
          },
          // 改刻度标签颜色
          axisLabel: {
            color: '#4c9bfd'
          },
          // 改y轴的颜色
          splitLine : {
            lineStyle: {
              color: '#012f4a'
            }
          },
        },
        series: [
          {
            name: '预期销售额',
            type: 'line',
            smooth: true,
            data:  data.year[0],
          },
          {
            name: '实际销售额',
            type: 'line',
            smooth: true,
            data: data.year[1],    
          }
        ]
    };
    // 3. 配置项和数据给实例化对象
    myChart.setOption(option);
    // 4. tab切换效果
    var index;
    // (1) 点击切换
    $('.sales .caption').on('click', 'a', function() {
        // 点击当前a 高亮显示 调用active
        // 此时要注意，因为有标题“销售额统计”，所以索引号加了1，需要减去
        index = $(this).index() - 1;
        $(this).addClass('active').siblings('a').removeClass('active');
        // console.log(this.dataset.type)
        var current = data[this.dataset.type];
        option.series[0].data = current[0];
        option.series[1].data = current[1];
        // 重新渲染配置了新数据的实例对象
        myChart.setOption(option);
    })
    // (2) 开启定时器（3s），自动触发a点击事件
    var as = $(".sales .caption a");
    index = 0;
    var timer = setInterval(function() {
    index++;
    index >=4 ? index = 0 : index = index;
    as.eq(index).click();
    }, 1000);
    // (3) 鼠标经过sales，关闭定时器，离开开启定时器
    $('.sales').hover(function() {
        clearInterval(timer);
    }, function() {
        clearInterval(timer);
        timer = setInterval(function() {
        index++;
        index >=4 ? index = 0 : index = index;
        as.eq(index).click();
        }, 1000);
    });
    // 5. 当我们浏览器所放的时候，图像也等比例缩放
    window.addEventListener('resize', function() {
        myChart.resize();
    });
})();

// 销售渠道雷达图
(function() {
    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector('.radar'));
    // 2. 指定配置
    const dataBJ = [
        [85, 59, 76, 46, 78, 16, 51]
    ];
    var option = {
        tooltip: {
          show: true,
          position: ['60%', '10%']
        },
        radar: {
          indicator: [
            { name: '机场', max: 100 },
            { name: '商场', max: 100 },
            { name: '火车站', max: 100 },
            { name: '汽车站', max: 100 },
            { name: '地铁', max: 100 }
          ],
          // 修改雷达图的大小
          radius: '65%',
          shape: 'circle',
          // 分割的圆圈个数
          splitNumber: 4,
          name: {
            // 修饰雷达图文本颜色
             textStyle: {
               color: '#4c9bfd'
             }
          },
          // 分割圆圈线条的样式
          splitLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.5)'
            }
          },
          splitArea: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.5)'
            }
          }
        },
        series: [
          {
            name: '北京',
            type: 'radar',
            lineStyle: {
              normal: {
                // 图形的线条样式
                color: '#fff',
                width: 1,
                opacity: 0.5
              }
            },
            data: dataBJ,
            // 设置图形标记
            symbol: 'circle',
            symbolSize: 5,
            itemStyle: {
              color: '#fff'
            },
            // 让小圆点显示数据
            label: {
              show: true,
              color: '#fff',
              fontSize: 10
            },
            areaStyle: {
              color: 'rgba(238, 197, 102, 0.6)'
            }
          }
        ]
    };
    // 3. 配置项和数据给实例化对象
    myChart.setOption(option);
    // 4. 当我们浏览器所放的时候，图像也等比例缩放
    window.addEventListener('resize', function() {
         myChart.resize();
    });
})();

// 饼图-donut 半圆型
(function(){
  // 1. 实例化对象
  var myChart = echarts.init(document.querySelector('.gauge'));
  // 2. 指定配置项和数据
  var option = {
    series: [
      {
        name: '销售进度',
        type: 'pie',
        radius: ['140%', '105%'],
        // donut图的起始角度+180度，默认是90度
        startAngle: '180',
        // 移动下位置  套住50%文字
        center: ['48%', '75%'],
        // 鼠标经过不放大图形
        hoverOffset: 0,
        // 是否启用防止标签重叠策略
        // avoidLabelOverlap: false,
        labelLine: {
          show: false
        },
        data: [
          {
            value: 25,
            itemStyle: {
              // 颜色渐变#00c9e0->#005fc1
              color: new echarts.graphic.LinearGradient(
                // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                0, 0, 0, 1,
                [
                  { offset: 0, color: "#00c9e0" }, // 0 起始颜色
                  { offset: 1, color: "#005fc1" } // 1 结束颜色
                ]
              )
            }
          },  
          { value: 25, itemStyle: { color: '#12274d' } },
          { value: 50,
            itemStyle: {
              color: 'transparent'
            }
          }
        ]
      }
    ]
  };

  // 3. 配置项和数据给实例化对象
  myChart.setOption(option);
  // 4. 当我们浏览器所放的时候，图像也等比例缩放
  window.addEventListener('resize', function() {
      myChart.resize();
  });
})();

// 全国热榜模块
(function() {
  // 1. 准备相关数据
  var hotData = [
    {
      city: '北京',  // 城市
      sales: '25, 179',  // 销售额
      flag: true, //  上升还是下降
      brands: [   //  品牌种类数据
        { name: '可爱多', num: '9,086', flag: true },
        { name: '娃哈哈', num: '8,341', flag: true },
        { name: '喜之郎', num: '7,407', flag: false },
        { name: '八喜', num: '6,080', flag: false },
        { name: '小洋人', num: '6,724', flag: false },
        { name: '好多鱼', num: '2,170', flag: true },
      ]
    },
    {
      city: '河北',
      sales: '23,252',
      flag: false,
      brands: [
        { name: '可爱多', num: '3,457', flag: false },
        { name: '娃哈哈', num: '2,124', flag: true },
        { name: '喜之郎', num: '8,907', flag: false },
        { name: '八喜', num: '6,080', flag: true },
        { name: '小洋人', num: '1,724', flag: false },
        { name: '好多鱼', num: '1,170', flag: false },
      ]
    },
    {
      city: '上海',
      sales: '20,760',
      flag: true,
      brands: [
        { name: '可爱多', num: '2,345', flag: true },
        { name: '娃哈哈', num: '7,109', flag: true },
        { name: '喜之郎', num: '3,701', flag: false },
        { name: '八喜', num: '6,080', flag: false },
        { name: '小洋人', num: '2,724', flag: false },
        { name: '好多鱼', num: '2,998', flag: true },
      ]
    },
    {
      city: '江苏',
      sales: '23,252',
      flag: false,
      brands: [
        { name: '可爱多', num: '2,156', flag: false },
        { name: '娃哈哈', num: '2,456', flag: true },
        { name: '喜之郎', num: '9,737', flag: true },
        { name: '八喜', num: '2,080', flag: true },
        { name: '小洋人', num: '8,724', flag: true },
        { name: '好多鱼', num: '1,770', flag: false },
      ]
    },
     {
      city: '山东',
      sales: '20,760',
      flag: true,
      brands: [
        { name: '可爱多', num: '9,567', flag: true },
        { name: '娃哈哈', num: '2,345', flag: false },
        { name: '喜之郎', num: '9,037', flag: false },
        { name: '八喜', num: '1,080', flag: true },
        { name: '小洋人', num: '4,724', flag: false },
        { name: '好多鱼', num: '9,999', flag: true },
      ]
    }
  ];

  // 2. 根据数据渲染各省热销sup模块内容
  // 2.1 遍历hotData对象
  var supHTML = '';
  $.each(hotData, function(index, item) {
    // console.log(item);
    supHTML += `<li><span>${item.city}</span><span>${item.sales}<s class=${item.flag ? "icon-up" : "icon-down"}></s></span></li>`;
  });
  $('.sup').html(supHTML);

  // 3. 当鼠标进入tab的时候
  // 3.1 鼠标经过当前小li高亮显示
  $('.province .sup').on('mouseover', 'li', function() {
    index = $(this).index()
    render($(this))
    // $(this).addClass('active').siblings().removeClass('active');

    // 3.2 拿到当前城市的品牌对象
    // console.log($(this).index());
    // 我们可以通过hotData[$(this).index()].brands拿到品牌对象
    // 开始遍历品牌数组
    // var subHTML = '';
    // $.each(hotData[$(this).index()].brands, function(index, item) {
    //   subHTML += `<li><span>${item.name}</span><span>${item.num}<s class=${item.flag ? "icon-up" : "icon-down"}></s></span></li>`;
    // })
    // $('.sub').html(subHTML)
  });

  // 6. 声明一个函数 设置sup当前小li高亮 及对应品牌对象渲染
  function render(that) {
    that.addClass('active').siblings().removeClass('active');
    var subHTML = '';
    $.each(hotData[that.index()].brands, function(index, item) {
      subHTML += `<li><span>${item.name}</span><span>${item.num}<s class=${item.flag ? "icon-up" : "icon-down"}></s></span></li>`;
    })
    $('.sub').html(subHTML)

  }

  // 4. 默认把第一个小li处于鼠标经过状态
  var lis = $('.province .sup li');
  lis.eq(0).mouseenter();
  // 5. 开启定时器
  var index = 0;
  var timer = setInterval(function() {
    index++;
    if (index >= 5) index = 0;
    // lis.eq(index).mouseenter();
    // lis.eq(index).addClass('active').siblings().removeClass('active');
    // var subHTML = '';
    // $.each(hotData[index].brands, function(index, item) {
    //   subHTML += `<li><span>${item.name}</span><span>${item.num}<s class=${item.flag ? "icon-up" : "icon-down"}></s></span></li>`;
    // })
    // $('.sub').html(subHTML)
    render(lis.eq(index));
  }, 2000);

  $('.province .sup').hover(function() {
    // 鼠标经过事件
    clearInterval(timer);
  }, function() {
    // 鼠标离开事件
    clearInterval(timer);
    timer = setInterval(function() {
      index++;
      if (index >= 5) index = 0;
      render(lis.eq(index));
    }, 2000);
  });

})();

