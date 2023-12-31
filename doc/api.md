## 响应体

**结构：**

```
{
	statusCode: 状态码,
	message: 对情形的简短描述,
	data: 响应数据
}
```

**状态码：**

| 变量名                  | code | 含义                                                         |
| ----------------------- | ---- | ------------------------------------------------------------ |
| OK                      | 200  | 成功                                                         |
| EXISTED_NAME_SUCC       | 230  | 命名重复，但拟相似名字后操作成功，新名字可以从data中查看     |
| NO_SUCH_FILE_BUT_CREATE | 231  | 找不到该名字文件，但按照该名字在对应路径创建了               |
| BAD_PATH_RECOVERY       | 232  | 执行从回收站恢复资源时，找不到原路径，恢复至相应资源根目录   |
| BAD_REQUEST             | 400  | 最为泛泛的客户端请求参数错误，一般是参数类型等对不上，下面还有一系列具体的、和业务强相关的参数错误 |
| UNAUTHORIZED            | 401  | 未登录                                                       |
| FORBIDDEN               | 403  | 权限不足                                                     |
| BAD_PATH                | 460  | 路径不可达，失败                                             |
| NEED_FILE               | 461  | 服务端期望接收的是文件，而不是目录或其它                     |
| EXISTED_NAME_FAIL       | 462  | 命名重复，失败                                               |
| OUT_OF_BOUNDS_PATH      | 463  | 路径越界，无权访问这些位置的资源                             |
| BAD_SEGMENT             | 464  | 下标越界，超出列表数量范围                                   |
| REFERENCED              | 465  | 资源正在被引用，无法执行(删除等)操作                         |

## API

https://apifox.com/apidoc/shared-a6ead4d6-13b3-433f-b0a7-9935f943fc39/api-106571433

这个文档主要是看：请求路径、请求方法、请求参数及约束，

**有关响应体：** 接口文档基本没有定义任何预期的响应结果，因为没有必要，且会为开发带来副作用：

- 对于共性的响应结果，例如某些错误导致的请求失败，业务上的某些错误，是可以集中处理的。无需单独地去考虑这些情形。

- 对于和业务有关的响应结果，绝大多数也完全没有必要让前端知道。

  除非要根据响应结果执行某些特别的操作。不然给前端几个预期结果，让前端对着这些结果一个个去判断，做出同质化的响应，是非常冗长且耦合度高的。

  一旦预期结果发生变动，不光服务端要改，前端也要一个个跟着改，前端文档、后端文档、API文档也得跟着改。

  并且前端对这些不同的响应结果做的操作，大概率只是把后端封装进请求体的操作反向执行了一遍——根据文档和状态码判断响应结果，然后再通知给用户。

与其如此，还不如让响应结果的处理极度简化，在前端、在前后端约定的接口眼里，响应结果只有两种：

- 一种是发生错误，请求的事宜干脆执行失败了，那就根据文档的约定，在专门的处理装置(响应拦截器)集中处理这些错误；
- 另一种是请求的事宜执行成功，但某些业务有着不同的成功情形细分，这就没有必要让前端知道了（服务端仍然会把这些细分情形写在响应体，但前端无需理会），服务端把对各种细分情形的描述写在响应体的message中，由前端直接提示给用户，就不要再识别后转述这些信息做二道贩子了。如果是向后端请求数据，前端则直接拿响应体中的data去用即可。这样做也符合知道最少原则。

不过这描述的只是一种普遍的、一般的情形。对于一些需要前端针对响应做出针对性动作的情形，以及前端向后端请求数据的情形，还是会在文档中标出这种情形下的响应体。

**接口会自动为调用方刷新token：** 所有的接口，在服务端返回响应时，除了退出登录这样的接口、或者验证登录状态失败的情况，服务端都会刷新token实现，在cookie为客户端颁发一个新的token。这一点不在各接口的定义中一一赘述。
