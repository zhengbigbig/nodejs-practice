import {ErrorRequestHandler, NextFunction, Request, RequestHandler, Response} from 'express-serve-static-core';
import * as http from 'http';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); // 设置模块渲染目录
app.set('view engine', 'ejs'); // pug 设置渲染引擎

app.locals.title = '个人网站';
const fn1 = (request: Request, response: Response, next: NextFunction) => {
    response.render('test', {pageTitle: request.app.locals.title});
};
// 或者使用set也行，建议使用locals

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((request: Request, response: Response, next: NextFunction) => {

});
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/users/:id',(request: Request, response: Response, next: NextFunction)=>{
    console.log(request.params) // {id:'1'}
    console.log(request.query) // 获取查询字符串

    next()
});

app.use((request: Request | http.IncomingMessage, response: Response | http.ServerResponse, next: NextFunction) => {
    console.log(request.url);
    response.write('hi');
    next();
});

app.use((request: Request | http.IncomingMessage, response: Response | http.ServerResponse, next: NextFunction) => {
    console.log(request.url);
    response.write('hello');
    next();
});

app.use((request: Request | http.IncomingMessage, response: Response | http.ServerResponse, next: NextFunction) => {
    response.end('end'); // end只能调用一次
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404)); // 请求处理，如果没有捕获到上面路由，则next调用下一个
} as RequestHandler);

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
} as ErrorRequestHandler);

module.exports = app;
