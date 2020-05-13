## 项目说明
基于antd组件库的后台管理系统。项目包含很多antd常见组件的用法，包含react常用路由、传参等react基础知识，适合react新手学习。

## 注意事项
nodeServer文件夹下是用node搭建的本地服务代码，在此目录下执行 npm i 下载好依赖， 再执行 npm run dev 启动本地服务，注意保证端口号是3000。
启动node服务后，再回到根目录，使用npm start 启动项目。若无法启动，请先执行npm i下载依赖，正常启动后，此时会提示3000端口被占用，选择愿意使用其他端口号启动。
在素材页，表格数据由接口提供，但是请求的接口端口号不一致会有跨域报错。推荐在谷歌扩展商店找到 Access-Control-Allow-Credentials: true 该插件，可以允许跨域访问借口。 如果谷歌浏览器安装插件后依然无法请求成功，请在Microsoft edge 浏览器安装此插件后访问。或者技术更好的同学自行配置ngx解决跨域问题。

第一次尝试使用node封装后台接口，主要使用了express。没有连接数据库，数据存储在一个json静态文件中。


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
