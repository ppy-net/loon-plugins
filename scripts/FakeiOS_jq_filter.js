// FakeiOSAds 的 jq 过滤等效脚本（Loon 不支持 jsonjq，故用 JS 等效实现）
// 原 jq 表达式: .data |= map(select(.keyName | test("config\\.(ad|search|recommend)") | not))
// 作用: 从 getConfigList.do 的返回里删掉 keyName 含 config.ad / config.search / config.recommend 的配置项
var body = $response.body;
try {
  var obj = JSON.parse(body);
  if (obj && Array.isArray(obj.data)) {
    obj.data = obj.data.filter(function (item) {
      return !(item && typeof item.keyName === "string" && /config\.(ad|search|recommend)/.test(item.keyName));
    });
    body = JSON.stringify(obj);
  }
} catch (e) {}
$done({ body: body });
