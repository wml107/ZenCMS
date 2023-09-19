## 权限、用户管理

**Authentication-用户登录 | /user/login**

预期功能：校验用户账户密码正确与否。

- 成功：为客户端在cookie设置token；令所有旧token失效；返回用户信息。
- 失败：告知客户端登录失败。

业务实现要点：

1. 该功能没有走常规的controller->service->database实现，是直接交由系统的鉴权守卫LocalStrategy实现。

2. 密码有加密，用bcrypt检验。

3. 返回的用户信息不能直接从payload里去，因为有可能是旧的，要用payload的id去数据库查用户信息。

4. 设置token是在相应拦截器里实现的，因为nest的守卫无法设置cookie。

   在拦截器中统一判断，判断context中有没有user，有user就说明通过了鉴权，要么通过了登录，要么通过了jwt校验，总有一种，而这两种情形的处理是通用的，因为都是做刷新设置cookie的操作。

5. 令可能存在的旧token失效。因为这是个管理员系统，为了安全起见，假设不希望多设备同时登录，所以新的登录会刷新过期状态，使得旧的token过期。具体实现也颇为简单，直接调用service层的quit(登出)功能即可。

代码执行流程：

- 成功：检验密码是否正确(local守卫)→读取用户信息并放入context(local守卫)→令先前token失效(controller调用service)→发送带有用户信息的成功响应(controller)→刷新token设置在cookie中(响应拦截器)。
- 失败：检验密码是否正确(local守卫)→抛出相应业务异常-这里是直接返回false即可(local守卫)。

**Authorization-特定功能检查登录状态、所需要权限 | Header-Authorization**

这是一个通用功能，是很多其他功能的前置流程。在其他涉及该功能使用的地方不再重复。

预期功能：在调用需要鉴权的方法时，先核验token有效性，再确认是否具备相应操作权限，最后在返回结果之前为客户端刷新token时间完成续签。

- 成功：进入到原本要访问的接口，并且在响应之前设置好cookie，刷新token。
- 失败：直接抛出各种对应的业务异常，例如401 Unauthorization和403 Forbidden。

业务实现要点：

1. 该功能没有走常规的controller->service->database实现，是直接交由系统的鉴权守卫JwtStrategy实现。

   该守卫被注册为全局默认守卫。对于需要其他守卫或无需鉴权的接口，通过注解来覆盖；对于需要某特定权限的接口，通过注解来标识。

2. 检查注解，如果是Public公共接口，则直接返回成功。

   该守卫先继承自passport-jwt守卫，根据预设完成对jwt本身有效性的校验。

   然后根据payload中的id拿到完整的用户信息，放入context中。

   根据payload中的签发日期，比对从数据库中查到的上次过期时间，确认此token没有过期。

   根据用户信息中的角色、角色具备的权限，判断是否具备访问某接口的权限。

   ----------此时守卫的工作已经完成----------

   通过响应拦截器拦截所有响应，检查context中是否存在用户信息，如果存在就说明通过了Authentication的passport-local账号密码校验，或者通过了Authorization的passport-jwt令牌校验，这就需要更新token，给token续期，此时重新生成一个token设置到cookie中。

   又因为如果鉴权失败会直接抛出异常，代码进入filter层，根本不进入interceptor层(不刻意捕捉得话)，所以就算jwt基本有效性检验通过后面的检验失败，用户信息被误放入context中，也会因为没有进入响应拦截器而被忽略。

**Authorization-自动登录 | /user/autoLogin**

预期功能：用户进入应用时，在有token的情况下，客户端自动校验登录状态完成登录。

- 成功：返回用户信息。
- 失败：告知客户端token已经失效。

业务实现要点：

1. 整个过程什么也不做，就是自动通过上面的功能去校验，要是token无效就会发生异常，要是有效就会匹配到对应路由，直接在路由返回用户信息即可。

代码执行流程：

- 成功：检验token(Jwt守卫)→读取用户信息并放入context(Jwt守卫)→发送带有用户信息的成功响应(controller)→刷新token设置在cookie中(响应拦截器)。
- 失败：检验token(Jwt守卫)→抛出相应业务异常-这里是直接返回false即可(Jwt守卫)。