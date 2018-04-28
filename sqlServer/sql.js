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
*@sqlName string  表名
*/
//得到表中的所有记录
var fetchAllSqlData = ( splNames ) => {

}

/***增加（插入）数据***/

/***更新数据***/

/***删除数据***/



/***创建索引（搜索键）***/


/***删除索引***/
