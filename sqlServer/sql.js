//链接数据库  数据库增、删、减、查操作

var mysql = require('mysql')
var config = require('./db.js')

/***创建链接池***/
var pool = mysql.createPool({
	host: config.database.host,
	user: config.database.user,
	password: config.database.password,
	database: config.database.database,
});

/***数据库链接与执行***/
var query = (sql,val) => {
	return new Promise((resolve,reject)=>{
		//链接数据库
		pool.getConnection((err,connection)=>{
			if (err){
				return resolve(err)
			} else{
				//执行SQL语句
				connection.query(sql,val,(err,result)=>{
					if (err) {
						reject(err)
					}else{
						resolve(result)
					}
					// 调用connection.release()方法，会把连接放回连接池，等待其它使用者使用!
					connection.release()
				})
			}
		})
	})
}

/**
*创建数据库表
*@sqlName string  表名
*@sqlparam string  表字段和参数
*@comment string  表名备注
*/
var createTable = ( sqlName, sqlparam, comment ) => {
	var _sql = `create table if not exists ${sqlName}( ${sqlparam} )ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT=${comment};`
	console.log(_sql)
	return query( _sql, [] )
}
/*var param = 'id INT NOT NULL AUTO_INCREMENT,'
    +'userName VARCHAR(100) NOT NULL,'
    +'date VARCHAR(100) NOT NULL,'
    +'content VARCHAR(100) NOT NULL,'
    +'videoName VARCHAR(100) NOT NULL,'
    +'uid VARCHAR(100) NOT NULL,'
    +'avator VARCHAR(100) NOT NULL DEFAULT "",'
    +'PRIMARY KEY ( id )'

createTable('comments ' , param)*/


/**
*删除数据库表
*@sqlName string  表名
*/
var deleteTable = ( sqlName ) => {
	var _sql = `drop table ${sqlName};`
	console.log(_sql)
	return query( _sql, [] )
}

// deleteTable('comments');

/**
*查找数据
*@table string  表名
*/
//查找表中的所有数据
var fetchAllSqlData = ( table ) => {
	var _sql = `select * from ${table};`
	return query( _sql )
}

//查找不重复数据
//@param string 需要查找的参数
var fetchDistinctSqlData = ( table, param ) => {
	var _sql = `select distinct ${param} from ${table};`
	return query( _sql )
}

//带条件查找数据
// @condition string 条件
// 用where关键字来实现，可以使用<>!=等多条件可以使用or、and等 
var fetchSpecialSqlData = ( table, param, condition ) => {
	var _sql = `select ${param} from ${table} where ${condition};`
	return query( _sql )
}

//搜索
var fetchSearchSqlData = ( table, value, keywords ) => {
	var _sql = `select * from ${table} where ${value} like '%${keywords}%';`
	return query( _sql )
}

/*
排序和限制  
desc和asc是排序关键字，desc是降序、asc是升序排列 ORDER BY 排序,默认是升序  
select * from emp order by sal;  
如果排序字段的值一样，则值相同的字段按照第二个排序字段进行排序，如果只有一个排序字段，则相同字段将会无序排序  
select * from emp order by deptno,sal desc;  
限制  
select * from emp order by sal limit 3;  
//前者是起始偏移量，后者是显示行数  
select * from emp order by sal limit 1,3;  
  
limit 和order by 一起使用来做分页  
*/
// 分页数据查找
var fetchPageSqlData = ( table, page, num ) => {
  var _sql = `select * from ${table} limit ${(page - 1) * num},${num}; `
  return query(_sql)
}

/***增加（插入）数据***/

/***更新数据***/

/***删除数据***/



/***创建索引（搜索键）***/


/***删除索引***/
