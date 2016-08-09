# 文档

### 文件夹说明 

`webapp` 为网站源代码文件夹  
`node_modules` 安装依赖 主要是angularJs 组件  
`nginx.conf` nginx 配置文件 开发配置 



### 开发
进入项目根目录 执行
    
    npm install
    
进入项目根目录 执行

    neofe server -p 8445   

以项目目录的nginx.conf 为配置文件 启动nginx 业务服务  
    
    /opt/openresty/nginx/sbin/nginx -c /项目目录/nginx.conf  

打开浏览器 访问http://127.0.0.1:8444/webapp/html/index.html 


### 构建

    neofe build 
    //在目录下生成 build文件夹 将build 文件夹下面的内容发布到 线上服务器对应的目录
    //例如/home/www/amily/

### 线上nginx 配置 

    #user  nobody;
    worker_processes  1;

    error_log  logs/error.log;
    #error_log  logs/error.log  notice;
    #error_log  logs/error.log  info;

    pid        logs/nginx.pid;


    events {
        worker_connections  1024;
    }


    http {
        include       mime.types;
        default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    gzip  on;

    server {
        listen       8444;
        server_name  localhost;

        #charset koi8-r;

        access_log  logs/host.access.log  main;
        ssi on;
        ssi_silent_errors on;

        set $www_root /home/www/amily/;

        location / {
            root  $www_root;
            index  webapp/html/index.html;
        }

        location /server/ {
           proxy_pass http://101.200.173.33:8844/;
           proxy_set_header    Host    $http_host;
           proxy_set_header    X-Real-IP       $remote_addr;
           proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header    Cookie $http_cookie;
        }

    } 

