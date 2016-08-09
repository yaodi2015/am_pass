
var angular = require("angular");

var Life = angular.module("Life",[]);


Life.controller("LifeList", ["$scope", function($scope) {


  $scope.lifelist = [
    {title : "Déjà vu Coffee" , "img" : "../images/life1@2x.jpg" , "desc" : "与名字一样充满着似曾相识的气息，店内摆放的物品可以让我们穿越到各个年代。" , "title2" : "SALE"  , "desc:2" : "冰卡布奇诺 or 冰美式无限续杯" },
    {title : "Book of Deer" , "img" : "../images/life2@2x.jpg" , "desc" : "Book of Deer是苏格兰现存最古老的手稿，颇有诗意的名字带出了设计师Eilidh Ho希望品牌呈现的梦幻感觉。" , "title2" : ""  , "desc:2" : "" },
    {title : "Unological Poem" , "img" : "../images/life3@2x.jpg" , "desc" : "希望通过设计传递一种对生活的诗意的态度，又不拘泥于常规的形态和思维，以一种不合逻辑的创造带给一丝趣味和意外。" , "title2" : ""  , "desc:2" : "" },
    {title : "CellaB" , "img" : "../images/life4@2x.jpg" , "desc" : "西班牙独立设计师品牌，创始人对旅行的热爱和对手工艺品很痴迷。" , "title2" : ""  , "desc:2" : "" },
    {title : "Dr.Beer" , "img" : "../images/life5@2x.jpg" , "desc" : "西餐厅 适宜休闲时光、休闲小憩、随便吃吃、情侣约会" , "title2" : ""  , "desc:2" : "" },
    {title : "MASSE HALL" , "img" : "../images/life6@2x.jpg" , "desc" : "餐厅入口的长走道，好像进入了某个工厂，天花板上裸露在外面的水泥横梁与金属管道，营造硬朗怀旧的风格。" , "title2" : ""  , "desc:2" : "" },
    {title : "Big Easy" , "img" : "../images/life7@2x.jpg" , "desc" : "老板受到19世纪美国墨西哥港湾的 crab shacks & Bar.B.Q 启发而开了第一家店，多年来深受喜爱。" , "title2" : ""  , "desc:2" : "" },
    {title : "Grosfairy" , "img" : "../images/life8@2x.jpg" , "desc" : "胖仙女是纽约Cupcake界人气高涨的甜品店,2014年风靡上海.以丰富多变的造型和精心研发的极致口味打造纸杯蛋糕特色。" , "title2" : ""  , "desc:2" : "" },
    {title : "Farine" , "img" : "../images/life9@2x.jpg" , "desc" : "We want to do something worthwhile by honouring the ordinary yet extraordinary boulangeries that give life to little towns in France。" , "title2" : ""  , "desc:2" : "" }
  ];



}]);

