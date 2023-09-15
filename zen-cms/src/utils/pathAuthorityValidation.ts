//这是一个对Pipe的补充，用于对路径的校验。
//资源的获取通常是在请求中包含资源类型和相对路径，服务端根据资源类型得到相应路径，拼接相对路径，然后操作相应文件获取资源。
//这样做就存在一个隐患，客户端请求时，可以在相对路径中添加"../"，通过这种方法就会跳出预期的资源目录，访问到服务器的其他文件。
//但又不可能去限制客户端在请求中包含这样转向上一级的写法，因为在权限内目录利用这种写法通过相对路径跳转也是完全合理、且有必要的需求。
//所以这里就需要对路径单独校验，先计算出完成的绝对路径，然后和所请求资源的根路径比对，后者必须为前者的前缀才行。
//只校验前缀是不够的，因为请求方可以通过特定的相对路径，把req退到和authorizedPath同一层，这就会导致也能通过前缀校验，但这样后面具体业务操作的就是授权根目录，对服务端造成破环。
    //所以需要先把前缀后添加“/”，让前缀更难匹配，同时还要确定reqPath不等于AuthorizedPath。

import path from "path";

export function pathAuthorityValidation(authorizedPath: string, reqPath: string, canEqual: boolean = false) {
    authorizedPath = path.normalize(authorizedPath + "/");
    reqPath = path.normalize(reqPath);
    if(canEqual) return reqPath.startsWith(authorizedPath);
    return reqPath.startsWith(authorizedPath) && (reqPath !== authorizedPath);
}